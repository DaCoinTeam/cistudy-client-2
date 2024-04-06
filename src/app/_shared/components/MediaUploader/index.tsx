"use client"
import { AppendKey, Media } from "@common"
import React, { createContext, memo, useContext, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Badge, Image } from "@nextui-org/react"
import { UploadDropzone } from "./UploadDropzone"

interface MediaUploaderProps {
  className?: string;
  medias: Array<AppendKey<Media>>;
  setMedias: (medias: Array<AppendKey<Media>>) => void;
}

interface MediaUploaderContextValue {
  props: MediaUploaderProps;
  functions: {
    addMedias: (...medias: Array<Media>) => void;
    deleteMedia: (key: string) => void;
  };
}

export const MediaUploaderContext =
  createContext<MediaUploaderContextValue | null>(null)

const WrappedMediaUploader = () => {
    const { props, functions } = useContext(MediaUploaderContext)!
    const { medias } = props
    const { deleteMedia } = functions

    const renderImages = () => (
        <>
            {medias.map(({ key, file }) => (
                <Badge
                    key={key}
                    content={<XMarkIcon />}
                    className="cursor-pointer"
                    classNames={{
                        base: "grid place-items-stretch",
                    }}
                    isOneChar
                    onClick={() => deleteMedia(key)}
                    color="danger"
                >
                    <Image
                        classNames={{
                            wrapper:
                "w-full !max-w-full aspect-video grid content-center overflow-hidden",
                        }}
                        alt="preview"
                        src={URL.createObjectURL(file)}
                        className="w-full rounded-medium"
                    />
                </Badge>
            ))}
        </>
    )

    return (
        <div className="grid grid-cols-4 gap-2">
            {renderImages()}
            {medias.length !== 4 ? <UploadDropzone/> : null}
        </div>
    )
}

export const MediaUploader = memo((props : MediaUploaderProps) => {
    const { medias: propsMedias, setMedias, className } = props

    const addMedias = (...medias: Array<Media>) => {
        let mediaWithKeys: Array<AppendKey<Media>> = medias.map((media) => ({
            key: uuidv4(),
            ...media,
        }))
        if (mediaWithKeys.length + medias.length > 4) {
            mediaWithKeys = mediaWithKeys.filter((_, index) => (index + propsMedias.length) < 4)
        }

        setMedias([...propsMedias, ...mediaWithKeys])
    }

    const deleteMedia = (key: string) => {
        const deleted = propsMedias.filter((media) => {
            return key !== media.key
        })
        setMedias(deleted)
    }

    const mediaUploaderContextValue: MediaUploaderContextValue = useMemo(
        () => ({
            props,
            functions: {
                addMedias,
                deleteMedia,
            },
        }),
        [props]
    )

    return (
        <>
            <MediaUploaderContext.Provider value={mediaUploaderContextValue}>
                <div className={`${className}`}>
                    <WrappedMediaUploader />
                </div>
            </MediaUploaderContext.Provider>
        </>
    )
})