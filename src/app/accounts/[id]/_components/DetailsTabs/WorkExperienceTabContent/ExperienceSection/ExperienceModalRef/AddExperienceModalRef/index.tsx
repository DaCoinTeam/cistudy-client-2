import React, { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { AddExperienceModalRefContext, AddExperienceModalRefProvider } from "./AddExperienceModalRefProvider"
import { Badge, Button, Checkbox, DatePicker, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from "@nextui-org/react"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { parseISODateString } from "@common"
import { useDropzone } from "react-dropzone"
import { FolderClosedIcon, FolderOpenIcon, X } from "lucide-react"

export interface AddExperienceModalRefProps {

}

export interface AddExperienceModalRefSelectors {
  onOpen: () => void;
}

const WrappedAddExperienceModalRef = forwardRef<
  AddExperienceModalRefSelectors | null,
  AddExperienceModalRefProps
>((_, ref) => {
    const {formik, reducer} = useContext(AddExperienceModalRefContext)!
    const [state, dispatch] = reducer
    const { onOpenChange, onOpen, isOpen } = useDisclosure()

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (files: Array<File>) => {
            formik.setFieldValue("companyImage", files)
        },
        multiple: false,
    })

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const handleCancel = () => {
        formik.resetForm()
        dispatch({type: "SET_IS_CURRENT_WORKING", payload: false})
        onOpenChange()
    }

    const handleAddExperience = () => {
        formik.handleSubmit()
    }

    useEffect(() => {
        if (formik.isSubmitting === false && formik.submitCount > 0 && !formik.errors.companyName && !formik.errors.role && !formik.errors.startDate) {
            formik.resetForm()
        }
    }, [formik.isSubmitting])

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={handleCancel}
            isDismissable={false}
        >
            <ModalContent>
                <ModalHeader>Add Experience</ModalHeader>
                <ModalBody>
                    <Input
                        label="Company Name"
                        id="companyName"
                        isRequired
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        labelPlacement="outside"
                        placeholder="Input company name here"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.companyName && formik.errors.companyName)}
                        errorMessage={formik.touched.companyName && formik.errors.companyName}
                    />
                    <Input
                        label="Role"
                        id="role"
                        isRequired
                        classNames={{
                            inputWrapper: "input-input-wrapper"
                        }} 
                        labelPlacement="outside"
                        placeholder="Input role here"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!(formik.touched.role && formik.errors.role)}
                        errorMessage={formik.touched.role && formik.errors.role}
                    />
                    <div {...getRootProps()}>
                        <div className="text-sm">Company Image</div>
                        <Spacer y={2} />
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
                                    {isDragActive ? "Dragging..." : "Drag company image here"}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        formik.values.companyImage.at(0)? (
                            <>
                                <Spacer y={4} />
                                <Badge className="w-5 h-5 top-2 left-40" content={<X />} color="danger" onClick={() => {formik.setFieldValue("companyImage", [])}}>
                                    <Image alt="thumbnail" src={URL.createObjectURL(formik.values.companyImage.at(0) as unknown as Blob)} className="h-40" />
                                </Badge>
                            </>
                        ) : <></>
                    }
                    <Checkbox isSelected={state.isCurrentWorking} onValueChange={(isSelected) => dispatch({type: "SET_IS_CURRENT_WORKING", payload: isSelected})}>I am currently working in this role</Checkbox>
                    <DatePicker
                        label="Start Date" value={parseDate(formik.values.startDate)} className="w-full"
                        maxValue={today(getLocalTimeZone())}
                        labelPlacement="outside" onChange={(value) => {
                            formik.setFieldValue("startDate", parseISODateString(value.toDate(getLocalTimeZone())))
                        }}
                    />
                    <DatePicker
                        label="End Date" value={parseDate(formik.values.endDate)} className="w-full"
                        isDisabled={state.isCurrentWorking}
                        maxValue={today(getLocalTimeZone())}
                        labelPlacement="outside" onChange={(value) => {
                            formik.setFieldValue("endDate", parseISODateString(value.toDate(getLocalTimeZone())))
                        }}
                    />
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
                        onPress={handleAddExperience}
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                    >
                        {
                            formik.isSubmitting? "Adding..." : "Add"
                        }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export const AddExperiencesModalRef = forwardRef<
  AddExperienceModalRefSelectors | null,
  AddExperienceModalRefProps
>((_, ref) => {

    return (
        <AddExperienceModalRefProvider>
            <WrappedAddExperienceModalRef ref={ref} />
        </AddExperienceModalRefProvider>
    )
})