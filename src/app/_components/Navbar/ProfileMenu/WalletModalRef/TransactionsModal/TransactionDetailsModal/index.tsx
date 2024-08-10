import { EyeIcon } from "@heroicons/react/24/outline"
import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Snippet,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import { TransactionEntity, truncate } from "@common"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

interface TransactionDetailsModalProps {
    transaction: TransactionEntity 
}

export const TransactionDetailsModal = ({ transaction }: TransactionDetailsModalProps) => {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
    const router = useRouter()

    return (
        <>
            <Link size="sm" as="button" onPress={onOpen}>
                <EyeIcon className="w-5 h-5" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Transaction Details</ModalHeader>
                    <ModalBody className="p-4">
                        <div>
                            <Snippet hideSymbol>
                                <div>Id: {transaction.transactionId}</div>
                            </Snippet>
                            <Spacer y={1.5}/>
                            <div className="text-xs text-foreground-400">
                            Created At: {dayjs(transaction.createdAt).format(" DD/MM/YYYY HH:mm:ss")}
                            </div>
                            
                            <Spacer y={4}/>
                            <div className="text-sm">
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
                            </div>
                            <Spacer y={4}/>
                            <div className="text-sm">
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
                                                                {course?.title}
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
                                                            {account?.username}
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
                                                            {course?.title}
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
                            </div>
                        </div>         
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <Button color="primary" variant="bordered" onPress={onClose}>
              Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
