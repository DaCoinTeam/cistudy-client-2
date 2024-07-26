import React, { useContext } from "react"
import {
    EditQuizContentProvider,
    EditResourceContentContext,
} from "./EditResourceContentProvider"
import {
    Card,
    CardBody,
    Input,
    ModalBody,
    Spacer,
    Tab,
    Tabs,
    Textarea,
} from "@nextui-org/react"
import { getAssetUrl } from "@services"

const WrappedEditResourceContent = () => {
    const { formik } = useContext(EditResourceContentContext)!

    return (
        <>
            <ModalBody className="p-4">
                <Tabs
                    aria-label="Options"
                    variant="underlined"
                    color="primary"
                    classNames={{
                        panel: "p-0 pt-2",
                        tabList: "p-0",
                    }}
                >
                    <Tab key="details" title="Details">
                        <div>
                            <Input
                                label="Title"
                                id="title"
                                isRequired
                                classNames={{
                                    inputWrapper: "input-input-wrapper",
                                }}
                                labelPlacement="outside"
                                placeholder="Input title here"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!(formik.touched.title && formik.errors.title)}
                                errorMessage={formik.touched.title && formik.errors.title}
                                isReadOnly
                            />
                            <Spacer y={4} />
                            <Textarea
                                classNames={{
                                    inputWrapper: "input-input-wrapper",
                                }}
                                label="Description"
                                id="description"
                                type="description"
                                isRequired
                                labelPlacement="outside"
                                placeholder="Input description here"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!(formik.touched.description && formik.errors.description)
                                }
                                errorMessage={
                                    formik.touched.description && formik.errors.description
                                }
                                isReadOnly
                            />
                        </div>
                    </Tab>
                    <Tab key="attachments" title="Attachments">
                        <div className="w-full gap-4 flex-col flex">
                            {formik.values.attachments.map(
                                ({ resourceAttachmentId, fileId, name }) => {
                                    return (
                                        <Card
                                            onPress={() => getAssetUrl(fileId)}
                                            shadow="none"
                                            className="bg-content2"
                                            key={resourceAttachmentId}
                                            isPressable
                                        >
                                            <CardBody className="px-4 py-3">
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="text-sm">{name}</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    )
                                }
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </ModalBody>
        </>
    )
}

export const EditResourceContent = () => {
    return (
        <EditQuizContentProvider>
            <WrappedEditResourceContent />
        </EditQuizContentProvider>
    )
}
