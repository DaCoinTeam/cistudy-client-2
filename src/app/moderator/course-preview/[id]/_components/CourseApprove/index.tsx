import { Button } from "@nextui-org/react"
import { RootState } from "@redux"
import { useSelector } from "react-redux"
import { CourseApproveModalRef, CourseApproveModalRefSelectors } from "./CourseApproveModal"
import { useRef } from "react"

export const CourseApprove = () => {
    const isDarkMode = useSelector((state: RootState) => state.configuration.darkMode)
    const courseApproveModalRef = useRef<CourseApproveModalRefSelectors>(null)

    const openCourseApproveModal = (status : string) => {
        courseApproveModalRef.current?.onOpen()
        courseApproveModalRef.current?.handleSaveApproveStatus(status)
    }

    return (
        <div className={`w-full p-4 fixed z-50 bottom-0 flex items-center justify-center ${isDarkMode? "" : "bg-white"} bg-white border-t-2`}>
            <Button color="primary" size="md" onClick={() => openCourseApproveModal("approved")}>Approve</Button>
            <Button color="danger" size="md" onClick={() => openCourseApproveModal("rejected")} className="ml-4">Reject</Button>
            <CourseApproveModalRef
                ref={courseApproveModalRef}
            />
        </div>
    )
}