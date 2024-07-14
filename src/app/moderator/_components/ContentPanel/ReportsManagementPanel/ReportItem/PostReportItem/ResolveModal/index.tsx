"use client"
import { parseISODateString, ReportPostEntity } from "@common"
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
import { PostReportItemContext } from "../PostReportItemProvider"
import { TextRenderer } from "../../../../../../../_shared"
import { resolvePostReport } from "@services"
import { ToastRefSelectors, ToastType } from "../../../../../../../_components"

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
    const toastRef = useRef<ToastRefSelectors | null>(null)
    const { report } = props
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    const handleUpdateReport = (reportStatus : string) => {
        if (reportStatus === "approved") {
            resolvePostReport({
                data: {
                    reportPostId: report.reportPostId,
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
            resolvePostReport({
                data: {
                    reportPostId: report.reportPostId,
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
                        <ModalHeader className="p-4 pb-2 text-2xl justify-center">Report Detail</ModalHeader>
                        <ModalBody className="p-4">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <span className="font-bold">Reporter:</span>
                                    <span className="ml-2">{report.reporterAccount.username}</span>
                                </div>

                                <div>
                                    <span className="font-bold">Report Type:</span>
                                    <span className="ml-2">Post</span>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold">Created At:</span>
                                <span className="ml-2">{parseISODateString(report.createdAt)}</span>
                            </div>
                            <div>
                                <div className="font-bold">Post Reported:</div>
                                <div>
                                    <span className="text-base font-bold">Post ID:</span>
                                    <span> {report.reportedPost.postId}</span>
                                </div>
                                <div>
                                    <span className="text-base font-bold">Title:</span>
                                    <span> {report.reportedPost.title}</span>
                                </div>
                                <div>
                                    <span className="text-base font-bold">Content:</span>
                                    <div className="h-60 overflow-y-scroll whitespace-nowrap">
                                        <TextRenderer html={report.reportedPost.html} />
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