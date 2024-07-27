import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider, Chip } from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { ContentDetailsContext } from "../../../../_hooks"
import CountdownTimer from "./Countdown"
import { QuizProgressState, QuizTimeState, StartQuizContext, StartQuizProvider } from "./StartQuizProvider"
import { ArrowLeft, ArrowRight, Circle, CircleDot } from "lucide-react"
import { ConfirmModalRef, ConfirmModalRefSelectors, LoadingFadeScreen } from "../../../../../../_shared"
import { ErrorResponse } from "@common"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { ResultModalRef, ResultModalRefSelectors } from "./ResultModalRef"
import { QuizAnswer } from "./useStartQuizReducer"
import { QuizIndexTable } from "./QuizIndexTable"
import { QuestionCheckbox } from "./QuestionCheckbox"

export interface StartQuizModalRefProps {

}

export interface StartQuizModalRefSelectors {
    onOpen: () => void;
    onClose: () => void;
}

const WrappedStartQuizModal = forwardRef<
    StartQuizModalRefSelectors,
    StartQuizModalRefProps
>((_, ref) => {
    const quizProgressState: QuizProgressState = JSON.parse(localStorage.getItem("quizProgressState") ?? "{}")
    const quizTimeState: QuizTimeState = JSON.parse(localStorage.getItem("quizTimeState") ?? "{}")
    const timemilliseconds = Number(quizTimeState?.timeLimit) - Number(quizTimeState?.remainingTime)
    const confirmModalRef = useRef<ConfirmModalRefSelectors>(null)
    const resultModalRef = useRef<ResultModalRefSelectors>(null)
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(ContentDetailsContext)!
    const {reducer, swrs: startQuizSwrs} = useContext(StartQuizContext)!
    const {finishQuizAttemptSwrMutation} = startQuizSwrs
    const { trigger: finishTrigger } = finishQuizAttemptSwrMutation
    const [state, dispatch] = reducer
    const { sectionContentSwr } = swrs
    const { data: sectionContentData, mutate } = sectionContentSwr
    const { quiz } = { ...sectionContentData }
    const { isOpen, onOpen, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
        onClose
    }))

    const handleCloseQuiz = () => {
        mutate()
        window.dispatchEvent(new Event("storage"))
        onClose()
    }

    const handleFinishQuiz = () => {
        mutate()
        window.dispatchEvent(new Event("storage"))
        dispatch({ type: "RESET" })
        onClose()
    }

    const handleSubmitQuiz = async() => {
        const quizQuestionAnswerIds = quizProgressState.selectedAnswers.map((a : QuizAnswer) => a.answerIndex).flat()
        try {
            const res = await finishTrigger({
                data: {
                    quizAttemptId: quizProgressState.quizAttemptId,
                    quizQuestionAnswerIds,
                    timeTaken: timemilliseconds
                }
            })
            localStorage.setItem("quizProgressState", JSON.stringify(quizProgressState))
            notify!({
                data: {
                    message: res.message
                },
                type: ToastType.Success 
            })
            dispatch({
                type: "SET_SCORE",
                payload: res.others.score
            })
            dispatch({
                type: "SET_FINISH_TIME",
                payload: timemilliseconds
            })
            resultModalRef.current?.onOpen()
            localStorage.removeItem("quizProgressState")
        } catch (ex) {
            const { message } = ex as ErrorResponse
            notify!({
                data: {
                    error: message as string
                },
                type: ToastType.Error
            })
            onClose()
        }
    }

    const handleConfirmSubmit = () => {
        confirmModalRef.current?.onOpen()
    }

    const isAnswered = (questionIndex: number) => {
        return state.selectedAnswers.some(a => a.questionIndex === questionIndex.toString() && a.isAnswered)
    }

    return (
        <div>
            <Modal
                size="full"
                isOpen={isOpen}
                onClose={handleCloseQuiz}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0">
                                <div className="grid grid-cols-7 max-w-[1920px] p-6 gap-12">
                                    <div className="col-span-2">
                                        <QuizIndexTable/>
                                    </div>
                                    <div className="col-span-5">
                                        <QuestionCheckbox/>
                                    </div>
                                </div>
                                <LoadingFadeScreen isLoading={state.isLoading}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                                <Button color="primary" className="text-white" onPress={handleConfirmSubmit}>
                                Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ConfirmModalRef ref={confirmModalRef} title="Submit your answers" content="Continue to submit?" onOKPress={handleSubmitQuiz} />
            <ResultModalRef ref={resultModalRef} onClosePress={handleFinishQuiz} />
        </div>
    )
})

export const StartQuizModal = forwardRef<
    StartQuizModalRefSelectors,
    StartQuizModalRefProps
>((props, ref) => {
    return (
        <StartQuizProvider>
            <WrappedStartQuizModal {...props} ref={ref} />
        </StartQuizProvider>
    )
})