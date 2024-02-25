import {
    Spacer,
    Link,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { getAssetUrl } from "@services"
import { ManageContext } from "../../../../_hooks"
import NextVideo from "next-video"
import { EditVideoRef, EditVideoRefSelectors } from "./EditVideoRef"
import {
    EditThumbnailRef,
    EditThumbnailRefSelectors,
} from "./EditThumbnailRef"
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid"

export const PreviewVideo = () => {
    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    const editVideoRef = useRef<EditVideoRefSelectors>(null)
    const onEditVideoPress = () => editVideoRef.current?.onOpenDirectoryPress()

    const editThumbnailRef = useRef<EditThumbnailRefSelectors>(null)
    const onEditThumbnailPress = () =>
        editThumbnailRef.current?.onOpenDirectoryPress()
    return (
        <>
            <div>
                <div className="flex justify-between items-center mx-3">
                    <div className="font-semibold"> Preview Video </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Link as="button" className="text-sm"> Edit </Link>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                key="editVideo"
                                onPress={onEditVideoPress}
                                startContent={<VideoCameraIcon className="w-6 h-6" />}
                                color="primary"
                            >
                Edit video
                            </DropdownItem>
                            <DropdownItem
                                key="editThumbnail"
                                onPress={onEditThumbnailPress}
                                startContent={<PhotoIcon className="w-6 h-6" />}
                                color="primary"
                            >
                Edit thumbnail
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <Spacer y={1} />
                <NextVideo
                    poster={getAssetUrl(courseManaged?.thumbnailId)}
                    className="rounded-[14px] overflow-hidden"
                    src={getAssetUrl(courseManaged?.previewVideoId)}
                />
            </div>
            <EditVideoRef ref={editVideoRef} />
            <EditThumbnailRef ref={editThumbnailRef} />
        </>
    )
}
