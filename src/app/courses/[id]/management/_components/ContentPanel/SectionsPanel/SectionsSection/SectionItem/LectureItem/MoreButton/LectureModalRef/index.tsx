"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Tab,
    Tabs,
} from "@nextui-org/react"
import { forwardRef, useImperativeHandle } from "react"
import { ClapperboardIcon, ImageIcon } from "lucide-react"
import { VideoTab } from "./VideoTab"
import { ThumbnailTab } from "./ThumbailTab"

export interface LessonModalRefSelectors {
  onOpen: () => void;
}

export const LessonModalRef = forwardRef<LessonModalRefSelectors | null>(
    (_, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">
                Lesson
                    </ModalHeader>
                    <ModalBody className="p-4 pt-2 gap-0">
                        <Tabs
                            classNames={{
                                panel: "p-0 pt-4",
                            }}
                            variant="underlined"
                            color="primary"
                        >
                            <Tab
                                key="video"
                                title={
                                    <div className="flex gap-2 items-center">
                                        <ClapperboardIcon size={20} strokeWidth={3/2} />
                                        <div>Video</div>
                                    </div>
                                }
                            >
                                <VideoTab/>
                            </Tab>
                            <Tab
                                key="thumbnail"
                                title={
                                    <div className="flex gap-2 items-center">
                                        <ImageIcon size={20} strokeWidth={3/2} />{" "}
                                        <div>Thumbnail</div>
                                    </div>
                                }
                            >
                                <ThumbnailTab/>
                            </Tab>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }
)
