import { AppendKey, Media } from "@common"
import React, { createContext, memo, useContext, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { UploadCard } from "./UploadCard"
import { Badge, Image } from "@nextui-org/react"

interface MediaUploaderProps {
  className?: string;
  medias: Array<AppendKey<Media>>;
  setMedias: (medias: Array<AppendKey<Media>>) => void;
}

interface MediaUploaderContextValue {
  props: MediaUploaderProps;
  functions: {
    addMedias: (medias: Array<Media>) => void;
    deleteMedia: (key: string) => void;
  };
}

export const MediaUploaderContext =
  createContext<MediaUploaderContextValue | null>(null)

const WrappedMediaUploader = () => {
    const { props, functions } = useContext(MediaUploaderContext)!
    const { medias } = props
    const { deleteMedia } = functions

    const renderLessEqual3 = () => {
        return (
            <div className="grid grid-cols-4 gap-4">
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
                <UploadCard />
            </div>
        )
    }

    const renderGreater3 = () => {
        <>
            {
                <div className="grid grid-cols-4 gap-4">
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
                    <UploadCard />
                </div>
            }
        </>
    }

    return <>{medias.length > 3 ? renderGreater3() : renderLessEqual3()}</>
}

export const MediaUploader = memo((props: MediaUploaderProps) => {
    const { medias: propsMedias, setMedias } = props

    const addMedias = (medias: Array<Media>) => {
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
        <MediaUploaderContext.Provider value={mediaUploaderContextValue}>
            <div className={props.className}>
                <WrappedMediaUploader />
            </div>
        </MediaUploaderContext.Provider>
    )
})
