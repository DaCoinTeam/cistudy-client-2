import React, { useContext } from "react"
import { EditQuizContentProvider } from "./EditQuizContentProvider"
import { Accordion, AccordionItem, Button, Link, ModalBody, ModalFooter } from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { QuestionMoreButton } from "./QuestionMoreButton"
import { AnswerMoreButton } from "./AnswerMoreButton"
import { QuizQuestionAnswerEntity } from "@common"
import { createQuizQuestion, createQuizQuestionAnswer, CreateQuizQuestionAnswerInput, CreateQuizQuestionInput } from "@services"
import useSWRMutation from "swr/mutation"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { SectionContentItemContext } from "../../.."
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../_components"

const WrappedEditQuizContent = () => {
    const {props} = useContext(SectionContentItemContext)!
    const {swrs} = useContext(ManagementContext)!
    const {notify} = useContext(RootContext)!
    const {courseManagementSwr} = swrs
    const {mutate} = courseManagementSwr
    const {sectionContent} = props
    const { quiz } = sectionContent
    const {quizId, questions} = quiz

    console.log(props)

    const createQuizQuestionSwrMutation = useSWRMutation(
        "CREATE_QUIZ_QUESTION",
        async (_: string, { arg } : {arg : CreateQuizQuestionInput}) => {
            return await createQuizQuestion(arg)
        }
    )

    const createQuizQuestionAnswerSwrMutation = useSWRMutation(
        "CREATE_QUIZ_QUESTION_ANSWER",
        async (_: string, { arg } : {arg : CreateQuizQuestionAnswerInput}) => {
            return await createQuizQuestionAnswer(arg)
        }
    )

    const handleAddQuestion = async() => {
        const { message } = await createQuizQuestionSwrMutation.trigger({data: {quizId}})
        await mutate()
        notify!({
            data: {
                message
            },
            type: ToastType.Success
        })
    }

    const handleAddAnswer = async(quizQuestionId: string) => {
        const { message } = await createQuizQuestionAnswerSwrMutation.trigger({data: {quizQuestionId}})
        await mutate()
        notify!({
            data: {
                message
            },
            type: ToastType.Success
        })
    }

    return (
        <>
            <ModalBody className="p-4">
                <div className="border border-divider rounded-medium">
                    <Accordion
                        selectionMode="multiple"
                        variant="light"
                        className="!px-0 gap-4"
                        itemClasses={{
                            base: "!shadow-none gap-4",
                            title: "font-semibold text-primary"
                        }}
                    >
                        {
                            questions.map((question) => (
                                <AccordionItem
                                    key={question.quizQuestionId}
                                    startContent={<QuestionMoreButton className="text-primary" question={question} />}
                                    title={`Q${question.position}. ${question.question}`}
                                    classNames={{
                                        content: "flex flex-col gap-4 p-4",
                                        heading: "!px-4"
                                    }}
                                >
                                    {
                                        question.answers?.map((answer) => {
                                            return (
                                                <div key={answer?.quizQuestionAnswerId} className="flex flex-row items-center gap-4">
                                                    <AnswerMoreButton className="text-primary" answer={answer as QuizQuestionAnswerEntity} question={question}  />
                                                    <span className="text-primary font-semibold">{`${answer?.position}. ${answer?.content}`}</span>
                                                </div>
                                            )
                                        })

                                    }
                                    <div className="w-full grid place-content-center py-3 px-4">
                                        <Link onPress={() => handleAddAnswer(question.quizQuestionId)} as="button" className="flex gap-2 items-center">
                                            <PlusIcon className="w-5 h-5"/>
                                            <div className="text-sm"> Add Answer </div>
                                        </Link>
                                    </div>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                    <div className="w-full grid place-content-center py-3 px-4">
                        <Link onPress={handleAddQuestion} as="button" className="flex gap-2 items-center">
                            <PlusIcon className="w-5 h-5"/>
                            <div className="text-sm"> Add Question </div>
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter><Button/></ModalFooter>
        </>
    )
}

export const EditQuizContent = () => {
    return (
        <EditQuizContentProvider>
            <WrappedEditQuizContent/>
        </EditQuizContentProvider>
    )
}