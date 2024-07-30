import {
    Button,
    Chip,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { StartQuizContext } from "../StartQuizProvider"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { parseDuration } from "../../../../../../../../common/utils"
import { ContentDetailsContext } from "../../../../../_hooks"
import numeral from "numeral"

export interface ResultModalRefSelectors {
  onOpen: () => void;
}

export const ResultModalRef = forwardRef<ResultModalRefSelectors>((_, ref) => {
    const { reducer } = useContext(StartQuizContext)!
    const [state] = reducer
    const { isPassed, receivedPercent, timeTaken, receivedPoints, totalPoints } =
    state
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const {swrs} = useContext(ContentDetailsContext)!
    const {sectionContentSwr} = swrs
    const { mutate, isValidating } = sectionContentSwr

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2">Your Result</ModalHeader>
                <ModalBody className="p-4">
                    <div className="grid place-items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <div className="text-4xl font-semibold text-primary">
                                {numeral(receivedPercent).format("0.00")}%
                            </div>
                        </div>
                        <div className="gap-4 place-items-center flex items-center w-full">
                            <div className="flex gap-1 items-center flex-1 flex-row-reverse">
                                <div className="grid gap-1">
                                    <div className="flex gap-1 items-center text-sm">
                                        <div className="min-w-[100px] font-semibold">Score </div>
                                        <div>{receivedPoints}/{totalPoints}</div>
                                    </div>
                                    <div className="flex gap-1 items-center text-sm">
                                        <div className="min-w-[100px] font-semibold">Time taken </div>
                                        <div>{parseDuration(Number((timeTaken ?? 0) / 1000))}</div>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation="vertical" className="h-10"/>
                            <div className="flex-1 flex">
                                <Chip
                                    classNames={{
                                        base: "px-1.5",
                                    }}
                                    startContent={
                                        isPassed ? (
                                            <CheckCircleIcon className="text-success w-5 h-5" />
                                        ) : (
                                            <XCircleIcon className="text-danger w-5 h-5" />
                                        )
                                    }
                                    variant="flat"
                                    color={isPassed ? "success" : "danger"}
                                            
                                >
                                    {isPassed ? "Passed" : "Not Passed"}
                                </Chip>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button
                        isLoading={isValidating}
                        color="primary"
                        onPress={async () => {
                            await mutate()
                            onClose()
                        }}
                        variant="bordered"
                    >
                Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})
