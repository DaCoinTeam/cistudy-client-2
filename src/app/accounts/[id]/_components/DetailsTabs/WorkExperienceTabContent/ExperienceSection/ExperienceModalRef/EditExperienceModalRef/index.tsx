import React, { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { EditExperienceModalRefContext, EditExperienceModalRefProvider } from "./EditExperienceModalRefProvider"
import { Button, Checkbox, DatePicker, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spacer, useDisclosure } from "@nextui-org/react"
import { AccountJobEntity, convertUrlToFile, parseISODateString } from "@common"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { FolderClosedIcon, FolderOpenIcon} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { getAssetUrl } from "@services"

export interface EditExperienceModalRefProps {
    experience: AccountJobEntity
}

export interface EditExperienceModalRefSelectors {
    onOpen: () => void;
}

const WrappedEditExperienceModalRef = forwardRef<
    EditExperienceModalRefSelectors | null,
    EditExperienceModalRefProps
>((props, ref) => {
    const {formik, reducer} = useContext(EditExperienceModalRefContext)!
    const [state, dispatch] = reducer
    const {experience} = props
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

    const handleEditExperience = () => {
        formik.handleSubmit()
    }

    useEffect(() => {
        if (experience) {
            formik.setValues({
                accountJobId: experience.accountJobId,
                companyName: experience.companyName,
                role: experience.role,
                companyImage: [],
                startDate: parseISODateString(experience.startDate),
                endDate: parseISODateString(experience.endDate),
            })
            const handleConvertUrlToFile = async (url: string) => {
                const file = await convertUrlToFile(url)
                formik.setFieldValue("companyImage", [file])
            }
            handleConvertUrlToFile(getAssetUrl(experience.companyThumbnailId) as string)
            dispatch({type: "SET_IS_CURRENT_WORKING", payload: experience.endDate? false : true})
        }
    }, [isOpen])

    useEffect(() => {
        if (formik.isSubmitting === false && formik.submitCount > 0 && !formik.errors.companyName && !formik.errors.role && !formik.errors.startDate) {
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
                <ModalHeader>Edit Experience</ModalHeader>
                <ModalBody>
                    <ScrollShadow className="h-80" hideScrollBar>
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
                                    <Image alt="thumbnail" src={URL.createObjectURL(formik.values.companyImage.at(0) as unknown as Blob)} className="h-40" />
                                </>
                            ) : <></>
                        }
                        <Checkbox isSelected={state.isCurrentWorking} onValueChange={(isSelected) => dispatch({type: "SET_IS_CURRENT_WORKING", payload: isSelected})}>I am currently working in this role</Checkbox>
                        <DatePicker
                            label="Start Date" value={parseDate(formik.values.startDate)} className="w-full"
                            maxValue={
                                state.isCurrentWorking? today(getLocalTimeZone()) : parseDate(formik.values.endDate)
                            }
                            labelPlacement="outside" onChange={(value) => {
                                formik.setFieldValue("startDate", parseISODateString(value.toDate(getLocalTimeZone())))
                            }}
                        />
                        <DatePicker
                            label="End Date" value={
                                state.isCurrentWorking? today(getLocalTimeZone()) : parseDate(formik.values.endDate)
                            } className="w-full"
                            isDisabled={state.isCurrentWorking}
                            maxValue={today(getLocalTimeZone())}
                            labelPlacement="outside" onChange={(value) => {
                                formik.setFieldValue("endDate", parseISODateString(value.toDate(getLocalTimeZone())))
                            }}
                        />
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
                        onPress={handleEditExperience}
                    >
                        {
                            formik.isSubmitting? "Saving..." : "Save"
                        }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export const EditExperienceModalRef = forwardRef<
    EditExperienceModalRefSelectors | null,
    EditExperienceModalRefProps
>((props, ref) => {

    return (
        <EditExperienceModalRefProvider>
            <WrappedEditExperienceModalRef ref={ref} experience={props.experience} />
        </EditExperienceModalRefProvider>
    )
})