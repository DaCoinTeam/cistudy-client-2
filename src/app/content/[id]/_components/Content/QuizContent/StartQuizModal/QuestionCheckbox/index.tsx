"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { ContentDetailsContext } from "../../../../../_hooks"
import { Checkbox, CheckboxGroup, Divider, Spacer } from "@nextui-org/react"
import { sortByPosition } from "@common"
import { updateQuizAttemptAnswers } from "@services"

export const QuestionCheckbox = () => {
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContentData } = sectionContentSwr
    const { quiz } = { ...sectionContentData }
    const { questions, activeQuizAttempt, quizId } = { ...quiz }
    const { currentQuestionPosition, quizAttemptId, attemptAnswers } = {
        ...activeQuizAttempt,
    }

    const { question, answers, quizQuestionId } = {
        ...questions?.at(currentQuestionPosition ?? 0),
    }

    const [chosenValues, setChosenValues] = useState<Array<string>>([])

    const previousQuizQuestionIdRef = useRef("")

    useEffect(() => {
        const handleEffect = async () => {
            if (!quizAttemptId) return
            if (!quizId) return

            if (previousQuizQuestionIdRef.current) {
                await updateQuizAttemptAnswers({
                    data: {
                        quizAttemptId,
                        quizQuestionId: previousQuizQuestionIdRef.current,
                        quizQuestionAnswerIds: chosenValues,
                        quizId
                    },
                })
            }

            previousQuizQuestionIdRef.current = quizQuestionId ?? ""

            setChosenValues(
                (attemptAnswers ?? [])
                    .filter(({ quizQuestionAnswerId }) =>
                        answers
                            ?.map(({ quizQuestionAnswerId }) => quizQuestionAnswerId)
                            .includes(quizQuestionAnswerId)
                    )
                    .map(({ quizQuestionAnswerId }) => quizQuestionAnswerId)
            )
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
            <CheckboxGroup
                classNames={{
                    label: "text-lg font-semibold !text-foreground mb-2",
                }}
                label={question}
                onValueChange={(values) => setChosenValues(values)}
                value={chosenValues}
            >
                {sortByPosition(answers ?? []).map(
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
