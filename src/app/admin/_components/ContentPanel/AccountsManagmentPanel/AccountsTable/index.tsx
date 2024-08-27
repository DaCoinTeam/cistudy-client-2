"use client"
import { parseISODateString } from "@common"
import {
    Chip,
    Link,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User,
} from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { useContext } from "react"
import {
    AccountsManagementPanelContext,
    ROWS_PER_PAGE,
} from "../AccountsManagementPanelProvider"
import { AccountDetailsModal } from "./AccountDetailsModal"
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

export const AccountsTable = () => {
    const { reducer, swrs } = useContext(AccountsManagementPanelContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { accountsSwr } = swrs
    const { data, isLoading } = accountsSwr
    const { metadata, results } = { ...data }
    const { count } = { ...metadata }

    const loadingState = () => {
        if (isLoading) return "loading"
        return "idle"
    }

    const onPageChange = (page: number) =>
        dispatch({
            type: "SET_PAGE",
            payload: page,
        })

    const pages = count ? Math.ceil(count / ROWS_PER_PAGE) : 0

    const router = useRouter()

    return (
        <Table
            aria-label="Example table with client async pagination"
            selectionMode="single"
            shadow="none"
            classNames={{
                wrapper: "border border-divider rounded-medium p-0",
                td: [
                    "group-data-[first=true]:first:before:rounded-none",
                    "group-data-[first=true]:last:before:rounded-none",
                    "group-data-[middle=true]:before:rounded-none",
                    "group-data-[last=true]:first:before:rounded-none",
                    "group-data-[last=true]:last:before:rounded-none",
                ],
                th: [
                    "bg-transparent",
                    "text-default-500",
                    "border-b",
                    "border-divider",
                    "py-4",
                ],
            }}
            bottomContent={
                pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <div className="pb-4">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={onPageChange}
                            />
                        </div>
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="infomation">Information</TableColumn>
                <TableColumn key="email">Email</TableColumn>
                <TableColumn key="birthdate">Birthdate</TableColumn>
                <TableColumn key="createdAt">Created At</TableColumn>
                <TableColumn key="status">Status</TableColumn>
                <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
                items={results ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {(account) => (
                    <TableRow key={account.accountId}>
                        <TableCell>
                            <div className="flex gap-3 py-2">
                                <User
                                    avatarProps={{
                                        src: getAvatarUrl({
                                            avatarId: account.avatarId,
                                            avatarUrl: account.avatarUrl,
                                            kind: account.kind,
                                        }),
                                    }}
                                    classNames={{
                                        name: "text-base",
                                    }}
                                    name={account.username ?? "Unnamed"}
                                    description={"0 followers"}
                                />
                            </div>
                        </TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>
                            {account.birthdate
                                ? parseISODateString(account.birthdate)
                                : "N/A"}
                        </TableCell>
                        <TableCell>{dayjs(account.createdAt).format("HH:mm:ss DD/MM/YYYY")}</TableCell>
                        <TableCell>
                            {account.isDisabled ? (
                                <Chip color="danger" variant="flat">
                  Disabled
                                </Chip>
                            ) : (
                                <Chip color="primary" variant="flat">
                  Enabled
                                </Chip>
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="gap-2 flex items-center">
                                <Link
                                    className="w-5 h-5"
                                    color="primary"
                                    onPress={() => router.push(`/accounts/${account.accountId}`)}
                                >
                                    <EyeIcon />
                                </Link>
                                <AccountDetailsModal account={account} />
                                <Link className="w-5 h-5" color="danger">
                                    <TrashIcon />
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
