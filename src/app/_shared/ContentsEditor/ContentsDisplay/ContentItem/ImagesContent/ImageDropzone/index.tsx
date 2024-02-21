import { PhotoIcon } from "@heroicons/react/24/outline"
import Dropzone from "react-dropzone"

interface ImageDropzone {
    onDrop: (files: Array<File>) => void
}

export const ImageDropzone = (props: ImageDropzone) => {
    return (
        <Dropzone onDrop={props.onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section className="aspect-video">
                    <div {...getRootProps({className: "h-full"})}>
                        <input {...getInputProps()} />
                        {
                            <div className="cursor-pointer border-dashed rounded-large border-4 grid place-content-center h-full">
                                <PhotoIcon className="w-10 h-10 text-foreground-500" />
                            </div>
                        }
                    </div>
                </section>
            )} 
        </Dropzone>
    )
}
