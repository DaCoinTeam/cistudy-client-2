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
} from "@nextui-org/react"
import {
    TransactionsManagementPanelContext,
    ROWS_PER_PAGE,
} from "../TransactionsManagementPanelProvider"
import { useRouter } from "next/navigation"
import { VerifyStatus, computeDenomination, parseDateStringFrom, truncate } from "@common"

export const TransactionsTable = () => {
    const router = useRouter()
    const { reducer, swrs } = useContext(TransactionsManagementPanelContext)!
    const [state, dispatch] = reducer
    const { page } = state
    const { transactionsSwr } = swrs
    const { data, isLoading } = transactionsSwr
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

    const renderStatus = (status: VerifyStatus) => {
        const statusToComponent: Record<VerifyStatus, JSX.Element> = {
            [VerifyStatus.Draft]: (
                <Chip color="warning" variant="flat">
          Pending
                </Chip>
            ),
            [VerifyStatus.Pending]: (
                <Chip color="warning" variant="flat">
          Pending
                </Chip>
            ),
            [VerifyStatus.Approved]: (
                <Chip color="success" variant="flat">
          Success
                </Chip>
            ),
            [VerifyStatus.Rejected]: (
                <Chip color="danger" variant="flat">
          Rejected
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
                <TableColumn key="address">
          Address
                </TableColumn>
                <TableColumn key="from">From</TableColumn>
                <TableColumn key="to">To</TableColumn>
                <TableColumn key="value"> Value </TableColumn>
                <TableColumn key="createdAt"> Created At </TableColumn>
            </TableHeader>
            <TableBody
                items={results ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {({ transactionHash, from, to, createdAt, value }) => (
                    <TableRow key={transactionHash}>
                        <TableCell>
                            {truncate(transactionHash)}
                        </TableCell>
                        <TableCell>{truncate(from)}</TableCell>
                        <TableCell>{truncate(to)}</TableCell>
                        <TableCell>{computeDenomination(BigInt(value))} STARCI</TableCell>
                        <TableCell>{parseDateStringFrom(createdAt)}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
