"use client"
import { formatNouns, ReportCourseEntity } from "@common"
import {
    Avatar,
    Button,
    Chip,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"

import { getAssetUrl, getAvatarUrl, resolveCourseReport } from "@services"
import dayjs from "dayjs"
import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { ToastRefSelectors, ToastType } from "../../../../../../../_components"
import { Stars } from "../../../../../../../_shared"
import { CourseReportItemContext } from "../CourseReportItemProvider"

export interface ResolveModalRefProps {
    report: ReportCourseEntity;
}

export interface ResolveModalRefSelectors {
    onOpen: () => void;
}

export const ResolveModalRef = forwardRef<
    ResolveModalRefSelectors | null,
    ResolveModalRefProps
>((props, ref) => {
    const {reducer, swrs} = useContext(CourseReportItemContext)!
    const {courseReportsSwr} = swrs
    const {mutate} = courseReportsSwr
    const [state, dispatch] = reducer
    const toastRef = useRef<ToastRefSelectors | null>(null)
    const { report } = props
    const {reporterAccount, title, description, reportedCourse, createdAt, processNote, processStatus} = report
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    const handleUpdateReport = (reportStatus : string) => {
        if (reportStatus === "approved") {
            resolveCourseReport({
                data: {
                    reportCourseId: report.reportCourseId,
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
    }

    return (
        <Modal scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="pt-4 pb-1 text-2xl tracking-tight font-semibold justify-center items-center flex flex-col">
                            <div className="mr-4">Course Report Detail </div> 
                            <div><Chip color={processStatus== "pending" ? "warning": "success"} variant="flat" className="mb-2 capitalize">{processStatus}</Chip></div> 
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
                                        <p className="mb-2"><span className="font-semibold">Report Time: </span>{dayjs(createdAt).format("hh:mm:ss A MMM D, YYYY")}</p>
                                    </div>
                                </div>
                                <div className="pb-4 mb-4 border-b border-gray-300">
                                    <h2 className="text-xl font-medium  mb-4 text-gray-800 dark:text-gray-300">Course Information</h2>
                                    <div className="grid grid-cols-3 space-x-3">
                                        <div className="col-span-2">
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{reportedCourse?.title}</p>
                                            <p className="mb-1"><span className="font-semibold  text-gray-800 dark:text-gray-300">Instructor:</span> <span className="">{reportedCourse?.creator?.username} </span></p>
                                            <p className="flex items-end mb-2"><span className="font-semibold mr-1  text-gray-800 dark:text-gray-300">Rating: </span><Stars readonly initialValue={reportedCourse?.courseRatings?.overallCourseRating} /> ({formatNouns(reportedCourse?.courseRatings?.totalNumberOfRatings, "rating")})</p>
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Created Date: </span>{dayjs(reportedCourse?.createdAt).format("hh:mm:ss A MMM D, YYYY")}</p>
                                            <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Number of reports: </span>{reportedCourse?.numberOfReports}</p>

                                        </div>
                                        <div>
                                            <Image src={getAssetUrl(reportedCourse?.thumbnailId)} alt="Course Image" className="w-full h-32 border border-divider  rounded-lg mb-4"/>
                                        </div>
                                    </div>
                                
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium pb-4  text-gray-800 dark:text-gray-300">Report Content</h2>
                                    <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300">Title: </span>{title}</p>
                                    <p className="mb-2"><span className="font-semibold  text-gray-800 dark:text-gray-300" >Description: </span>{description}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="font-medium text-xl text-gray-800 dark:text-gray-300 mb-2">Note:</div>
                                {processStatus == "pending" ? (
                                    <Input
                                        classNames={{
                                            inputWrapper: "input-input-wrapper shadow-lg rounded-md",
                                        }}
                                        id="progressNote"
                                        type="string"
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Take note here"
                                        onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
                                    />
                                ) : (
                                    <p className="">{processNote}</p>
                                )}
                                
                            </div>

                        </ModalBody>
                        {processStatus == "pending" ? (
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