"use client"

import { Modal, ModalContent, ModalHeader } from "@nextui-org/react"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { EditModalRefContext, EditModalRefProvider } from "./EditModalRefProvider"
import { SectionContentType } from "@common"
import { EditLessonContent } from "./EditLessonContent"
import { EditQuizContent } from "./EditQuizContent"
import { EditResourceContent } from "./EditResourceContent"
import { SectionContentItemContext } from "../.."

export interface EditModalRefSelectors {
  onOpen: () => void;
}

const WrappedEditModalRef = forwardRef<EditModalRefSelectors | null>(
    (_, ref) => {
        const { discloresure } = useContext(EditModalRefContext)!
        const { isOpen, onOpen, onOpenChange } = discloresure

        const { props} = useContext(SectionContentItemContext)!
        const { sectionContent } = props

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        const renderBody = () => {
            const map : Record<SectionContentType, JSX.Element> = {
                [SectionContentType.Lesson]: <EditLessonContent/>,
                [SectionContentType.Quiz]: <EditQuizContent/>,
                [SectionContentType.Resource]: <EditResourceContent/>
            }
            return map[sectionContent.type]
        }
        

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Edit</ModalHeader>
                    {
                        renderBody()
                    }
                </ModalContent>
            </Modal>
        )
    }
)

export const EditModalRef = forwardRef<EditModalRefSelectors | null>(  (_, ref) => {
    return (
        <EditModalRefProvider >
            <WrappedEditModalRef ref={ref} />
        </EditModalRefProvider>
    )
}
)
    
   

