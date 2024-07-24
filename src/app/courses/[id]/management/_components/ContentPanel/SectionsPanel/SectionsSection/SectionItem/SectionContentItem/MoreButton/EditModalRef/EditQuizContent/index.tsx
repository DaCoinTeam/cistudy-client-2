import React, { useContext } from "react"
import { EditQuizContentContext, EditQuizContentProvider } from "./EditQuizContentProvider"
import { Button, Divider, Link, ModalBody, ModalFooter } from "@nextui-org/react"
import { PlusIcon } from "@heroicons/react/24/outline"

const WrappedEditQuizContent = () => {
    const { formik, functions } = useContext(EditQuizContentContext)!
    const { addQuestion } = functions
    return (
        <>
            <ModalBody className="p-4">
                <div className="border border-divider rounded-medium">
                    {
                        formik.values.questions.map(({quizId, question, position}) => (
                            <div key={quizId}>
                                <div className="py-3 px-4 text-primary"><span className="font-semibold">Q{position}.</span> {question}</div>
                                <Divider/>
                            </div>
                        ))
                    }
                    <div className="w-full grid place-content-center py-3 px-4">
                        <Link onPress={() => addQuestion()} as="button" className="flex gap-2 items-center ">
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