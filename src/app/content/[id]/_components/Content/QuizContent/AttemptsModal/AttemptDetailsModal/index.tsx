import { QuizAttemptEntity, sortByPosition } from "@common"
import { EyeIcon } from "@heroicons/react/24/outline"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Chip,
    ScrollShadow,
} from "@nextui-org/react"

export interface AttemptDetailsModalProps {
  attempt: QuizAttemptEntity;
}

export const AttemptDetailsModal = ({ attempt }: AttemptDetailsModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Link as="button" onPress={onOpen}>
                <EyeIcon className="w-5 h-5" />
            </Link>
            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Quiz Attempt Details</ModalHeader>
                    <ModalBody className="p-4">
                        <ScrollShadow className="h-[400px]">
                            <Table removeWrapper={true} aria-label="Example table with dynamic content">
                                <TableHeader>
                                    <TableColumn key="result">No.</TableColumn>
                                    <TableColumn key="status">Question</TableColumn>
                                    <TableColumn key="anwsers">Answers</TableColumn>
                                    <TableColumn key="status">Status</TableColumn>
                                </TableHeader>
                                <TableBody items={sortByPosition(attempt.quiz.questions)}>
                                    {({
                                        quizQuestionId,
                                        question,
                                        answers,
                                        position,
                                        corrected,
                                    }) => (
                                        <TableRow key={quizQuestionId}>
                                            <TableCell>{position}</TableCell>
                                            <TableCell>{question}</TableCell>
                                            <TableCell>
                                                {sortByPosition(answers).map(({ position, quizQuestionAnswerId, content, selected }) => (
                                                    <div
                                                        key={quizQuestionAnswerId}
                                                        className={`p-4 rounded-medium flex justify-between items-center ${selected ? "bg-content2" : ""}`}
                                                    >
                                                        {position}. {content}
                                                    </div>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                {corrected ? (
                                                    <Chip color="success" variant="flat">
                          Correct
                                                    </Chip>
                                                ) : (
                                                    <Chip color="danger" variant="flat">
                          Not Correct
                                                    </Chip>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollShadow>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
