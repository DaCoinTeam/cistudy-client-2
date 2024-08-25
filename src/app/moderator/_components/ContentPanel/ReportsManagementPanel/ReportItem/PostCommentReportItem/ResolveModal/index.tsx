"use client"
import { ReportPostCommentEntity, ReportProcessStatus } from "@common"
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
    ScrollShadow,
    Textarea,
    useDisclosure
} from "@nextui-org/react"

import { getAvatarUrl } from "@services"
import dayjs from "dayjs"
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { MediaGroup, TextRenderer } from "../../../../../../../_shared"
import { ResolveModalContext, ResolveModalProvider } from "./ResolveModalProvider"

export interface ResolveModalRefProps {
    report: ReportPostCommentEntity;
}

export interface ResolveModalRefSelectors {
    onOpen: () => void;
}

const WrappedResolveModalRef = forwardRef<
    ResolveModalRefSelectors,
    ResolveModalRefProps
>((props, ref) => {
    const { formik, reducer, swrs } = useContext(ResolveModalContext)!
    const [state, dispatch] = reducer
    const { resolveModalSwrMutation } = swrs
    const { isMutating } = resolveModalSwrMutation
    const { report } = props
    const { reporterAccount, createdAt, reportedPostComment, title, description, processStatus, processNote } = report
    const { html, postCommentMedias, creator, numberOfLikes, isRewardable, isSolution, post } = { ...reportedPostComment }
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    const statusColorMap: Record<string, ChipProps["color"]> = {
        approved: "success",
        rejected: "danger",
        processing: "warning",
    }
    useImperativeHandle(ref, () => ({
        onOpen
    }))

    const handleReject = () => {
        dispatch({
            payload: ReportProcessStatus.Rejected,
            type: "SET_VERIFY_STATUS",
        })
        dispatch({
            payload: report.reportPostCommentId,
            type: "SET_POST_COMMENT_REPORT_ID",
        })
        formik.handleSubmit()
    }

    const handleApprove = () => {
        dispatch({
            payload: ReportProcessStatus.Approved,
            type: "SET_VERIFY_STATUS",
        })
        dispatch({
            payload: report.reportPostCommentId,
            type: "SET_POST_COMMENT_REPORT_ID",
        })
        formik.handleSubmit()
    }

    useEffect(() => {
        if (isMutating === false && formik.submitCount > 0 && !formik.errors.note) {
            onClose()
        }
    }, [isMutating])

    return (
        <Modal scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="pt-4 pb-1 text-2xl tracking-tight font-semibold justify-center items-center flex flex-col">
                            <div className="mr-4">Comment Report Detail </div>
                            <div> <Chip className="capitalize mb-2 " color={statusColorMap[report.processStatus]} variant="flat">
                                {processStatus}
                            </Chip>
                            </div>
                        </ModalHeader>
                        <ModalBody className="p-4">
                            <ScrollShadow className="h-[400px]" hideScrollBar>
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
                                            <p className="mb-2"><span className="font-semibold">Report Time: </span>{dayjs(createdAt).format("hh:mm:ss A DD/MM/YYYY")}</p>
                                        </div>
                                    </div>
                                    <div className="pb-4 mb-4 border-b border-gray-300">
                                        <h2 className="text-xl font-medium  mb-4 text-gray-800 dark:text-gray-300">Comment Information</h2>
                                        <div className="">
                                            <div className="mb-2">
                                                <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Content: </span></p>
                                                <div className="border border-divider p-2 rounded-lg">
                                                    <TextRenderer html={html} />
                                                </div>
                                            </div>
                                            {postCommentMedias?.length > 0 ? (
                                                <div className="mb-2">
                                                    <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Media: </span></p>
                                                    <MediaGroup
                                                        medias={postCommentMedias?.map(({ mediaId, mediaType, postCommentMediaId }) => ({
                                                            key: postCommentMediaId,
                                                            mediaId,
                                                            mediaType,
                                                        }))} />
                                                </div>
                                            ) : (<></>)}
                                            <p className="mb-1"><span className="font-semibold  text-gray-800 dark:text-gray-300">Author:</span> <span className="">{creator?.username} </span></p>
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Created Date: </span>{dayjs(createdAt).format("hh:mm:ss A DD/MM/YYYY")}</p>
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Number of likes: </span>{numberOfLikes}</p>
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Is a rewardable comment : </span>{isRewardable ? "Yes" : "No"}</p>
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Is a comment as solution : </span>{isSolution ? "Yes" : "No"}</p>
                                            <p className="mb-1"><span className="font-semibold  text-gray-800 dark:text-gray-300">This post is belong to the post:</span> <span className="">{post?.title} </span></p>
                                        </div>

                                    </div>
                                    <div>
                                        <h2 className="text-xl font-medium pb-4  text-gray-800 dark:text-gray-300">Report Content</h2>
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{title}</p>
                                        <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300" >Description: </span>{description}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="font-medium text-xl text-gray-800 dark:text-gray-300 mb-2">Moderator Note:</div>
                                    {processStatus == "processing" ? (
                                        <Textarea
                                            classNames={{
                                                inputWrapper: "input-input-wrapper shadow-lg rounded-md",
                                            }}
                                            id="note"
                                            type="string"
                                            value={formik.values.note}
                                            labelPlacement="outside"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={!!(formik.touched.note && formik.errors.note)}
                                            errorMessage={formik.touched.note && formik.errors.note}
                                        />
                                    ) : (
                                        <p className="">{processNote}</p>
                                    )}

                                </div>
                            </ScrollShadow>
                        </ModalBody>
                        {processStatus == "processing" ? (
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    variant="bordered"
                                    isDisabled={isMutating && state.verifyStatus === ReportProcessStatus.Approved}
                                    isLoading={isMutating && state.verifyStatus === ReportProcessStatus.Approved}
                                    onClick={handleApprove}>
                                    Approve
                                </Button>

                                <Button
                                    color="primary"
                                    isDisabled={isMutating && state.verifyStatus === ReportProcessStatus.Rejected}
                                    isLoading={isMutating && state.verifyStatus === ReportProcessStatus.Rejected}
                                    onClick={handleReject}
                                >
                                    Reject
                                </Button>
                            </ModalFooter>
                        ) : (<></>)}
                    </>
                )}
            </ModalContent>
        </Modal>
        // <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        //     <ModalContent>
        //         {() => (
        //             <>
        //                 <ModalHeader className="p-4 pb-2 text-2xl">Report Detail</ModalHeader>
        //                 <ModalBody className="p-4">
        //                     <div className="flex flex-row justify-between">
        //                         <div>
        //                             <span className="font-bold">Reporter:</span>
        //                             <span className="ml-2">{report.reporterAccount.username}</span>
        //                         </div>

    //                         <div>
    //                             <span className="font-bold">Report Type:</span>
    //                             <span className="ml-2">Post Comment</span>
    //                         </div>
    //                     </div>
    //                     <div>
    //                         <span className="font-bold">Created At:</span>
    //                         <span className="ml-2">{parseISODateString(report.createdAt)}</span>
    //                     </div>
    //                     <div>
    //                         <div className="font-bold">Post Reported:</div>
    //                         <div>
    //                             <span className="text-base font-semibold">Comment ID:</span>
    //                             <span> {report.reportedPostComment.postCommentId}</span>
    //                         </div>
    //                         <div>
    //                             <span className="text-base font-semibold">Content:</span>
    //                             <div className="h-60 overflow-y-scroll whitespace-nowrap">
    //                                 <TextRenderer html={report.reportedPostComment.html} />
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div>
    //                         <span className="font-bold">Description:</span>
    //                         <span className="ml-2">{report.description}</span>
    //                     </div>
    //                     <div>
    //                         <div className="font-bold">Progress Note:</div>
    //                         <Input
    //                             classNames={{
    //                                 inputWrapper: "input-input-wrapper"
    //                             }}
    //                             id="progressNote"
    //                             type="string"
    //                             isRequired
    //                             labelPlacement="outside"
    //                             placeholder="Take note here"
    //                             onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
    //                         />
    //                     </div>
    //                     <div>
    //                         <div className="font-bold">Your Action:</div>
    //                         <div className="flex justify-center">
    //                             <Button color="primary" size="md" onClick={() => handleUpdateReport("approved")}>Approve</Button>
    //                             <Button color="danger" size="md" onClick={() => handleUpdateReport("rejected")} className="ml-4">Reject</Button>
    //                         </div>
    //                     </div>
    //                 </ModalBody>
    //             </>
    //         )}
    //     </ModalContent>
    // </Modal>
    )
})

export const ResolveModalRef = forwardRef<
    ResolveModalRefSelectors,
    ResolveModalRefProps
>((props, ref) => {
    const { report } = props

    return (
        <ResolveModalProvider>
            <WrappedResolveModalRef ref={ref} report={report} />
        </ResolveModalProvider>
    )
})