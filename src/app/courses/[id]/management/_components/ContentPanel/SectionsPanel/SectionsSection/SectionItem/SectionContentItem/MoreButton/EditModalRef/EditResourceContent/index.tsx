import React, { useContext } from "react"
import {
    EditQuizContentProvider,
    EditResourceContentContext,
} from "./EditResourceContentProvider"
import {
    Button,
    Card,
    CardBody,
    Input,
    Link,
    ModalBody,
    Spacer,
    Tab,
    Tabs,
    Textarea,
} from "@nextui-org/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { AddResourcesDropzone } from "./AddResourcesDropzone"
import { deleteResourceAttachment, getAssetUrl } from "@services"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../_components"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { EditModalRefContext } from "../EditModalRefProvider"

const WrappedEditResourceContent = () => {
    const { formik } = useContext(EditResourceContentContext)!
    const { notify } = useContext(RootContext)!
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr
    const { discloresure } = useContext(EditModalRefContext)!

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
                            />
                            <Spacer y={6} />
                            <div className="flex gap-2 flex-row-reverse w-full">
                                <Button
                                    color="primary"
                                    isDisabled={formik.isSubmitting}
                                    isLoading={formik.isSubmitting}
                                    onPress={() => formik.submitForm()}
                                >
                  Save
                                </Button>
                                <Button
                                    onPress={() => discloresure.onClose()}
                                    color="primary"
                                    variant="bordered"
                                >
                  Cancel
                                </Button>
                            </div>
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
                                                    <Link
                                                        color="primary"
                                                        onPress={async () => {
                                                            const { message } =
                                await deleteResourceAttachment({
                                    data: {
                                        resourceAttachmentId:
                                      resourceAttachmentId ?? "",
                                    },
                                })

                                                            await mutate()
                              notify!({
                                  data: {
                                      message,
                                  },
                                  type: ToastType.Success,
                              })
                                                        }}
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    )
                                }
                            )}
                            <AddResourcesDropzone />
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
