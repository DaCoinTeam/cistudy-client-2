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
import { useContext } from "react"
import {
    NotificationsManagementPanelContext,
    ROWS_PER_PAGE,
} from "../NotificationsManagementPanelProvider"
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { getAvatarUrl } from "../../../../../../services/server"

export const NotificationsTable = () => {
    const { reducer, swrs } = useContext(NotificationsManagementPanelContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { notificationsSwr } = swrs
    const { data, isLoading } = notificationsSwr
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
                <TableColumn key="email">Title</TableColumn>
                <TableColumn key="birthdate">Description</TableColumn>
                <TableColumn key="createdAt22" width={"15%"}>Receiver</TableColumn>
                <TableColumn key="status">Viewed</TableColumn>
                <TableColumn key="createdAt"  width={"10%"}>Created At</TableColumn>
                <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
                items={results ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {({ notificationId, title, description, viewed, createdAt, receiver: { avatarId, avatarUrl, kind, username} }) => (
                    <TableRow key={notificationId}>
                        <TableCell>
                            <div className="font-semibold">{title}</div>
                        </TableCell>
                        <TableCell>{description}</TableCell>
                        <TableCell><User avatarProps={{
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
                        name={username ?? "Unnamed"}
                        description={"0 followers"}
                        /></TableCell>
                        <TableCell>{viewed ? <Chip variant="flat" color="success">Yes</Chip> : <Chip variant="flat" color="default">No</Chip>}</TableCell>
                        <TableCell>{parseISODateString(createdAt)}</TableCell>
                        <TableCell>
                            <div className="gap-2 flex items-center">
                                <Link as="button" className="w-5 h-5">
                                    <EyeIcon/>
                                </Link>
                                <Link as="button" className="w-5 h-5">
                                    <PencilIcon/>
                                </Link>
                                <Link as="button" className="w-5 h-5" color="danger">
                                    <TrashIcon/>
                                </Link>
                            </div>    
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
