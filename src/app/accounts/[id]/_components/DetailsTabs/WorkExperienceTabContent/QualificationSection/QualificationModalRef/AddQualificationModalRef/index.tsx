import React, { forwardRef, useContext, useImperativeHandle, useState } from "react"
import { Badge, Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spacer, useDisclosure } from "@nextui-org/react"
import { useDropzone } from "react-dropzone"
import { FolderClosedIcon, FolderOpenIcon, X } from "lucide-react"
import useSWRMutation from "swr/mutation"
import { addQualification, AddQualificationInput } from "@services"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"
import { AccountDetailsContext } from "../../../../../../_hooks"
import { ErrorResponse } from "@common"

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
    const {notify} = useContext(RootContext)!
    const {swrs} = useContext(AccountDetailsContext)!
    const {accountSwr} = swrs
    const {mutate} = accountSwr
    const { onOpenChange, onOpen, isOpen } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (files: Array<File>) => {
            setImages(files)
        },
        multiple: true,
    })

    const handleCancel = () => {
        onOpenChange()
        setImages(undefined)
    }

    const addQualificationSwrMutation = useSWRMutation(
        "ADD_QUALIFICATION",
        async(_: string, { arg }: { arg: AddQualificationInput }) => {
            return await addQualification(arg)
        }
    )

    const {trigger, isMutating} = addQualificationSwrMutation

    const handleAddQualification = async() => {
        try {
            const {message} = await trigger({files: images})
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
            mutate()
            setImages(undefined)
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

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
        >
            <ModalContent>
                <ModalHeader>Add Qualification</ModalHeader>
                <ModalBody>
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
                        images && images?.length > 0? <ScrollShadow className="h-80" hideScrollBar={images.length < 2}>
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
                        </ScrollShadow> : <></>
                    }
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
                        onPress={handleAddQualification}
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