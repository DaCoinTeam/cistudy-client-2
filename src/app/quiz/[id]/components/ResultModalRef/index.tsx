import { parseMillisecondsTime } from "@common"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { X  } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"

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
    const timemilliseconds = Number(localStorage.getItem("quizTimeLimit")) * 60 * 1000 - Number(localStorage.getItem("quizRemainingTime"))
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
                                <div className="font-semibold">Your score: {localStorage.getItem("quizScore")}/10</div>
                                <div className="font-semibold">Your finish time: {parseMillisecondsTime(timemilliseconds)}</div>
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