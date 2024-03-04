"use client"
import React, { useContext } from "react"
import Dropzone from "react-dropzone"
import { Media, getMediaType } from "@common"
import { MediaUploaderContext } from "../.."
import { FilePlus2Icon } from "lucide-react"
import { Spacer } from "@nextui-org/react"

export const UploadCard = () => {
    const { functions } = useContext(MediaUploaderContext)!
    const { addMedias } = functions

    const onDrop = (files: Array<File>) => {
        const medias: Array<Media> = []
        for (const file of files) {
            const mediaType = getMediaType(file.name)
            if (mediaType === null) return 

            medias.push({
                mediaType,
                file
            })
        }
        addMedias(medias)
    }

    return (
        <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />   
                        <div className="cursor-pointer border-dashed rounded-large border-2 grid place-content-center aspect-video w-full">
                            <div className="grid place-items-center">
                                <FilePlus2Icon strokeWidth={3/2} size={40} className="text-foreground-500" />
                                <Spacer y={1}/>
                                <div className="text-xs text-foreground-500">
                      Upload image/video(s)
                                </div>
                            </div>
                        </div>                    
                    </div>
                </section>
            )} 
        </Dropzone>
    )
}