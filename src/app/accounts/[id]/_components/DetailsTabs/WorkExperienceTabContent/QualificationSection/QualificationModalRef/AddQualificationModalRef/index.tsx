import React, { forwardRef, useContext, useImperativeHandle, useState } from "react"
import { Badge, Button, DatePicker, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from "@nextui-org/react"
import { useDropzone } from "react-dropzone"
import { FolderClosedIcon, FolderOpenIcon, X } from "lucide-react"
import useSWRMutation from "swr/mutation"
import { addQualification, AddQualificationInput } from "@services"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"
import { AccountDetailsContext } from "../../../../../../_hooks"
import { ErrorResponse, parseISODateString } from "@common"
import { useFormik } from "formik"
import { getLocalTimeZone, parseDate } from "@internationalized/date"

export interface AddQualificationModalRefProps {

}

export interface AddQualificationModalRefSelectors {
  onOpen: () => void;
}

export const AddQualificationModalRef = forwardRef<
  AddQualificationModalRefSelectors | null,
  AddQualificationModalRefProps
>((_, ref) => {
    const [images, setImages] = useState<Array<File> | undefined>()
    const {notify, swrs: rootSwrs} = useContext(RootContext)!
    const {profileSwr} = rootSwrs
    const {swrs} = useContext(AccountDetailsContext)!
    const {accountSwr} = swrs
    const {mutate} = accountSwr
    const { onOpenChange, onOpen, isOpen } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (files: Array<File>) => {
            if (files.length > 3) files = files.slice(0, 3)
            setImages(files)
        },
        accept: {
            "image/*": [".jpg", ".jpeg", ".png", ".gif"]
        }
    })

    const handleCancel = () => {
        onOpenChange()
        formik.resetForm()
        setImages(undefined)
    }

    const addQualificationSwrMutation = useSWRMutation(
        "ADD_QUALIFICATION",
        async(_: string, { arg }: { arg: AddQualificationInput }) => {
            return await addQualification(arg)
        }
    )

    const {trigger, isMutating} = addQualificationSwrMutation

    const formik = useFormik({
        initialValues: {
            name: "",
            issuedFrom: "",
            issuedAt: parseISODateString(),
            url: ""
        },
        onSubmit: async (values) => {
            try {
                const {message} = await trigger({
                    data: {
                        name: values.name,
                        issuedFrom: values.issuedFrom,
                        issuedAt: values.issuedAt,
                        url: values.url
                    },
                    files: images})
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
                mutate()
                profileSwr.mutate()
                setImages(undefined)
                formik.resetForm()
                onOpenChange()
            } catch (ex) {
                const {message} = ex as ErrorResponse
                notify!({
                    data: {
                        error: message as string
                    },
                    type: ToastType.Error
                })
            }
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={handleCancel}
            isDismissable={false}
        >
            <ModalContent>
                <ModalHeader>Add Qualification</ModalHeader>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
                        </div>
                        {
                            images && images?.length > 0? <>
                                {
                                    images.map((image) => (
                                        <>
                                            <Spacer y={4} />
                                            <Badge
                                                className="absolute top-2 right-2 w-5 h-5"
                                                content={<X />}
                                                color="danger"
                                                onClick={() => setImages(images.filter((img) => img !== image))}
                                            >
                                                <Image alt="thumbnail" src={URL.createObjectURL(image)} className="w-full" />
                                            </Badge>
                                        
                                        </>
                                    ))
                                }
                            </> : <></>
                        }
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="bordered"
                        color="primary"
                        onPress={handleCancel}
                    >
                        Cancel
                    </Button>
                    
                    <Button
                        color="primary"
                        onPress={formik.submitForm}
                        isLoading={isMutating}
                        isDisabled={isMutating || !images}
                    >
                        {
                            isMutating? "Adding..." : "Add"
                        }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})