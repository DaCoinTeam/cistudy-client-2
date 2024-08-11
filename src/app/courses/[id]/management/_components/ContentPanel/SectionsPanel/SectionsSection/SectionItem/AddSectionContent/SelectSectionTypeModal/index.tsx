import { Card, CardBody, Modal, ModalBody, ModalContent, ModalHeader, Spacer, useDisclosure } from "@nextui-org/react"
import { createSectionContent } from "@services"
import { FileQuestionIcon, PackageIcon, VideoIcon } from "lucide-react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { SectionContentType, SectionEntity } from "@common"
import { RootContext } from "../../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../_components"
import { ManagementContext } from "../../../../../../../_hooks"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

export interface SelectSectionTypeModalProps {
    section: SectionEntity
}

export interface SelectSectionTypeModalRef {
    onOpen: () => void
}

export const SelectSectionTypeModal = forwardRef<
    SelectSectionTypeModalRef,
    SelectSectionTypeModalProps
>((props, ref) => {
    const { section: { sectionId, contents } } = props
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <>
                    <ModalHeader className="p-4 pb-2 text-xl">Select Section Type</ModalHeader>
                    <ModalBody className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {sectionType.map((type) => (
                                <Card
                                    isDisabled={(() => {
                                        if (type.key === "lesson") return false
                                        if (!contents.some(({type}) => type === SectionContentType.Lesson)) return true
                                    })()}
                                    isPressable={!(() => {
                                        if (type.key === "lesson") return false
                                        if (!contents.some(({type}) => type === SectionContentType.Lesson)) return true
                                    })()}
                                    shadow="none"
                                    key={type.key}
                                    className="p-4 cursor-pointer border border-divider"
                                    onPress={async () => await createSection({type: type.key as SectionContentType})}
                                >
                                    <CardBody className="grid place-content-center place-items-center">
                                        {type.key === "lesson" && <VideoIcon className="text-foreground-400" size={48} />}
                                        {type.key === "quiz" && <FileQuestionIcon className="text-foreground-400"size={48} />}
                                        {type.key === "resource" && <PackageIcon className="text-foreground-400" size={48} />}
                                        <Spacer y={2}/>
                                        <div className="text-center text-sm">{type.title}</div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                        <div className="flex gap-1 items-center">
                            <ExclamationCircleIcon className="w-5 h-5 text-warning"/>
                            <div className="text-sm text-warning">The first content of a section must be a lesson.</div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
})