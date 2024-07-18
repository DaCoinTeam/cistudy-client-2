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
import { TransactionType, parseISODateString, truncate } from "@common"
import {
    ROWS_PER_PAGE,
    TransactionsModalContext,
    TransactionsModalProvider,
} from "./TransactionModaProvider"

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
        }
        return typeToComponent[type]
    }

    const onPageChange = (page: number) =>
        dispatch({
            type: "SET_PAGE",
            payload: page,
        })

    const pages = count ? Math.ceil(count / ROWS_PER_PAGE) : 0

    return (
        <>
            <Link size="sm" as="button" onPress={onOpen}>View Transactions</Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Transactions</ModalHeader>
                    <ModalBody className="p-4">
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
                                                color="secondary"
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
                                <TableColumn key="balanceChange">Balance Change</TableColumn>
                                <TableColumn key="IDs">Metadata</TableColumn>
                                <TableColumn key="createdAt">Created At</TableColumn>
                            </TableHeader>
                            <TableBody
                                emptyContent={"No transactions found."}
                                items={results ?? []}
                                loadingContent={<Spinner />}
                                loadingState={loadingState()}
                            >
                                {({
                                    createdAt,
                                    transactionId,
                                    transactionHash,
                                    payPalOrderId,
                                    amountDepositedChange,
                                    amountOnChainChange,
                                    type
                                }) => (
                                    <TableRow key={transactionId}>
                                        <TableCell>
                                            <Snippet
                                                hideSymbol
                                                classNames={{
                                                    base: "!bg-inherit",
                                                }}
                                                codeString={transactionId}
                                            >
                                                {truncate(transactionId)}
                                            </Snippet>
                                        </TableCell>
                                        <TableCell>
                                            {renderType(type)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="grid gap-1">
                                                <div className="flex gap-2 items-center">
                                                    <div>Deposited: </div>
                                                    {amountDepositedChange >= 0 ? (
                                                        <div className="text-success">
                              +{amountDepositedChange} STARCI
                                                        </div>
                                                    ) : (
                                                        <div className="text-danger">
                                                            {amountDepositedChange} STARCI
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <div>On-chain: </div>
                                                    {amountOnChainChange >= 0 ? (
                                                        <div className="text-success">
                              +{amountOnChainChange} STARCI
                                                        </div>
                                                    ) : (
                                                        <div className="text-danger">
                                                            {amountOnChainChange} STARCI
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 items-center">
                                                <div>Paypal Order Id:</div>
                                                <Link as="button">
                                                    {truncate(payPalOrderId) ?? "N/A"}
                                                </Link>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <div>Transaction Hash:</div>
                                                {transactionHash ? truncate(transactionHash) : "N/A"}
                                            </div>
                                        </TableCell>
                                        <TableCell>{parseISODateString(createdAt)}</TableCell>
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
