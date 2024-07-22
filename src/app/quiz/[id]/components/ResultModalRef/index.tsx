import { parseMillisecondsTime } from "@common"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { X  } from "lucide-react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { QuizContext } from "../../hooks"

export interface ResultModalRefProps {
    onOKPress: () => void
}

export interface ResultModalRefSelectors {
    onOpen: () => void;
}

export const ResultModalRef = forwardRef<
ResultModalRefSelectors,
ResultModalRefProps
>((props, ref) => {
    const {reducer} = useContext(QuizContext)!
    const [state] = reducer
    const {onOKPress} = props
    const { isOpen, onOpen } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal isOpen={isOpen} onOpenChange={onOKPress} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="p-4 pb-2 text-2xl">Your Result</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="text-sm">
                                <div className="font-semibold">Your score: {state.score}/10</div>
                                <div className="font-semibold">Your finish time: {parseMillisecondsTime(state.finishTime)}</div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="p-4 pt-2">
                            <Button startContent={<X size={20} strokeWidth={3/2}/>} color="secondary" onPress={() => {
                                onOKPress()
                                onClose()
                            }}>
                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})