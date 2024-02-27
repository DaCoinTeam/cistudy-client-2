import React, { useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import {
    MoreHorizontal,
    PictureInPicture2Icon,
} from "lucide-react"
import {
    EditThumbnailRef,
    EditThumbnailRefSelectors,
} from "./EditThumbnailRef"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { className } = props

    const editThumbnailRef = useRef<EditThumbnailRefSelectors | null>(null)

    const onPress = () => {
        if (!editThumbnailRef.current) return
        editThumbnailRef.current.onOpenDirectoryPress()
    }

    return (
        <>
            <Dropdown
                placement="top-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Button className={`${className}`} isIconOnly>
                        <MoreHorizontal size={14} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PictureInPicture2Icon size={14} />}
                        onPress={onPress}
                        key="editThumbnail"
                    >
            Edit Thumbnail
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <EditThumbnailRef ref={editThumbnailRef} />
        </>
    )
}
