"use client"

import { useContext, useEffect, useRef } from "react"
import { ContentDetailsContext } from "../../../../../_hooks"
import {
    Checkbox,
    CheckboxGroup,
    Chip,
    Divider,
    Spacer,
    Image,
} from "@nextui-org/react"
import { MediaType, QuizQuestionAnswerEntity, sortByPosition } from "@common"
import { getAssetUrl, updateQuizAttemptAnswers } from "@services"
import { StartQuizContext } from "../StartQuizProvider"
import { VideoPlayer } from "../../../../../../../_shared"

export const QuestionCheckbox = () => {
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContentData, mutate } = sectionContentSwr
    const { quiz } = { ...sectionContentData }
    const { questions, activeQuizAttempt, quizId } = { ...quiz }
    const { currentQuestionPosition, quizAttemptId, attemptAnswers } = {
        ...activeQuizAttempt,
    }

    const {
        question,
        answers,
        quizQuestionId,
        numberOfCorrectAnswers,
        point,
        mediaId,
        mediaType,
    } = {
        ...questions?.find(({ position }) => position === currentQuestionPosition),
    }

    const previousQuizQuestionIdRef = useRef("")

    const { reducer } = useContext(StartQuizContext)!
    const [state, dispatch] = reducer

    useEffect(() => {
        const handleEffect = async () => {
            if (!quizAttemptId) return
            if (!quizId) return

            if (previousQuizQuestionIdRef.current) {
                await updateQuizAttemptAnswers({
                    data: {
                        quizAttemptId,
                        quizQuestionId: previousQuizQuestionIdRef.current,
                        quizQuestionAnswerIds: state.chosenValues,
                        quizId,
                    },
                })
            }

            previousQuizQuestionIdRef.current = quizQuestionId ?? ""

            await mutate()

            dispatch({
                type: "SET_CHOSEN_VALUES",
                payload: (attemptAnswers ?? [])
                    .filter(({ quizQuestionAnswerId }) =>
                        answers
                            ?.map(({ quizQuestionAnswerId }) => quizQuestionAnswerId)
                            .includes(quizQuestionAnswerId)
                    )
                    .map(({ quizQuestionAnswerId }) => quizQuestionAnswerId),
            })
        }
        handleEffect()
    }, [currentQuestionPosition, quizAttemptId])

    return (
        <div className="w-full">
            <div className="text-sm">
        Question {currentQuestionPosition} of {questions?.length}
            </div>
            <Spacer y={1} />
            <Divider />
            <Spacer y={4} />
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold !text-foreground">{question}</div>
                <Chip variant="flat">{point} points</Chip>
            </div>
            <div className="text-foreground-400 text-sm">
        (Choose {numberOfCorrectAnswers} answer
                {(numberOfCorrectAnswers ?? 0) > 1 ? "s" : ""})
            </div>
            {mediaId ? (
                <>
                    <Spacer y={2} />
                    {mediaType == MediaType.Image ? (
                        <Image
                            src={getAssetUrl(mediaId)}
                            alt="media"
                            className="w-[400px] aspect-video"
                        />
                    ) : (
                        <VideoPlayer
                            src={getAssetUrl(mediaId)}
                            className="w-[400px] aspect-video"
                        />
                    )}
                </>
            ) : null}

            <Spacer y={4} />
            <CheckboxGroup
                onValueChange={(values) =>
                    dispatch({
                        type: "SET_CHOSEN_VALUES",
                        payload: values,
                    })
                }
                value={state.chosenValues}
            >
                {sortByPositionButLast(answers ?? []).map(
                    ({ quizQuestionAnswerId, content }) => (
                        <Checkbox key={quizQuestionAnswerId} value={quizQuestionAnswerId}>
                            {content}
                        </Checkbox>
                    )
                )}
            </CheckboxGroup>
        </div>
    )
}

export const sortByPositionButLast = (
    answers: Array<QuizQuestionAnswerEntity>
) => {
    const lastAnswer = answers.find(({ lastAnswer }) => lastAnswer) 
    let nonLastAnswers = answers.filter(({ lastAnswer }) => !lastAnswer)
    nonLastAnswers = sortByPosition(nonLastAnswers)
    return lastAnswer ? [...nonLastAnswers, lastAnswer ] : nonLastAnswers
}
