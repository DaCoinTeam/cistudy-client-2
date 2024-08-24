import { EyeIcon } from "@heroicons/react/24/outline"
import {
    Button,
    Chip,
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
import { countDayHoursMinutesLeft, TransactionEntity, TransactionStatus, TransactionType, truncate } from "@common"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"

interface TransactionDetailsModalProps {
    transaction: TransactionEntity 
}

export const TransactionDetailsModal = ({ transaction }: TransactionDetailsModalProps) => {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
    const router = useRouter()
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
                                <div>{transaction.transactionId}</div>
                            </Snippet>
 
                            <Spacer y={4}/>
                            <div>
                                <div className="font-semibold">
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
                                            } ${transaction.status == TransactionStatus.Pending && "text-warning"}`}
                                        >
                                            {transaction.amountDepositedChange >= 0 ? "+" : ""}
                                            {transaction.amountDepositedChange} STARCI
                                        </div>
                                    )}
                                </div>
                                <Spacer y={4}/>
                                <div className="text-sm">Status &ensp;{renderStatus(transaction.status)}</div>
                                <Spacer y={2}/>
                                <div className="text-sm">Type &ensp;  &ensp;{renderType(transaction.type)}</div>
                               
                            </div>
                            <Spacer y={4}/>
                            {transaction.status == TransactionStatus.Pending && (
                                <>
                                    <div className="text-sm">
                                        <div>You will receive reward earning after </div>
                                        <Spacer y={1}/>
                                        <div className=" bg-warning/50 p-3 rounded-medium w-fit">
                                            {countDayHoursMinutesLeft(transaction.createdAt, 3)}
                                        </div>
                                    </div>
                                    <Spacer y={4}/>
                                </>
                            )}
                            

                            <div className="text-primary font-semibold">Details</div>
                            <Spacer y={1}/>
                            <div className="text-sm">
                                {transaction.transactionDetails.length > 0 ? (
                                    <div className="grid gap-1">
                                        {transaction.transactionDetails.map(
                                            ({
                                                transactionDetailId,
                                                account,
                                                course,
                                                directIn,
                                                post
                                            }) => {
                                                if(course) {
                                                    if (!directIn) {
                                                        return (
                                                            <div
                                                                key={transactionDetailId}
                                                                className="text-sm "
                                                            >
                                                                {" "}
                                        Enroll to{" "}
                                                                <Link
                                                                    className="inline cursor-pointer"
                                                                    // as="button"
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
                                                if (transaction.type === TransactionType.Earn) {
                                                    if (post) {
                                                        return (
                                                            <div className="text-sm" key={transactionDetailId}>
                                                                {transaction.preTextEarn}  <Link
                                                                    as="button"
                                                                    onPress={() =>
                                                                        router.push(
                                                                            `/posts/${post.postId}`
                                                                        )
                                                                    }
                                                                    size="sm"
                                                                >
                                                                    {post?.title.slice(0, 40)}
                                                                </Link>
                                                            </div>
                                                        )
                                                    }
                                                }
                                               
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
                            <Spacer y={4}/>
                            <div className="text-sm"> 
                                Created At:&ensp;{dayjs(transaction.createdAt).format(" DD/MM/YYYY HH:mm:ss")}
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
