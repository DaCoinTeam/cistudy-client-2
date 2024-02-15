import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"
import React, { useCallback, useContext } from "react"
import Dropzone from "react-dropzone"
import { CourseDetailsContext } from "../../../../../../_hooks"
import { createResources } from "@services"
import { ResourcesModalPropsContext } from ".."
import { isErrorResponse } from "@common"

export const ResourceDropzone = () => {
    const { functions } = useContext(CourseDetailsContext)!
    const { fetchAndSetCourse } = functions

    const { lectureId } = useContext(ResourcesModalPropsContext)!

    const onDrop = useCallback(async (files: Array<File>) => {
        const response = await createResources({
            data: {
                lectureId,
            },
            files,
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }, [])
    return (
        <Dropzone onDrop={onDrop}>
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
    )
}
