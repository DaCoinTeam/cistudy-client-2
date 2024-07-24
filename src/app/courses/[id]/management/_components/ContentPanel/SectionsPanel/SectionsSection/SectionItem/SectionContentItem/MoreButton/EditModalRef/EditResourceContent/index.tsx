import React, { useContext } from "react"
import { EditQuizContentProvider, EditResourceContentContext } from "./EditResourceContentProvider"
import { Button, Card, CardBody, Link, ModalBody, ModalFooter } from "@nextui-org/react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { AddResourcesDropzone } from "./AddResourcesDropzone"

const WrappedEditResourceContent = () => {
    const { formik } = useContext(EditResourceContentContext)!

    return (
        <>
            <ModalBody className="p-4">
                {
                    formik.values.attachments.map(({ resourceAttachmentId, fileId, name}) => {
                        return (
                            <Card key={resourceAttachmentId} isPressable>
                                <CardBody className="px-4 py-3 flex items-center justify-center">
                                    <div className="text-sm">{name}</div>
                                    <Link><XMarkIcon className="w-5 h-5"/></Link>
                                </CardBody>
                            </Card>
                        )
                    }   
                    )
                }
                <AddResourcesDropzone/>
            </ModalBody>
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