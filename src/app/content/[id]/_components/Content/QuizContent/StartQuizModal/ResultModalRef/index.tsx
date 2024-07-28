import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { X } from "lucide-react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { StartQuizContext } from "../StartQuizProvider"

export interface ResultModalRefSelectors {
  onOpen: () => void;
}

export const ResultModalRef = forwardRef<ResultModalRefSelectors>((_, ref) => {
    const { reducer } = useContext(StartQuizContext)!
    const [state] = reducer
    const { isOpen, onOpen, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal isOpen={isOpen} size="sm">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="p-4 pb-2 text-2xl">Your Result</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="text-sm">
                                <div className="font-semibold">
                  Your result: {state.receivedPercent}%
                                </div>
                                <div className="font-semibold">
                  Your finish time: {state.timeTaken} mins
                                </div>
                                <div className="font-semibold">
                  Your results: {state.isPassed}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="p-4 pt-2">
                            <Button
                                startContent={<X size={20} strokeWidth={3 / 2} />}
                                color="primary"
                                onPress={() => {
                                    onClose()
                                }}
                            >
                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})
