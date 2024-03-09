import { FilePlus2 } from "lucide-react"
import React, { useContext } from "react"
import Dropzone from "react-dropzone"
import { MediaUploaderContext } from ".."
import { Media, getMediaType } from "@common"

export const UploadDropzone = () => {
    const { functions, props } = useContext(MediaUploaderContext)!
    const { addMedias } = functions
    
    console.log(props)

    const onDrop = (files: Array<File>) => {
        const medias : Array<Media> = []
        for (const file of files) {
            const mediaType = getMediaType(file.name)
            if (mediaType === null) return
            medias.push({
                mediaType,
                file
            })
        }
        addMedias(...medias)
    }
    return (
        <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="rounded-medium grid cursor-pointer place-content-center aspect-video bg-content2">
                            <FilePlus2 size={24} className="text-foreground-500" strokeWidth={3/2}/>
                        </div>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}