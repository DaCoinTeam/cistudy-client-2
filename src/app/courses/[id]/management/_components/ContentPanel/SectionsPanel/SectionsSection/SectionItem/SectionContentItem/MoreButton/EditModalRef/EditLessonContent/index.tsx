import React from "react"
import { EditQuizContentProvider } from "./EditLessionContentProvider"
import { Button, ModalBody, ModalFooter } from "@nextui-org/react"

const WrappedEditLessonContent = () => {
    return (
        <>
            <ModalBody className="p-4">12</ModalBody>
            <ModalFooter><Button/></ModalFooter>
        </>
    )
}

export const EditLessonContent = () => {
    return (
        <EditQuizContentProvider>
            <WrappedEditLessonContent/>
        </EditQuizContentProvider>
    )
}