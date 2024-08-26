"use client"
import { formatNouns, ReportCourseEntity, ReportProcessStatus } from "@common"
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
    User
} from "@nextui-org/react"

import { getAvatarUrl } from "@services"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react"
import { ResolveModalContext, ResolveModalProvider } from "./ResolveModalProvider"
import { Stars } from "../../../../../../../_shared"

export interface ResolveModalRefProps {
    report: ReportCourseEntity;
}

export interface ResolveModalRefSelectors {
    onOpen: () => void;
}

const WrappedResolveModalRef = forwardRef<
    ResolveModalRefSelectors | null,
    ResolveModalRefProps
>((props, ref) => {
    const { report } = props
    const {reporterAccount, title, description, reportedCourse, createdAt} = report
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const {formik, reducer, swrs} = useContext(ResolveModalContext)!
    const [state, dispatch] = reducer
    const { resolveModalSwrMutation } = swrs
    const {isMutating} = resolveModalSwrMutation
    useImperativeHandle(ref, () => ({
        onOpen
    }))
    const router = useRouter()

    const handleReject = () => {
        dispatch({
            payload: ReportProcessStatus.Rejected,
            type: "SET_VERIFY_STATUS",
        })
        dispatch({
            payload: report.reportCourseId,
            type: "SET_COURSE_REPORT_ID",
        })
        formik.handleSubmit()
    }

    const handleApprove = () => {
        dispatch({
            payload: ReportProcessStatus.Approved,
            type: "SET_VERIFY_STATUS",
        })
        dispatch({
            payload: report.reportCourseId,
            type: "SET_COURSE_REPORT_ID",
        })
        formik.handleSubmit()
    }

    useEffect(() => {
        if (isMutating === false && formik.submitCount > 0 && !formik.errors.note) {
            onClose()
        }
    }, [isMutating])
    return (
    // <Modal scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4">
    //     <ModalContent>
    //         {() => (
    //             <>
    //                 <ModalHeader className="pt-4 pb-1 text-2xl tracking-tight font-semibold justify-center items-center flex flex-col">
    //                     <div className="mr-4">Course Report Detail </div> 
    //                     <div><Chip color={processStatus== "pending" ? "warning": "success"} variant="flat" className="mb-2 capitalize">{processStatus}</Chip></div> 
    //                 </ModalHeader>
    //                 <ModalBody className="p-4">
    //                     <div className="border-b pb-4 mb-4 border-gray-300 dark:border-gray-800">
    //                         <h2 className="text-xl font-medium  mb-4 text-gray-800 dark:text-gray-300">Reporter Information</h2>
    //                         <div className="flex items-center pb-4 mb-6 border-b border-gray-300">
    //                             <Avatar
    //                                 name='avatar'
    //                                 className='w-16 h-16 rounded-full mr-4'
    //                                 src={getAvatarUrl({
    //                                     avatarId: reporterAccount?.avatarId,
    //                                     avatarUrl: reporterAccount?.avatarUrl,
    //                                     kind: reporterAccount?.kind,
    //                                 })}
    //                             />
    //                             <div>
    //                                 <p className="mb-2"><span className="font-semibold">Username: </span>{reporterAccount.username}</p>
    //                                 <p className="mb-2"><span className="font-semibold">Report Time: </span>{dayjs(createdAt).format("hh:mm:ss A MMM D, YYYY")}</p>
    //                             </div>
    //                         </div>
    //                         <div className="pb-4 mb-4 border-b border-gray-300">
    //                             <h2 className="text-xl font-medium  mb-4 text-gray-800 dark:text-gray-300">Course Information</h2>
    //                             <div className="grid grid-cols-3 space-x-3">
    //                                 <div className="col-span-2">
    //                                     <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{reportedCourse?.title}</p>
    //                                     <p className="mb-1"><span className="font-semibold  text-gray-800 dark:text-gray-300">Instructor:</span> <span className="">{reportedCourse?.creator?.username} </span></p>
    //                                     <p className="flex items-end mb-2"><span className="font-semibold mr-1  text-gray-800 dark:text-gray-300">Rating: </span><Stars readonly initialValue={reportedCourse?.courseRatings?.overallCourseRating} /> ({formatNouns(reportedCourse?.courseRatings?.totalNumberOfRatings, "rating")})</p>
    //                                     <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Created Date: </span>{dayjs(reportedCourse?.createdAt).format("hh:mm:ss A MMM D, YYYY")}</p>
    //                                     <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Number of reports: </span>{reportedCourse?.numberOfReports}</p>

    //                                 </div>
    //                                 <div>
    //                                     <Image src={getAssetUrl(reportedCourse?.thumbnailId)} alt="Course Image" className="w-full h-32 border border-divider  rounded-lg mb-4"/>
    //                                 </div>
    //                             </div>
                                
    //                         </div>
    //                         <div>
    //                             <h2 className="text-xl font-medium pb-4  text-gray-800 dark:text-gray-300">Report Content</h2>
    //                             <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{title}</p>
    //                             <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300" >Description: </span>{description}</p>
    //                         </div>
    //                     </div>
    //                     <div className="mb-4">
    //                         <div className="font-medium text-xl text-gray-800 dark:text-gray-300 mb-2">Note:</div>
    //                         {processStatus == "pending" ? (
    //                             <Input
    //                                 classNames={{
    //                                     inputWrapper: "input-input-wrapper shadow-lg rounded-md",
    //                                 }}
    //                                 id="progressNote"
    //                                 type="string"
    //                                 isRequired
    //                                 labelPlacement="outside"
    //                                 placeholder="Take note here"
    //                                 onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
    //                             />
    //                         ) : (
    //                             <p className="">{processNote}</p>
    //                         )}
                                
    //                     </div>

    //                 </ModalBody>
    //                 {processStatus == "pending" ? (
    //                     <ModalFooter>
    //                         <Button  color="primary" variant="bordered"
    //                             onClick={() => handleUpdateReport("approved")}>Approve</Button>
    //                         <Button color="primary"
    //                             onClick={() => handleUpdateReport("rejected")}
    //                         >
    //                     Reject
    //                         </Button>
    //                     </ModalFooter>
    //                 ): (<></>)}
                        
        //             </>
        //         )}
        //     </ModalContent>
        // </Modal>
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
                                <div className="text-primary">Course Information</div>
                                <Spacer y={4} />
                                <div>
                                    <div className="flex gap-2 text-sm">
                                        <div className="font-semibold w-[100px]">Title</div>
                                        {reportedCourse?.title}
                                    </div>
                                    <Spacer y={2} />
                                    <div className="flex gap-2">
                                        <div className="font-semibold w-[100px] text-sm">Instructor</div>
                                        <User classNames={{
                                            name: "text-sm line-clamp-1",
        
                                        }} avatarProps={{
                                            src: getAvatarUrl({
                                                avatarUrl: reportedCourse?.creator?.avatarUrl,
                                                avatarId: reportedCourse?.creator?.avatarId,
                                                kind: reportedCourse?.creator?.kind
                                            })
                                        }} name={reportedCourse?.creator?.username} 
                                        /> 
                                    </div>
                                    <Spacer y={2} />
                                    <div className="flex items-end gap-2 text-sm">
                                        <div className="font-semibold w-[100px]">Rating</div>
                                        <Stars readonly initialValue={reportedCourse?.courseRatings?.overallCourseRating} /> ({formatNouns(reportedCourse?.courseRatings?.totalNumberOfRatings, "rating")})
                                    </div>
                                    <Spacer y={2} />
                                    <div className="flex gap-2 text-sm">
                                        <div className="font-semibold w-[100px]">Number Of Reports</div>
                                        {reportedCourse?.numberOfReports}
                                    </div>
                                    <Spacer y={2} />
                                    <Link size="sm" onPress={() => {router.push(`courses/${reportedCourse?.courseId}`)}}>Course link</Link>
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