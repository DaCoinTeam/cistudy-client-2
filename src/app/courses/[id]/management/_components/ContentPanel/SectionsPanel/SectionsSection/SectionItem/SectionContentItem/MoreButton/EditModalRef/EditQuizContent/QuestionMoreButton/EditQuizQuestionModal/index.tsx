import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle, useState } from "react"
import { EditQuizContentContext } from "../../EditQuizContentProvider"
import { QuizQuestionEntity } from "@common"

export interface EditQuizQuestionModalRefProps {
    question: QuizQuestionEntity
}

export interface EditQuizQuestionModalRefSelectors {
    onOpen: () => void
}

export const EditQuizQuestionModalRef = forwardRef<
EditQuizQuestionModalRefSelectors,
EditQuizQuestionModalRefProps
>((props, ref) => {
    const [newQuizQuestion, setNewQuizQuestion] = useState<string>()
    const {question} = props
    const {quizQuestionId, question: quizQuestion} = question
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const onHandleDiscard = () => {
        onClose()
    }

    const onHandleSave = () => {
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
            <ModalContent>
                <ModalHeader className="p-4 pb-2 text-xl">Edit Quiz Question</ModalHeader>
                <ModalBody>
                    <Input
                        id="quizQuestion"
                        isRequired
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }}
                        labelPlacement="outside"
                        placeholder="Input quiz question here"
                        onChange={(e) => setNewQuizQuestion(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onPress={() => onHandleDiscard()}>
                        Discard
                    </Button>
                    <Button color="secondary" onPress={() => onHandleSave()} >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})