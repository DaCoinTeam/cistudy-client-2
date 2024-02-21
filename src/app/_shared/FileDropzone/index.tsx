import { DocumentArrowUpIcon } from "@heroicons/react/16/solid"
import Dropzone from "react-dropzone"

interface FileDropzoneProps {
    onDrop: (files: Array<File>) => void | Promise<void>
    multiple?: boolean,
    className?: string,
    content?: JSX.Element
}

export const FileDropzone = (props: FileDropzoneProps) => {
    return (
        <Dropzone onDrop={props.onDrop} multiple={props.multiple}>
            {({ getRootProps, getInputProps }) => (
                <section className={props.className}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            props.content ?? (
                                <div className="cursor-pointer border-dashed rounded-large border-4 h-48 grid place-content-center">
                                    <div className="grid place-content-center">
                                        <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                        <div className="text-sm text-foreground-500">
                      Upload file(s)
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
            )} 
        </Dropzone>
    )
}
