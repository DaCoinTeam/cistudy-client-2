import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider, Chip } from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { ContentDetailsContext } from "../../../../_hooks"
import CountdownTimer from "./Countdown"
import { QuizProgressState, QuizTimeState, StartQuizContext, StartQuizProvider } from "./StartQuizProvider"
import { ArrowLeft, ArrowRight, Circle, CircleDot } from "lucide-react"
import { ConfirmModalRef, ConfirmModalRefSelectors } from "../../../../../../_shared"
import { ErrorResponse } from "@common"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { ResultModalRef, ResultModalRefSelectors } from "./ResultModalRef"
import { QuizAnswer } from "./useStartQuizReducer"

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

    const handleNextQuestion = () => {
        dispatch({ type: "SET_CURRENT_QUESTION_INDEX", payload: state.currentQuestionIndex + 1 })
    }

    const handlePreviousQuestion = () => {
        dispatch({ type: "SET_CURRENT_QUESTION_INDEX", payload: state.currentQuestionIndex - 1 })
    }

    const handleSelectQuestion = (index: number) => {
        dispatch({ type: "SET_CURRENT_QUESTION_INDEX", payload: index })
    }

    const handleSelectedAnswer = ({questionIndex, answerIndex} : {questionIndex: number, answerIndex: string}) => {
        const selectedAnswer = {
            questionIndex: questionIndex.toString(),
            answerIndex: [answerIndex],
            isAnswered: true
        }

        dispatch({
            type: "SET_SELECTED_OPTION_FOR_QUESTION",
            payload: [selectedAnswer]
        })
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
                            <ModalHeader className="flex flex-col">
                                <div className="text-primary">{sectionContentData?.title}</div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-7 max-w-[1920px]">
                                    <div className="col-span-2">
                                        {
                                            quiz?.questions.map((_, index) => (
                                                <Button key={index} color="primary" className={`w-20 h-16 mb-4 mr-4 text-white ${isAnswered(index)? "opacity-50" : ""}`} onPress={() => handleSelectQuestion(index)}>
                                                    {index + 1}
                                                </Button>
                                            ))
                                        }
                                        <div className="flex flex-col items-center">
                                            <div className="flex flex-row justify-center gap-2">
                                                <Button 
                                                    startContent={<ArrowLeft />}
                                                    color="primary"
                                                    className="text-white"
                                                    onPress={handlePreviousQuestion} 
                                                    isDisabled={state.currentQuestionIndex === 0}
                                                />
                                                <Button 
                                                    color="primary" 
                                                    className="text-white"
                                                    endContent={<ArrowRight />} 
                                                    onPress={handleNextQuestion} 
                                                    isDisabled={state.currentQuestionIndex === (quiz?.questions.length ?? 0) - 1}
                                                />
                                            </div>
                                            <div className="mt-32 ml-6">
                                                <CountdownTimer initialTime={Number(quizTimeState?.remainingTime)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-5">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-row items-center justify-between">
                                                <div className="flex flex-row gap-1">
                                                    <div className="text-primary font-semibold">Question {state.currentQuestionIndex+1}</div>
                                                    <div className="text-primary font-semibold">of {quiz?.questions.length}</div>
                                                </div>
                                                <Chip color="default" size="md">{quiz?.questions[state.currentQuestionIndex].point} point</Chip>
                                            </div>
                                            <Divider />
                                            <div className="font-semibold text-primary">{quiz?.questions[state.currentQuestionIndex].question}</div>
                                            <div className="flex flex-col gap-4">
                                                {
                                                    quiz?.questions[state.currentQuestionIndex].answers.map((answer, index) => (
                                                        <Button 
                                                            startContent={
                                                                state.selectedAnswers?.some(a => a.questionIndex === state.currentQuestionIndex.toString() && a.answerIndex.includes(answer.quizQuestionAnswerId)) ?
                                                                    <CircleDot size={20} /> :
                                                                    <Circle size={20} />
                                                            } 
                                                            key={index} color="primary" 
                                                            variant="light" 
                                                            className="flex justify-start font-semibold w-fit" 
                                                            onPress={() => handleSelectedAnswer({questionIndex: state.currentQuestionIndex, answerIndex: answer.quizQuestionAnswerId})}
                                                        >
                                                            {answer.content}
                                                        </Button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
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