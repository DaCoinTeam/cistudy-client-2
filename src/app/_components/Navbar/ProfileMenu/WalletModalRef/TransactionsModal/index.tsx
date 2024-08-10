"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Link,
    useDisclosure,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Snippet,
    Chip,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { TransactionType, truncate } from "@common"
import {
    ROWS_PER_PAGE,
    TransactionsModalContext,
    TransactionsModalProvider,
} from "./TransactionModaProvider"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { TransactionDetailsModal } from "./TransactionDetailsModal"

const WrappedTransactionsModal = () => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()

    const { reducer, swrs } = useContext(TransactionsModalContext)!
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

    const onPageChange = (page: number) =>
        dispatch({
            type: "SET_PAGE",
            payload: page,
        })

    const pages = count ? Math.ceil(count / ROWS_PER_PAGE) : 0

    const router = useRouter()

    return (
        <>
            <Link size="sm" as="button" onPress={onOpen}>
        View Transactions
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Transactions</ModalHeader>
                    <ModalBody className="p-4">
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
                                <TableColumn width={"20%"} key="balanceChange">Balance Change</TableColumn>
                                <TableColumn key="IDs">Details</TableColumn>
                                <TableColumn key="createdAt">Created At</TableColumn>
                                <TableColumn key="details">Details</TableColumn>
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
                                            {transaction.amountOnChainChange ? (
                                                <div className="grid gap-1">
                                                    <div className="flex gap-2 items-center">
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
                                                    <div className="flex gap-2 items-center">
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
                                        <TableCell>
                                            {transaction.transactionDetails.length > 0 ? (
                                                <div>
                                                    {transaction.transactionDetails.map(
                                                        ({
                                                            transactionDetailId,
                                                            account,
                                                            course,
                                                            directIn,
                                                        }) => {
                                                            if (!directIn) {
                                                                return (
                                                                    <div
                                                                        key={transactionDetailId}
                                                                        className="text-sm"
                                                                    >
                                                                        {" "}
                                    Enroll to{" "}
                                                                        <Link
                                                                            className="inline"
                                                                            as="button"
                                                                            onPress={() =>
                                                                                router.push(
                                                                                    `/courses/${course?.courseId}`
                                                                                )
                                                                            }
                                                                            size="sm"
                                                                        >
                                                                            {course?.title.slice(0, 15)}...
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            }
                                                            return (
                                                                <div
                                                                    key={transactionDetailId}
                                                                    className="text-sm"
                                                                >
                                                                    {" "}
                                  User{" "}
                                                                    <Link
                                                                        as="button"
                                                                        onPress={() =>
                                                                            router.push(
                                                                                `/accounts/${account?.accountId}`
                                                                            )
                                                                        }
                                                                        size="sm"
                                                                    >
                                                                        {account?.username.slice(0, 10)}...
                                                                    </Link>
                                                                    {" "}enrolled to{" "}
                                                                    <Link
                                                                        as="button"
                                                                        onPress={() =>
                                                                            router.push(
                                                                                `/courses/${course?.courseId}`
                                                                            )
                                                                        }
                                                                        size="sm"
                                                                    >
                                                                        {course?.title.slice(0, 15)}...
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    {transaction.payPalOrderId ? (
                                                        <div className="flex gap-1 items-center">
                                                            <div>Paypal Order Id:</div>
                                                            <Link as="button">{truncate(transaction.payPalOrderId)}</Link>
                                                        </div>
                                                    ) : null}
                                                    {transaction.transactionHash ? (
                                                        <div className="flex gap-1 items-center">
                                                            <div>Transaction Hash:</div>
                                                            {transaction.transactionHash ? (
                                                                <Link as="button">
                                                                    {truncate(transaction.transactionHash)}
                                                                </Link>
                                                            ) : (
                                                                "N/A"
                                                            )}
                                                        </div>
                                                    ) : null}
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {dayjs(transaction.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            <TransactionDetailsModal transaction={transaction}/>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export const TransactionsModal = () => {
    return (
        <TransactionsModalProvider>
            <WrappedTransactionsModal />
        </TransactionsModalProvider>
    )
}
