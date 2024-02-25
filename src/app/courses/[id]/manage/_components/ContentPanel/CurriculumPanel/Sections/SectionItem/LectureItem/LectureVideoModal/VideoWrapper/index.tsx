import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    Spacer,
} from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { EditVideoRef, EditVideoRefSelectors } from "./EditVideoRef"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { VideoPlayer } from "../../../../../../../../../../../_shared"
import { LectureItemContext } from "../.."
import {
    EditThumbnailRef,
    EditThumbnailRefSelectors,
} from "./EditThumbnailRef"
import { VideoType } from "@common"
import { SignalIcon } from "@heroicons/react/24/outline"
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid"

export const VideoWrapper = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureVideoId, videoType } = lecture

    const videoSource =
    videoType === VideoType.DASH
        ? getAssetManifestUrl(lectureVideoId)
        : getAssetUrl(lectureVideoId)

    const editThumbnailRef = useRef<EditThumbnailRefSelectors | null>(null)
    const editVideoRef = useRef<EditVideoRefSelectors | null>(null)

    const onEditThumbnailPress = () =>
        editThumbnailRef.current?.onOpenDirectoryPress()
    const onEditVideoPress = () => editVideoRef.current?.onOpenDirectoryPress()

    const renderStreaming = () => {
        if (!videoSource) return <div />
        const type = videoType === VideoType.MP4 ? "MP4" : "MPEG-DASH"

        return (
            <div className="gap-1 items-center flex text-sm">
                <SignalIcon className="w-4 h-4" />
                <div>{type}</div>
            </div>
        )
    }

    return (
        <>
            <div>
                <VideoPlayer src={videoSource} videoType={videoType} />
                <Spacer y={1} />
                <div className="mx-3 flex justify-between items-center">
                    {renderStreaming()}
                    <Dropdown placement="left-end">
                        <DropdownTrigger>
                            <Link as="button" size="sm">
                Edit
                            </Link>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                                startContent={<VideoCameraIcon className="w-6 h-6" />}
                                onPress={onEditVideoPress}
                                key="video"
                            >
                Edit video
                            </DropdownItem>
                            <DropdownItem
                                startContent={<PhotoIcon className="w-6 h-6" />}
                                onPress={onEditThumbnailPress}
                                key="thumbnail"
                            >
                Edit thumbnail
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <EditThumbnailRef ref={editThumbnailRef} />
            <EditVideoRef ref={editVideoRef} />
        </>
    )
}
