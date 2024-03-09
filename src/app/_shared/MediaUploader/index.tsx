"use client"
import { AppendKey, Media, getMediaType } from "@common"
import React, { createContext, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Badge, Image } from "@nextui-org/react"

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

    const renderLessEqual3 = () => (
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
                        className="w-full"
                    />
                </Badge>
            ))}
        </>
    )

    const renderGreater3 = () => (
        <>
            {medias.map(({ key, file }) => (
                <Badge
                    key={key}
                    content={<XMarkIcon />}
                    className="cursor-pointer"
                    isOneChar
                    onClick={() => deleteMedia(key)}
                    color="danger"
                >
                    <Image
                        className="w-full aspect-video"
                        alt="media"
                        src={URL.createObjectURL(file)}
                    />
                </Badge>
            ))}
        </>
    )

    return (
        <div className="grid grid-cols-4 gap-3">
            {medias.length > 3 ? renderGreater3() : renderLessEqual3()}
        </div>
    )
}

export interface MediaUploaderRefSelectors {
    onDirectoryOpen: () => void
} 

export const MediaUploaderRef = forwardRef<MediaUploaderRefSelectors, MediaUploaderProps>((props, ref) => {
    const { medias: propsMedias, setMedias } = props

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const onDirectoryOpen = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return 
        const medias: Array<Media> = []
        for (const file of  Array.from(files)) {
            const mediaType = getMediaType(file.name)
            if (mediaType === null) return 

            medias.push({
                mediaType,
                file
            })
        }
        addMedias(...medias)
    }

    useImperativeHandle(ref, () => ({
        onDirectoryOpen
    }))

    const addMedias = (...medias: Array<Media>) => {
        const mediaWithKeys: Array<AppendKey<Media>> = medias.map((media) => ({
            key: uuidv4(),
            ...media,
        }))
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
                <div className={props.className}>
                    <WrappedMediaUploader />
                </div>
            </MediaUploaderContext.Provider>
            <input
                multiple
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
})