import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Spacer,
} from "@nextui-org/react"
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ContentDetailsContext } from "../../../../_hooks"
import { StartQuizContext, StartQuizProvider } from "./StartQuizProvider"
import {
    ConfirmModalRef,
    ConfirmModalRefSelectors,
    LoadingFadeScreen,
} from "../../../../../../_shared"
import { ResultModalRef, ResultModalRefSelectors } from "./ResultModalRef"
import { QuizIndexTable } from "./QuizIndexTable"
import { QuestionCheckbox } from "./QuestionCheckbox"
import { CountdownTimer } from "./Countdown"
import { SocketIOContext } from "../../../../../../_hooks"

export interface StartQuizModalRefSelectors {
  onOpen: () => void;
  onClose: () => void;
}

const WrappedStartQuizModal = forwardRef<StartQuizModalRefSelectors>(
    (_, ref) => {
        const confirmModalRef = useRef<ConfirmModalRefSelectors>(null)
        
        const resultModalRef = useRef<ResultModalRefSelectors>(null)

        const { swrs } = useContext(ContentDetailsContext)!
        const { sectionContentSwr } = swrs
        const { data: sectionContentData } = sectionContentSwr
        const { quiz } = { ...sectionContentData }
        const { activeQuizAttempt } = { ...quiz }
        const { quizAttemptId } = {
            ...activeQuizAttempt,
        }
        const { reducer, swrs: startQuizSwrs } = useContext(StartQuizContext)!
        const { finishQuizAttemptSwrMutation } = startQuizSwrs
        const { trigger, isMutating } = finishQuizAttemptSwrMutation
        const [state, dispatch] = reducer
        const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
            onClose,
        }))

        const socket = useContext(SocketIOContext)!

        const [finished, setFinished] = useState(false)

        useEffect(() => {
            if (!socket) return
            socket.on("finishAttempt", (result: {
                receivedPercent : number
                isPassed: boolean
                timeTaken: number
                receivedPoints : number
                totalPoints : number
              }) => {
                setFinished(true)
                dispatch({
                    type: "SET_STATE",
                    payload: result,
                })
                onClose()
                resultModalRef.current?.onOpen()
                setFinished(false)
            })
        }, [socket])

        return (
            <div>
                <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        <ModalBody className="p-0">
                            <div className="flex gap-4 p-4">
                                {
                                    finished ? (
                                        <div className="grid gap-4">
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <QuizIndexTable />
                                                <Spacer y={6} />
                                                <CountdownTimer />
                                            </div>
                                            <QuestionCheckbox />
                                            <LoadingFadeScreen isLoading={state.isLoading} />
                                        </>
                                    )
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter className="gap-2">
                            <Button color="primary" variant="bordered" onPress={onClose}>
                    Close
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => { 
                                    confirmModalRef.current?.onOpen() 
                                }}
                            >
                    Submit
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <ConfirmModalRef
                    ref={confirmModalRef}
                    title="Submit your answers"
                    content="Continue to submit?"
                    isLoading={isMutating}
                    onOKPress={async () => {
                        if (!quizAttemptId) return
                        const { others } = await trigger({
                            data: {
                                quizAttemptId,
                            },
                        })
                        onClose()
                        dispatch({
                            type: "SET_STATE",
                            payload: others,
                        })
                        resultModalRef.current?.onOpen()
                    }}
                />
                <ResultModalRef ref={resultModalRef} />
            </div>
        )
    }
)

export const StartQuizModal = forwardRef<StartQuizModalRefSelectors>(
    (_, ref) => {
        return (
            <StartQuizProvider>
                <WrappedStartQuizModal ref={ref} />
            </StartQuizProvider>
        )
    }
)
