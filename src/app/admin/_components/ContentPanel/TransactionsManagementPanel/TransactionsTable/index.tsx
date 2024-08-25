"use client"
import { TransactionStatus, TransactionType, truncate } from "@common"
import {
    Chip,
    Pagination,
    Snippet,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react"
import dayjs from "dayjs"
import { useContext } from "react"
import {
    ROWS_PER_PAGE,
    TransactionsManagementPanelContext,
} from "../TransactionsManagementPanelProvider"
import { TransactionDetailsModal } from "./TransactionDetailsModal"

export const TransactionsTable = () => {
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

    const renderType = (type: TransactionType) => {
        const typeToComponent: Record<TransactionType, JSX.Element> = {
            [TransactionType.Buy]: (
                <Chip color="warning" variant="flat">
          Buy
                </Chip>
            ),
            [TransactionType.Deposit]: (
                <Chip color="primary" variant="flat">
          Deposit
                </Chip>
            ),
            [TransactionType.Withdraw]: (
                <Chip color="secondary" variant="flat">
          Withdraw
                </Chip>
            ),
            [TransactionType.Earn]: (
                <Chip color="success" variant="flat">
          Earn
                </Chip>
            ),
            [TransactionType.CheckOut]: (
                <Chip color="danger" variant="flat">
          Check Out
                </Chip>
            ),
            [TransactionType.Received]: (
                <Chip color="default" variant="flat">
          Received
                </Chip>
            ),
        }
        return typeToComponent[type]
    }
    const renderStatus = (status: TransactionStatus) => {
        const typeToComponent: Record<TransactionStatus, JSX.Element> = {
            [TransactionStatus.Failed]: (
                <Chip color="danger" variant="flat">
          Failed
                </Chip>
            ),
            [TransactionStatus.Pending]: (
                <Chip color="warning" variant="flat">
          Pending
                </Chip>
            ),
            [TransactionStatus.Success]: (
                <Chip color="success" variant="flat">
          Success
                </Chip>
            ),
        }
        return typeToComponent[status]
    }

    return (
        <Table
            aria-label="Example table with client async pagination"
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
                <TableColumn key="transactionId">Transaction Id</TableColumn>
                <TableColumn key="type">Type</TableColumn>
                <TableColumn key="to">To</TableColumn>
                <TableColumn width={"15%"} key="balanceChange">Balance Change</TableColumn>
                <TableColumn key="IDs">Status</TableColumn>
                <TableColumn key="createdAt">Created At</TableColumn>
                <TableColumn key="details">Actions</TableColumn>
            </TableHeader>
            <TableBody
                emptyContent={"No transactions found."}
                items={results ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState()}
            >
                {(transaction) => (
                    <TableRow key={transaction.transactionId}>
                        <TableCell>
                            <Snippet
                                hideSymbol
                                classNames={{
                                    base: "!bg-inherit",
                                }}
                                codeString={transaction.transactionId}
                            >
                                {truncate(transaction.transactionId)}
                            </Snippet>
                        </TableCell>
                        <TableCell>{renderType(transaction.type)}</TableCell>
                        <TableCell>
                            {/* <User avatarProps={{
                            src : getAvatarUrl({
                                avatarId: transaction.account.avatarId,
                                avatarUrl: transaction.account.avatarUrl,
                                kind: transaction.account.kind
                            })              
                        }
                        }
                        classNames={{
                            name: "text-base"
                        }}
                        name={transaction.account.username ?? "Unnamed"}
                        description={"0 followers"}
                        /> */}
                            {transaction.account.username ?? "Unnamed"}
                        </TableCell>
                        <TableCell>
                            {transaction.amountOnChainChange ? (
                                <div className="grid gap-1">
                                    <div className="items-center text-sm">
                                        <div>Deposited: </div>
                                        {transaction.amountDepositedChange >= 0 ? (
                                            <div className="text-success">
                                +{transaction.amountDepositedChange} STARCI
                                            </div>
                                        ) : (
                                            <div className="text-danger">
                                                {transaction.amountDepositedChange} STARCI
                                            </div>
                                        )}
                                    </div>
                                    <div className="items-center  text-sm">
                                        <div>On-chain: </div>
                                        {transaction.amountOnChainChange >= 0 ? (
                                            <div className="text-success">
                                +{transaction.amountOnChainChange} STARCI
                                            </div>
                                        ) : (
                                            <div className="text-danger">
                                                {transaction.amountOnChainChange} STARCI
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`${
                                        transaction.amountDepositedChange >= 0
                                            ? "text-success"
                                            : "text-danger"
                                    }`}
                                >
                                    {transaction.amountDepositedChange >= 0 ? "+" : ""}
                                    {transaction.amountDepositedChange} STARCI
                                </div>
                            )}
                        </TableCell>
                        <TableCell>{renderStatus(transaction.status)}</TableCell>

                        <TableCell>
                            {dayjs(transaction.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <TransactionDetailsModal transaction={transaction}/>
                            </div>   
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
