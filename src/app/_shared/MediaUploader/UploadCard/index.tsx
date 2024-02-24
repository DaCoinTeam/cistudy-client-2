import { DocumentArrowUpIcon } from "@heroicons/react/16/solid"
import React, { useContext } from "react"
import Dropzone from "react-dropzone"
import { Media, getMediaType } from "@common"
import { MediaUploaderContext } from "../../index"

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
                        <div className="cursor-pointer border-dashed rounded-large border-4 grid place-content-center aspect-video w-full">
                            <div className="grid place-items-center">
                                <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                <div className="text-sm text-foreground-500">
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