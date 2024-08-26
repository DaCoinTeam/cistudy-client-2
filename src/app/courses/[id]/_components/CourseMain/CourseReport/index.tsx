import { useRef } from "react"
import { ReportCourseModalRef, ReportCourseModalRefSelectors } from "./ReportCourseModalRef"
import { Link, Spacer } from "@nextui-org/react"
import { FlagIcon } from "@heroicons/react/24/outline"

export const CourseReport = () => {
    const reportCourseModalRef = useRef<ReportCourseModalRefSelectors | null>(null)
    const onReportCourseModalOpen = () => reportCourseModalRef.current?.onOpen()

    return (
        <div> 
            <div className="flex">
                <FlagIcon className="w-5 h-5 text-danger"/>
                <Spacer x={2}/>
                <Link role="button" className="text-danger text-sm" onPress={onReportCourseModalOpen}>Report Course</Link>
            </div>
            <ReportCourseModalRef ref={reportCourseModalRef} />
        </div>
    )
}