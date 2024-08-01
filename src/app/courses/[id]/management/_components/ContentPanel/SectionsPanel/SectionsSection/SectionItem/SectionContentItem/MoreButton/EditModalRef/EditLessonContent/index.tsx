import React, { useContext, useState } from "react"
import {
    Button,
    Input,
    ModalBody,
    Spacer,
    Tab,
    Tabs,
    Textarea,
} from "@nextui-org/react"
import {
    EditLessonContentContext,
    EditLessonContentProvider,
} from "./EditLessionContentProvider"

import { EditModalRefContext } from "../EditModalRefProvider"
import { AddVideoDropzone } from "./AddVideoDropzone"
import { VideoPlayer } from "../../../../../../../../../../../../_shared"
import { getAssetManifestUrl, getAssetUrl } from "@services"
import { SectionContentItemContext } from "../../.."
import { VideoType } from "@common"

export type Page = "details" | "upload" | "preview";

const WrappedEditLessonContent = () => {
    const { formik } = useContext(EditLessonContentContext)!
    const { discloresure } = useContext(EditModalRefContext)!

    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { lesson } = { ...sectionContent }
    const { videoType, lessonVideoId } = { ...lesson }

    const [currentPage, setCurrentPage] = useState<Page>("details")

    const renderVideoType = () => {
        const map: Record<VideoType, string> = {
            dash: "MPEG-DASH",
            mp4: "MP4",
        }
        if (formik.values.lessonVideo) return map[VideoType.MP4]
        return map[videoType]
    }

    const renderPreview = () => {
        if (formik.values.lessonVideo)
            return (
                <VideoPlayer src={URL.createObjectURL(formik.values.lessonVideo)} />
            )
        return (
            <VideoPlayer
                src={
                    videoType === VideoType.MP4
                        ? getAssetUrl(lessonVideoId)
                        : getAssetManifestUrl(lessonVideoId)
                }
                videoType={videoType}
            />
        )
    }

    return (
        <ModalBody className="p-4">
            <Tabs
                selectedKey={currentPage}
                onSelectionChange={(key) => setCurrentPage(key as Page)}
                aria-label="Options"
                variant="underlined"
                color="primary"
                classNames={{
                    panel: "p-0 pt-2",
                    tabList: "p-0",
                    cursor: "w-full",
                }}
            >
                <Tab key="details" title="Details">
                    <div>
                        <Input
                            label="Title"
                            id="title"
                            isRequired
                            classNames={{
                                inputWrapper: "input-input-wrapper",
                            }}
                            labelPlacement="outside"
                            placeholder="Input title here"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.title && formik.errors.title)}
                            errorMessage={formik.touched.title && formik.errors.title}
                        />
                        <Spacer y={4} />
                        <Textarea
                            classNames={{
                                inputWrapper: "input-input-wrapper",
                            }}
                            label="Description"
                            id="description"
                            type="description"
                            isRequired
                            labelPlacement="outside"
                            placeholder="Input description here"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                !!(formik.touched.description && formik.errors.description)
                            }
                            errorMessage={
                                formik.touched.description && formik.errors.description
                            }
                        />
                        <Spacer y={6} />
                        <div className="flex gap-2 flex-row-reverse w-full">
                            <Button
                                color="primary"
                                isDisabled={formik.isSubmitting}
                                isLoading={formik.isSubmitting}
                                onPress={() => formik.submitForm()}
                            >
                Save
                            </Button>
                            <Button
                                onPress={() => discloresure.onClose()}
                                color="primary"
                                variant="bordered"
                            >
                Cancel
                            </Button>
                        </div>
                    </div>
                </Tab>
                <Tab key="upload" title="Upload">
                    <div>
                        <AddVideoDropzone />
                    </div>
                </Tab>
                
                <Tab key="prevỉew" title="Preview">
                    {formik.values.lessonVideo || sectionContent.lesson.lessonVideoId ? (
                        <>
                            <div>
                                {renderPreview()}
                                <Spacer y={2} />
                                <div className="flex gap-1 items-center">
                                    <div className="text-sm"> Quality: {renderVideoType()}</div>
                                </div>
                            </div>
                            <Spacer y={6} />
                            <div className="flex gap-2 flex-row-reverse w-full">
                                <Button
                                    color="primary"
                                    isDisabled={formik.isSubmitting}
                                    isLoading={formik.isSubmitting}
                                    onPress={() => formik.submitForm()}
                                >
                Upload
                                </Button>
                                <Button color="primary" variant="bordered">
                Cancel
                                </Button>
                            </div>
                        </>
                    ) : <div/>}
                </Tab>
            </Tabs>
        </ModalBody>
    )
}

export const EditLessonContent = () => {
    return (
        <EditLessonContentProvider>
            <WrappedEditLessonContent />
        </EditLessonContentProvider>
    )
}
