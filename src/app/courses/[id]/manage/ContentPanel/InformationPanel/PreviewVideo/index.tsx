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
import { CourseDetailsContext } from "../../../../_hooks"
import NextVideo from "next-video"
import { EditVideoRef, EditVideoRefSelectors } from "./EditVideoRef"
import {
    EditThumbnailRef,
    EditThumbnailRefSelectors,
} from "./EditThumbnailRef"
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid"

export const PreviewVideo = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const editVideoRef = useRef<EditVideoRefSelectors>(null)
    const onClickEditVideo = () => editVideoRef.current?.onClickOpenDirectory()

    const editThumbnailRef = useRef<EditThumbnailRefSelectors>(null)
    const onClickEditThumbnail = () =>
        editThumbnailRef.current?.onClickOpenDirectory()
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
                                onPress={onClickEditVideo}
                                startContent={<VideoCameraIcon className="w-6 h-6" />}
                                color="primary"
                            >
                Edit video
                            </DropdownItem>
                            <DropdownItem
                                key="editThumbnail"
                                onPress={onClickEditThumbnail}
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
                    poster={getAssetUrl(course?.thumbnailId)}
                    className="rounded-[14px] overflow-hidden"
                    src={getAssetUrl(course?.previewVideoId)}
                />
            </div>
            <EditVideoRef ref={editVideoRef} />
            <EditThumbnailRef ref={editThumbnailRef} />
        </>
    )
}
