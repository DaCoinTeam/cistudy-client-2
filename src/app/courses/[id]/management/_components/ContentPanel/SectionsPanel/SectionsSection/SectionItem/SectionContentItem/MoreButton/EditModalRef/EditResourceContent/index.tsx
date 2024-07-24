import React from "react"
import { EditQuizContentProvider } from "./EditQuizContentProvider"
import { Button, ModalBody, ModalFooter } from "@nextui-org/react"

const WrappedEditResourceContent = () => {
    return (
        <>
            <ModalBody className="p-4">12</ModalBody>
            <ModalFooter><Button/></ModalFooter>
        </>
    )
}

export const EditResourceContent = () => {
    return (
        <EditQuizContentProvider>
            <WrappedEditResourceContent/>
        </EditQuizContentProvider>
    )
}