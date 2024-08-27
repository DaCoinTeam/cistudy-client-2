"use client"
import { ReportPostEntity, ReportProcessStatus } from "@common"
import {
    Avatar,
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ScrollShadow,
    Spacer,
    Textarea,
    useDisclosure,
} from "@nextui-org/react"

import {
    getAvatarUrl,
} from "@services"
import dayjs from "dayjs"
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { TextRenderer } from "../../../../../../../_shared"
import { ResolveModalContext, ResolveModalProvider } from "./ResolveModalProvider"

export interface ResolveModalRefProps {
    report: ReportPostEntity;
}

export interface ResolveModalRefSelectors {
    onOpen: () => void;
}

const WrappedResolveModalRef = forwardRef<
    ResolveModalRefSelectors | null,
    ResolveModalRefProps
>((props, ref) => {
    const { report } = props
    const {
        title,
        description,
        reportedPost,
        reporterAccount,
        createdAt,
    } = { ...report }
    const {formik, reducer, swrs} = useContext(ResolveModalContext)!
    const [state, dispatch] = reducer
    const { resolveModalSwrMutation } = swrs
    const {isMutating} = resolveModalSwrMutation
    const { html } = { ...reportedPost }
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const handleReject = () => {
        dispatch({
            payload: ReportProcessStatus.Rejected,
            type: "SET_VERIFY_STATUS",
        })
        dispatch({
            payload: report.reportPostId,
            type: "SET_POST_REPORT_ID",
        })
        formik.handleSubmit()
    }

    const handleApprove = () => {
        dispatch({
            payload: ReportProcessStatus.Approved,
            type: "SET_VERIFY_STATUS",
        })
        dispatch({
            payload: report.reportPostId,
            type: "SET_POST_REPORT_ID",
        })
        formik.handleSubmit()
    }

    useEffect(() => {
        if (isMutating === false && formik.submitCount > 0 && !formik.errors.note) {
            onClose()
        }
    }, [isMutating])
    
    return (
        <Modal
            scrollBehavior="outside"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
        >
            <ModalContent>
                <ModalHeader className="p-4 pb-2 text-xl font-semibold">
                    <div>Post Report Detail </div>
                </ModalHeader>
                <ModalBody className="p-4">
                    <ScrollShadow className="h-[480px]" hideScrollBar>
                        <div>
                            <div className="text-primary">Reporter Information</div>
                            <Spacer y={4} />
                            <div className="flex items-center gap-2">
                                <Avatar
                                    name="avatar"
                                    className="w-12 h-12 rounded-full"
                                    src={getAvatarUrl({
                                        avatarId: reporterAccount?.avatarId,
                                        avatarUrl: reporterAccount?.avatarUrl,
                                        kind: reporterAccount?.kind,
                                    })}
                                />
                                <div>
                                    <div className="text-sm flex items-center">
                                        <div className="min-w-[100px] font-semibold">Username </div>
                                        {reporterAccount?.username}
                                    </div>
                                    <div className="text-sm flex items-center">
                                        <div className="min-w-[100px] font-semibold">Report time</div>
                                        {dayjs(createdAt).format("hh:mm:ss A DD/MM/YYYY")}
                                    </div>
                                </div>
                            </div>
                            <Spacer y={6} />
                            <div>
                                <div className="text-primary">Post Information</div>
                                <Spacer y={4} />
                                <div>
                                    <div className="flex gap-2">
                                        <div className="font-semibold w-[100px] text-sm">Title</div>
                                        {reportedPost?.title}
                                    </div>
                                    <Spacer y={2} />
                                    <div>
                                        <div>
                                            <div className="font-semibold w-[100px] text-sm">
                                            Content
                                            </div>
                                            <Spacer y={1.5} />
                                            <div className="border border-divider p-4 rounded-lg">
                                                <TextRenderer html={html} />
                                            </div>
                                        </div>
                                    </div>
                                    <Spacer y={2} />
                                    <Link size="sm">Post link</Link>
                                </div>
                                <Spacer y={6} />
                            </div>
                            <div>
                                <div className="text-primary">Content</div>
                                <Spacer y={4} />
                                <div className="text-sm flex items-center">
                                    <div className="font-semibold w-[100px]">Title</div>
                                    {title}
                                </div>
                                <Spacer y={2} />
                                <div className="text-sm flex items-center">
                                    <div className="font-semibold w-[100px]">Description</div>
                                    {description}
                                </div>
                                <Spacer y={6} />
                                <div className="text-primary">Moderator Note</div>
                                <Spacer y={4} />
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
                            </div>
                        </div>
                    </ScrollShadow>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button
                        isDisabled={isMutating && state.verifyStatus === ReportProcessStatus.Rejected}
                        isLoading={isMutating && state.verifyStatus === ReportProcessStatus.Rejected}
                        variant="bordered"
                        color="primary"
                        onClick={handleReject}
                    >
                        Reject
                    </Button>
                    <Button
                        isDisabled={isMutating && state.verifyStatus === ReportProcessStatus.Approved}
                        isLoading={isMutating && state.verifyStatus === ReportProcessStatus.Approved}
                        color="primary"
                        onClick={handleApprove}
                    >
                        Approve
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export const ResolveModalRef = forwardRef<
    ResolveModalRefSelectors,
    ResolveModalRefProps
>((props, ref) => {
    const {report} = props

    return (
        <ResolveModalProvider>
            <WrappedResolveModalRef report={report} ref={ref} />
        </ResolveModalProvider>
    )
})