"use client"
import { parseISODateString, ReportPostCommentEntity } from "@common"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Button,
    Input,
} from "@nextui-org/react"

import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { PostCommentReportItemContext } from "../PostCommentReportItemProvider"
import { TextRenderer } from "../../../../../../../_shared"
import { ToastRefSelectors, ToastType } from "../../../../../../../_components"
import { resolvePostCommentReport } from "@services"

export interface ResolveModalRefProps {
    report: ReportPostCommentEntity;
}

export interface ResolveModalRefSelectors {
    onOpen: () => void;
}

export const ResolveModalRef = forwardRef<
    ResolveModalRefSelectors | null,
    ResolveModalRefProps
>((props, ref) => {
    const {reducer, swrs} = useContext(PostCommentReportItemContext)!
    const {postCommentReportsSwr} = swrs
    const {mutate} = postCommentReportsSwr
    const [state, dispatch] = reducer
    const toastRef = useRef<ToastRefSelectors | null>(null)
    const { report } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    const handleUpdateReport = (reportStatus : string) => {
        if (reportStatus === "approved") {
            resolvePostCommentReport({
                data: {
                    reportPostCommentId: report.reportPostCommentId,
                    processStatus: "approved",
                    processNote: state.note
                }
            }).then(() => {
                toastRef.current?.notify({
                    data: {
                        message: "Report has been resolved successfully!"
                    },
                    type: ToastType.Success
                })
                mutate()
                onOpenChange()
            }).catch((err) => {
                toastRef.current?.notify({
                    data: {
                        error: err.message
                    },
                    type: ToastType.Error
                })
            })
        }

        if (reportStatus === "rejected") {
            resolvePostCommentReport({
                data: {
                    reportPostCommentId: report.reportPostCommentId,
                    processStatus: "rejected",
                    processNote: state.note
                }
            }).then(() => {
                toastRef.current?.notify({
                    data: {
                        message: "Report has been resolved successfully!"
                    },
                    type: ToastType.Success
                })
                mutate()
                onOpenChange()
            }).catch((err) => {
                toastRef.current?.notify({
                    data: {
                        error: err.message
                    },
                    type: ToastType.Error
                })
            })
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="p-4 pb-2 text-2xl">Report Detail</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <span className="font-bold">Reporter:</span>
                                    <span className="ml-2">{report.reporterAccount.username}</span>
                                </div>

                                <div>
                                    <span className="font-bold">Report Type:</span>
                                    <span className="ml-2">Post Comment</span>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold">Created At:</span>
                                <span className="ml-2">{parseISODateString(report.createdAt)}</span>
                            </div>
                            <div>
                                <div className="font-bold">Post Reported:</div>
                                <div>
                                    <span className="text-base font-semibold">Comment ID:</span>
                                    <span> {report.reportedPostComment.postCommentId}</span>
                                </div>
                                <div>
                                    <span className="text-base font-semibold">Content:</span>
                                    <div className="h-60 overflow-y-scroll whitespace-nowrap">
                                        <TextRenderer html={report.reportedPostComment.html} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold">Description:</span>
                                <span className="ml-2">{report.description}</span>
                            </div>
                            <div>
                                <div className="font-bold">Progress Note:</div>
                                <Input
                                    classNames={{
                                        inputWrapper: "input-input-wrapper"
                                    }}
                                    id="progressNote"
                                    type="string"
                                    isRequired
                                    labelPlacement="outside"
                                    placeholder="Take note here"
                                    onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
                                />
                            </div>
                            <div>
                                <div className="font-bold">Your Action:</div>
                                <div className="flex justify-center">
                                    <Button color="primary" size="md" onClick={() => handleUpdateReport("approved")}>Approve</Button>
                                    <Button color="danger" size="md" onClick={() => handleUpdateReport("rejected")} className="ml-4">Reject</Button>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
})