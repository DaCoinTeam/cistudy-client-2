import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Spacer,
} from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
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
        const { isOpen, onOpen, onClose } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
            onClose,
        }))

        return (
            <div>
                <Modal size="4xl" isOpen={isOpen}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody className="p-0">
                                    <div className="flex gap-6 p-6">
                                        <div>
                                            <QuizIndexTable />
                                            <Spacer y={6} />
                                            <CountdownTimer />
                                        </div>
                                        <QuestionCheckbox />
                                    </div>
                                    <LoadingFadeScreen isLoading={state.isLoading} />
                                </ModalBody>
                                <ModalFooter className="gap-2">
                                    <Button color="primary" variant="bordered" onPress={onClose}>
                    Close
                                    </Button>
                                    <Button
                                        isLoading={isMutating}
                                        color="primary"
                                        onPress={() => { 
                                            confirmModalRef.current?.onOpen() 
                                        }}
                                    >
                    Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <ConfirmModalRef
                    ref={confirmModalRef}
                    title="Submit your answers"
                    content="Continue to submit?"
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
