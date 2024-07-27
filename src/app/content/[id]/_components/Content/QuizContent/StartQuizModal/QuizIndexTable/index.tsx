"use client"

import React, { useContext } from "react"
import { ContentDetailsContext } from "../../../../../_hooks"
import { Button, ButtonGroup, Spacer } from "@nextui-org/react"
import { sortByPosition } from "@common"
import useSWRMutation from "swr/mutation"
import { UpdateQuizAttemptInput, updateQuizAttempt } from "@services"
import { StartQuizContext } from "../StartQuizProvider"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "lucide-react"

export const QuizIndexTable = () => {
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContentData, mutate } = sectionContentSwr
    const { quiz } = { ...sectionContentData }
    const { questions, activeQuizAttempt } = { ...quiz }
    const { quizAttemptId, currentQuestionPosition  } = { ...activeQuizAttempt }

    const { trigger } = useSWRMutation("UPDATE_QUIZ_ATTEMPT", async (_: string, { arg } : { arg: UpdateQuizAttemptInput}) => {
        return await updateQuizAttempt(arg)
    })

    const { reducer } = useContext(StartQuizContext)!
    const [, dispatch] = reducer

    return (
        <div>
            <div className="w-full grid grid-cols-5 gap-1">
                {sortByPosition(questions ?? []).map(({ quizQuestionId, position }) => (
                    <Button
                        className="!min-w-0"
                        color="primary"
                        key={quizQuestionId}
                        //isDisabled={currentQuestionPosition === position}
                        variant={currentQuestionPosition === position ? "solid" : "flat"}
                        onPress={async () => {
                            dispatch({
                                type: "SET_LOADING",
                                payload: true
                            })
                            await trigger({
                                data: {
                                    quizAttemptId: quizAttemptId ?? "",
                                    currentQuestionPosition: position
                                }
                            })
                            await mutate()
                            dispatch({
                                type: "SET_LOADING",
                                payload: false
                            })
                        }}
                    >
                        {position}
                    </Button>
                ))}
            </div>
            <Spacer y={4}/>
            <ButtonGroup color="primary" variant="light">
                <Button onPress={async () => {
                    dispatch({
                        type: "SET_LOADING",
                        payload: true
                    })
                    await trigger({
                        data: {
                            quizAttemptId: quizAttemptId ?? "",
                            currentQuestionPosition: (currentQuestionPosition ?? 0) - 1
                        }
                    })
                    await mutate()
                    dispatch({
                        type: "SET_LOADING",
                        payload: false
                    })
                }} isIconOnly isDisabled={currentQuestionPosition === 1}>
                    <ArrowLeftIcon className="w-5 h-5"/>
                </Button>
                <Button onPress={async () => {
                    dispatch({
                        type: "SET_LOADING",
                        payload: true
                    })
                    await trigger({
                        data: {
                            quizAttemptId: quizAttemptId ?? "",
                            currentQuestionPosition: (currentQuestionPosition ?? 0) + 1
                        }
                    })
                    await mutate()
                    dispatch({
                        type: "SET_LOADING",
                        payload: false
                    })
                }} isIconOnly isDisabled={currentQuestionPosition === questions?.length}>
                    <ArrowRightIcon className="w-5 h-5"/>
                </Button>
            </ButtonGroup>
        </div>
    )
}
