import { Card, CardBody, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { createSectionContent } from "@services"
import { FileQuestionIcon, PackageIcon, VideoIcon } from "lucide-react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { SectionContentType } from "@common"
import { RootContext } from "../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../_components"
import { ManagementContext } from "../../../../../../../_hooks"

export interface SelectSectionTypeModalProps {
    sectionId: string
}

export interface SelectSectionTypeModalRef {
    onOpen: () => void
}

export const SelectSectionTypeModal = forwardRef<
    SelectSectionTypeModalRef,
    SelectSectionTypeModalProps
>((props, ref) => {
    const {sectionId} = props
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const {swrs} = useContext(ManagementContext)!
    const {notify} = useContext(RootContext)!
    const {courseManagementSwr} = swrs
    const {mutate} = courseManagementSwr

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const createSection = async ({type} : {type: SectionContentType}) => {
        const {message} = await createSectionContent({
            data: {
                sectionId,
                type
            },
        })
        await mutate()
        onClose()
        notify!({
            data: {
                message
            },
            type: ToastType.Success
        })
    }

    const sectionType = [
        {
            key: "lesson",
            title: "Lesson",
        },
        {
            key: "quiz",
            title: "Quiz",
        },
        {
            key: "resource",
            title: "Resource",
        },
    ]

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
            <ModalContent>
                <>
                    <ModalHeader className="p-4 pb-2 text-xl">Select Section Type</ModalHeader>
                    <ModalBody className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {sectionType.map((type) => (
                                <Card
                                    key={type.key}
                                    className="p-4 cursor-pointer"
                                >
                                    <CardBody className="grid place-content-center place-items-center" onClick={() => createSection({type: type.key as SectionContentType })}>
                                        {type.key === "lesson" && <VideoIcon size={48} />}
                                        {type.key === "quiz" && <FileQuestionIcon size={48} />}
                                        {type.key === "resource" && <PackageIcon size={48} />}
                                        <div className="text-center text-sm">{type.title}</div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
})