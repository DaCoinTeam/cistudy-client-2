import React, { useContext } from "react"
import { Badge, Image, Spacer } from "@nextui-org/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { v4 as uuidv4 } from "uuid"
import { FormikContext } from "../FormikProviders"
import { FileDropzone } from "../../../FileDropzone"

export const ImagesTab = () => {
    const formik = useContext(FormikContext)!

    const onImagesDrop = (files: Array<File>) => {
        formik.setFieldValue("images", files)
    }

    return (
        <div>
            <FileDropzone onDrop={onImagesDrop} />
            {formik.values.images.length ? <Spacer y={4} /> : null}

            <div className="grid grid-cols-4 gap-2 items-center">
                {formik.values.images.map((image, index) => (
                    <Badge
                        isOneChar
                        key={uuidv4()}
                        as="button"
                        content={<XMarkIcon className="w-3 h-3" />}
                        shape="circle"
                        color="danger"
                        onClick={() => {
                            formik.values.images.splice(index, 1)
                            formik.setFieldValue("images", formik.values.images)
                        }}
                    >
                        <Image
                            className="span-col-1 aspect-video"
                            alt="image"
                            src={URL.createObjectURL(image)}
                        />
                    </Badge>
                ))}
            </div>
        </div>
    )
}
