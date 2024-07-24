import React, { useContext } from "react"
import { EditQuizContentContext, EditQuizContentProvider } from "./EditQuizContentProvider"
import { Accordion, AccordionItem, Button, Link, ModalBody, ModalFooter } from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { MoreButton } from "./MoreButton"

const WrappedEditQuizContent = () => {
    const { formik, functions } = useContext(EditQuizContentContext)!
    const { addQuestion, addAnswer } = functions
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
                            formik.values.questions.map((question) => (
                                <AccordionItem
                                    key={question.quizQuestionId}
                                    startContent={<MoreButton className="text-primary" question={question} />}
                                    title={`Q${question.position}. ${question.question}`}
                                    classNames={{
                                        content: "flex flex-col gap-4 p-4",
                                        heading: "!px-4"
                                    }}
                                >
                                    {
                                        question.answers?.map((answer) => {
                                            return (
                                                <div key={answer?.quizQuestionAnswerId}>
                                                    {`${answer?.position}. ${answer?.content}`}
                                                </div>
                                            )
                                        })

                                    }
                                    <div className="w-full grid place-content-center py-3 px-4">
                                        <Link onPress={() => addAnswer(question.quizQuestionId ?? "")} as="button" className="flex gap-2 items-center">
                                            <PlusIcon className="w-5 h-5"/>
                                            <div className="text-sm"> Add Answer </div>
                                        </Link>
                                    </div>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                    <div className="w-full grid place-content-center py-3 px-4">
                        <Link onPress={() => addQuestion()} as="button" className="flex gap-2 items-center">
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