"use client"
import React, { useContext } from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
    Chip,
    User,
} from "@nextui-org/react"
import {
    UsersManagementPanelContext,
    ROWS_PER_PAGE,
} from "../UsersManagementPanelProvider"
import { useRouter } from "next/navigation"
import { VerifyStatus, parseISODateString } from "@common"
import { getAvatarUrl } from "@services"

export const UsersTable = () => {
    const router = useRouter()
    const { reducer, swrs } = useContext(UsersManagementPanelContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { usersSwr } = swrs
    const { data, isLoading } = usersSwr
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


    //
    enum Status {
        Enabled,
        Disabled
    }

    const renderStatus = (status: Status) => {
        const statusToComponent: Record<Status, JSX.Element> = {
            [Status.Enabled]: (
                <Chip color="success" variant="flat">
          Enabled
                </Chip>
            ),
            [Status.Disabled]: (
                <Chip color="danger" variant="flat">
          Disabled
                </Chip>
            ),
        }
        return statusToComponent[status]
    }

    return (
        <Table
            aria-label="Example table with client async pagination"
            selectionMode="multiple"
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
                <TableColumn key="infomation">
          Infomation
                </TableColumn>
                <TableColumn key="email">Email</TableColumn>
                <TableColumn key="birthdate">Birthdate</TableColumn>
                <TableColumn key="status">Status</TableColumn>
            </TableHeader>
            <TableBody
                items={results ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {({ userId, avatarId, username, avatarUrl, kind, birthdate, email }) => (
                    <TableRow key={userId}>
                        <TableCell>
                            <div className="flex gap-3 py-2">
                                <User avatarProps={{
                                    src : getAvatarUrl({
                                        avatarId,
                                        avatarUrl,
                                        kind
                                    })              
                                }
                                }
                                classNames={{
                                    name: "text-base"
                                }}
                                name={username}
                                description={"0 followers"}
                                />
                            </div>
                        </TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{parseISODateString(birthdate)}</TableCell>
                        <TableCell>{renderStatus(Status.Enabled)}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
