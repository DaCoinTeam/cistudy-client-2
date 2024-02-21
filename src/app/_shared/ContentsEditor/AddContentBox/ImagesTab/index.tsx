import React, { useContext } from "react"
import { Badge, Image, Spacer } from "@nextui-org/react"
import { DocumentArrowUpIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { v4 as uuidv4 } from "uuid"
import { FormikContext } from "../FormikProviders"
import Dropzone from "react-dropzone"

export const ImagesTab = () => {
    const formik = useContext(FormikContext)!

    const onImagesDrop = (files: Array<File>) => {
        const images = [
            ...formik.values.images,
            ...files.map((file) => ({
                key: uuidv4(),
                data: file,
            })),
        ]
        formik.setFieldValue("images", images)
    }

    return (
        <div>
            <Dropzone onDrop={onImagesDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />   
                            <div className="cursor-pointer border-dashed rounded-large border-4 h-48 grid place-content-center">
                                <div className="grid place-content-center">
                                    <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                    <div className="text-sm text-foreground-500">
                      Upload file(s)
                                    </div>
                                </div>
                            </div>                    
                        </div>
                    </section>
                )} 
            </Dropzone>
            {formik.values.images.length ? <Spacer y={4} /> : null}

            <div className="grid grid-cols-4 gap-2 items-center">
                {formik.values.images.map((image) => (
                    <Badge
                        isOneChar
                        key={image.key}
                        as="button"
                        content={<XMarkIcon className="w-3 h-3" />}
                        shape="circle"
                        color="danger"
                        onClick={() => {
                            formik.setFieldValue(
                                "images",
                                formik.values.images.filter(({ key }) => image.key !== key)
                            )
                        }}
                    >
                        <Image
                            className="span-col-1 aspect-video"
                            alt="image"
                            src={URL.createObjectURL(image.data)}
                        />
                    </Badge>
                ))}
            </div>
        </div>
    )
}
