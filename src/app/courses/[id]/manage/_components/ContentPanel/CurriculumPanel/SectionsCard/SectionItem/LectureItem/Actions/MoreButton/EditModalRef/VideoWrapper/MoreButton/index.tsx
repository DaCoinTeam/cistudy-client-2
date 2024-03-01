import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { MoreHorizontalIcon, PictureInPicture2 } from "lucide-react"
import React, { useRef } from "react"
import { EditThumbnailRef, EditThumbnailRefSelectors } from "./EditThumbnailRef"

export const MoreButton = () => {
    const editThumbnailRef = useRef<EditThumbnailRefSelectors | null>(null)

    const onEditThumbnailPress = () =>
        editThumbnailRef.current?.onOpenDirectoryPress()

    return (
        <>
            <Dropdown backdrop="blur" placement="left-end">
                <DropdownTrigger>
                    <Button isIconOnly onPress={onEditThumbnailPress} className="bg-content2">
                        <MoreHorizontalIcon size={20} strokeWidth={4/3} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                        startContent={<PictureInPicture2 size={20} strokeWidth={4/3} />}
                        onPress={onEditThumbnailPress}
                        key="thumbnail"
                    >
                Edit thumbnail
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <EditThumbnailRef ref={editThumbnailRef} />
        </>

    )
}