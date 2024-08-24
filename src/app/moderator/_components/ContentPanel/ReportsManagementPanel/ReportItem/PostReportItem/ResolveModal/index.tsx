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
    Spacer,
    Textarea,
    useDisclosure,
} from "@nextui-org/react"

import {
    ResolvePostReportInput,
    getAvatarUrl,
    resolvePostReport,
} from "@services"
import dayjs from "dayjs"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { ToastType } from "../../../../../../../_components"
import { RootContext } from "../../../../../../../_hooks"
import { TextRenderer } from "../../../../../../../_shared"
import { PostReportItemContext } from "../PostReportItemProvider"
import useSWRMutation from "swr/mutation"

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
    const { reducer, swrs } = useContext(PostReportItemContext)!
    const { postReportsSwr } = swrs
    const { mutate } = postReportsSwr
    const [state, dispatch] = reducer
    const { notify } = useContext(RootContext)!
    const { report } = props
    const {
        title,
        description,
        reportedPost,
        reporterAccount,
        createdAt,
        reportPostId,
    } = { ...report }
    const { html } = { ...reportedPost }
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))

    const { trigger, isMutating } = useSWRMutation(
        "RESOLVE_REPORT_POST",
        async (_, { arg }: { arg: ResolvePostReportInput }) => {
            const { message } = await resolvePostReport(arg)
            await mutate()
            notify!({
                data: {
                    message,
                },
                type: ToastType.Success,
            })
            onClose()
        }
    )

    const { trigger: trigger2, isMutating: isMutating2 } = useSWRMutation(
        "RESOLVE_REPORT_POST2",
        async (_, { arg }: { arg: ResolvePostReportInput }) => {
            const { message } = await resolvePostReport(arg)
            await mutate()
            notify!({
                data: {
                    message,
                },
                type: ToastType.Success,
            })
            onClose()
        }
    )

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
                                isInvalid={state.note.length < 20}
                                classNames={{
                                    inputWrapper: "input-input-wrapper shadow-lg rounded-md",
                                }}
                                id="progressNote"
                                type="string"
                                value={state.note}
                                minLength={20}
                                isRequired
                                labelPlacement="outside"
                                placeholder="Take note here"
                                errorMessage="The note should be at least 20 characters long."
                                onValueChange={(value) =>
                                    dispatch({ type: "SET_NOTE", payload: value })
                                }
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2">
                    <Button
                        isDisabled={state.note.length < 20}
                        isLoading={isMutating}
                        variant="bordered"
                        color="primary"
                        onClick={async () => {
                            await trigger({
                                data: {
                                    processNote: state.note,
                                    processStatus: ReportProcessStatus.Rejected,
                                    reportPostId,
                                },
                            })
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        isDisabled={state.note.length < 20}
                        isLoading={isMutating2}
                        color="primary"
                        onClick={async () => {
                            await trigger2({
                                data: {
                                    processNote: state.note,
                                    processStatus: ReportProcessStatus.Approved,
                                    reportPostId,
                                },
                            })
                        }}
                    >
                        Approve
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})
