"use client"
import { ReportPostEntity } from "@common"
import {
    Avatar,
    Button,
    Chip,
    ChipProps,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react"

import { getAvatarUrl, resolvePostReport } from "@services"
import dayjs from "dayjs"
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import { ToastType } from "../../../../../../../_components"
import { RootContext } from "../../../../../../../_hooks"
import { MediaGroup, TextRenderer } from "../../../../../../../_shared"
import { PostReportItemContext } from "../PostReportItemProvider"

export interface ResolveModalRefProps {
    report: ReportPostEntity;
}

export interface ResolveModalRefSelectors {
    onOpen: () => void;
}

export const ResolveModalRef = forwardRef<
    ResolveModalRefSelectors | null,
    ResolveModalRefProps
>((props, ref) => {
    const {reducer, swrs} = useContext(PostReportItemContext)!
    const {postReportsSwr} = swrs
    const {mutate} = postReportsSwr
    const [state, dispatch] = reducer
    // const toastRef = useRef<ToastRefSelectors | null>(null)
    const {notify} = useContext(RootContext)!
    const { report } = props
    const {title, description, reportedPost, reporterAccount, createdAt, processNote, processStatus} = {...report}
    const {postMedias, html,} = {...reportedPost}
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [isNotValidNote, setIsNotValidNote] = useState(false)
    useImperativeHandle(ref, () => ({
        onOpen
    }))
    useEffect(() => {
        if(state.note.length > 20){
            setIsNotValidNote(false)
        }
    }, [state.note.length])
    const statusColorMap: Record<string, ChipProps["color"]>  = {
        approved: "success",
        rejected: "danger",
        processing: "warning",
    }
    const handleUpdateReport = async (reportStatus : string) => {
        if(state.note.length < 20) {
            setIsNotValidNote(true)
        } else {
            setIsNotValidNote(false)
        }
        if(!isNotValidNote) {
            if (reportStatus === "approved") {
                await resolvePostReport({
                    data: {
                        reportPostId: report.reportPostId,
                        processStatus: "approved",
                        processNote: state.note
                    }
                }).then(() => {
                    notify!({
                        data: {
                            message: "The report has been approved successfully!"
                        },
                        type: ToastType.Success
                    })
                    mutate()
                    onOpenChange()
                }).catch((err) => {
                    notify!({
                        data: {
                            error: err.message
                        },
                        type: ToastType.Error
                    })
                })
            }
    
            if (reportStatus === "rejected") {
                await resolvePostReport({
                    data: {
                        reportPostId: report.reportPostId,
                        processStatus: "rejected",
                        processNote: state.note
                    }
                }).then(() => {
                    notify!({
                        data: {
                            message: "The report has been rejected successfully!"
                        },
                        type: ToastType.Success
                    })
                    mutate()
                    onOpenChange()
                }).catch((err) => {
                    notify!({
                        data: {
                            error: err.message
                        },
                        type: ToastType.Error
                    })
                })
            }
        }
        
    }

    return (
        <Modal scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="pt-4 pb-1 text-2xl tracking-tight font-semibold justify-center items-center flex flex-col">
                            <div className="mr-4">Post Report Detail </div> 
                            <div> <Chip className="capitalize mb-2 " color={statusColorMap[report.processStatus]} variant="flat">
                                {processStatus}
                            </Chip>
                            </div>
                        </ModalHeader>
                        <ModalBody className="p-4">
                            <div className="border-b pb-4 mb-4 border-gray-300 dark:border-gray-800">
                                <h2 className="text-xl font-medium  mb-4 text-gray-800 dark:text-gray-300">Reporter Information</h2>
                                <div className="flex items-center pb-4 mb-6 border-b border-gray-300">
                                    <Avatar
                                        name='avatar'
                                        className='w-16 h-16 rounded-full mr-4'
                                        src={getAvatarUrl({
                                            avatarId: reporterAccount?.avatarId,
                                            avatarUrl: reporterAccount?.avatarUrl,
                                            kind: reporterAccount?.kind,
                                        })}
                                    />
                                    <div>
                                        <p className="mb-2"><span className="font-semibold">Username: </span>{reporterAccount.username}</p>
                                        <p className="mb-2"><span className="font-semibold">Report time: </span>{dayjs(createdAt).format("hh:mm:ss A DD/MM/YYYY")}</p>
                                    </div>
                                </div>
                                <div className="pb-4 mb-4 border-b border-gray-300">
                                    <h2 className="text-xl font-medium  mb-4 text-gray-800 dark:text-gray-300">Post Information</h2>
                                    <div className="">
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{reportedPost?.title}</p>
                                        <div className="mb-2">
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Content: </span></p>
                                            <div className="border border-divider p-4 rounded-lg">
                                                <TextRenderer html={html} />
                                            </div>
                                        </div>
                                        {postMedias?.length > 0 ? (
                                            <div className="mb-2">
                                                <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Media: </span></p>
                                                <MediaGroup
                                                    medias={postMedias?.map(({ mediaId, mediaType, postMediaId }) => ({
                                                        key: postMediaId,
                                                        mediaId,
                                                        mediaType,
                                                    }))}/>
                                            </div>
                                        ): (<></>)}
                                        <p className="mb-1"><span className="font-semibold  text-gray-800 dark:text-gray-300">Author:</span> <span className="">{reportedPost?.creator?.username} </span></p>
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Created date: </span>{dayjs(reportedPost?.createdAt).format("hh:mm:ss A DD/MM/YYYY")}</p>
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Number of likes: </span>{reportedPost?.numberOfLikes}</p>
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Number of comments: </span>{reportedPost?.numberOfComments}</p>
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Number of reports: </span>{reportedPost?.numberOfReports}</p>
                                        <p className="mb-1"><span className="font-semibold  text-gray-800 dark:text-gray-300">This post is belong to the course:</span> <span className="">{reportedPost?.course?.title} </span></p>

                                    </div>
                                        
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium pb-4  text-gray-800 dark:text-gray-300">Report Content</h2>
                                    <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{title}</p>
                                    <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300" >Description: </span>{description}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="font-medium text-xl text-gray-800 dark:text-gray-300 mb-2">Moderator Note: </div>
                                {processStatus == "processing" ? (
                                    <Textarea
                                        classNames={{
                                            inputWrapper: "input-input-wrapper shadow-lg rounded-md",
                                        }}
                                        id="progressNote"
                                        type="string"
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Take note here"
                                        isInvalid={isNotValidNote}
                                        errorMessage="The note should be at least 20 characters long."
                                        onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
                                    />
                                ) : (
                                    <p className="">{processNote}</p>
                                )}
                                
                            </div>

                        </ModalBody>
                        {processStatus == "processing" ? (
                            <ModalFooter>
                                <Button  color="primary" variant="bordered"
                                    onClick={() => handleUpdateReport("approved")}>Approve</Button>
                                <Button color="primary"
                                    onClick={() => handleUpdateReport("rejected")}
                                >
                            Reject
                                </Button>
                            </ModalFooter>
                        ): (<></>)}
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})