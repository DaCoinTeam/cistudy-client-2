import { AccountQualificationEntity, convertUrlToFile, parseISODateString } from "@common"
import { Button, DatePicker, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spacer, useDisclosure } from "@nextui-org/react"
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { useDropzone } from "react-dropzone"
import { EditQualificationModalRefContext, EditQualificationModalRefProvider } from "./EditQualificationModalRefProvider"
import { FolderClosedIcon, FolderOpenIcon } from "lucide-react"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { getAssetUrl } from "@services"

export interface EditQualificationModalRefProps {
    qualification: AccountQualificationEntity
}

export interface EditQualificationModalRefSelectors {
    onOpen: () => void;
}

const WrappedEditQualificationModalRef = forwardRef<
    EditQualificationModalRefSelectors | null,
    EditQualificationModalRefProps
>((props, ref) => {
    const { formik } = useContext(EditQualificationModalRefContext)!
    const { qualification } = props
    const { onOpenChange, onOpen, isOpen } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (files: Array<File>) => {
            if (files.length > 3) files = files.slice(0, 3)
            formik.setFieldValue("certificationImage", files)
        },
        accept: {
            "image/*": [".jpg", ".jpeg", ".png", ".gif"]
        }
    })

    const handleCancel = () => {
        formik.resetForm()
        onOpenChange()
    }

    const handleEditQualification = () => {
        formik.handleSubmit()
    }

    useEffect(() => {
        if (qualification) {
            formik.setValues({
                accountQualificationId: qualification.accountQualificationId,
                name: qualification.name,
                issuedFrom: qualification.issuedFrom,
                issuedAt: parseISODateString(qualification.issuedAt),
                url: qualification.url,
                certificationImage: []
            })
            const handleConvertUrlToFile = async (url: string) => {
                const file = await convertUrlToFile(url)
                formik.setFieldValue("certificationImage", [file])
            }
            handleConvertUrlToFile(getAssetUrl(qualification.fileId) as string)
        }
    }, [isOpen])

    useEffect(() => {
        if (formik.isSubmitting === false && formik.submitCount > 0 && !formik.errors.name && !formik.errors.issuedFrom && !formik.errors.issuedAt) {
            onOpenChange()
        }
    }, [formik.isSubmitting])

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
        >
            <ModalContent>
                <ModalHeader>Edit Qualification</ModalHeader>
                <ModalBody>
                    <ScrollShadow className="h-80" hideScrollBar>
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }}
                            label="Name"
                            id="name"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input name here"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.name && formik.errors.name)}
                            errorMessage={formik.touched.name && formik.errors.name}
                        />
                        <Spacer y={4} />
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }}
                            label="Issued From"
                            id="issuedFrom"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input issued from here"
                            value={formik.values.issuedFrom}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.issuedFrom && formik.errors.issuedFrom)}
                            errorMessage={formik.touched.issuedFrom && formik.errors.issuedFrom}
                        />
                        <Spacer y={4} />
                        <DatePicker
                            label="Issued At" value={parseDate(formik.values.issuedAt)} className="w-full"
                            maxValue={today(getLocalTimeZone())}
                            labelPlacement="outside" onChange={(value) => {
                                formik.setFieldValue("issuedAt", parseISODateString(value.toDate(getLocalTimeZone())))
                            }}
                        />
                        <Spacer y={4} />
                        <Input
                            classNames={{
                                inputWrapper: "input-input-wrapper"
                            }}
                            label="Url"
                            id="url"
                            labelPlacement="outside"
                            placeholder="Input url here"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.url && formik.errors.url)}
                            errorMessage={formik.touched.url && formik.errors.url}
                        />
                        <Spacer y={4} />
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="border border-dashed text-primary rounded-medium p-6 grid place-items-center">
                                <div className="flex gap-3 items-center">
                                    {isDragActive ? (
                                        <FolderOpenIcon
                                            className="w-5 h-5 text-foreground-400"
                                            strokeWidth={3 / 2}
                                        />
                                    ) : (
                                        <FolderClosedIcon
                                            className="w-5 h-5 text-foreground-400"
                                            strokeWidth={3 / 2}
                                        />
                                    )
                                    }
                                    <div className="text-foreground-400 text-sm">
                                        {isDragActive ? "Dragging..." : "Drag qualification here"}
                                    </div>
                                </div>
                            </div>
                            {
                                formik.values.certificationImage.at(0)? (
                                    <>
                                        <Spacer y={4} />
                                        <Image alt="thumbnail" src={URL.createObjectURL(formik.values.certificationImage.at(0) as unknown as Blob)} className="h-40" />
                                    </>
                                ) : <></>
                            }
                        </div>
                    </ScrollShadow>
                </ModalBody>
                <ModalFooter className="gap-4">
                    <Button
                        variant="bordered"
                        color="primary"
                        onPress={handleCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="primary"
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                        onPress={handleEditQualification}
                    >
                        {
                            formik.isSubmitting ? "Saving..." : "Save"
                        }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export const EditQualificationModalRef = forwardRef<
    EditQualificationModalRefSelectors | null,
    EditQualificationModalRefProps
>((props, ref) => {
    const { qualification } = props

    return (
        <EditQualificationModalRefProvider>
            <WrappedEditQualificationModalRef qualification={qualification} ref={ref} />
        </EditQualificationModalRefProvider>
    )
})