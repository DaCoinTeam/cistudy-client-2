import { useContext } from "react"
import { CourseDetailsContext } from "../../../../_hooks"
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react"
import { generateCoursesCertificate, generateLinkedinLink, truncate } from "@common"
import { useRouter } from "next/navigation"
import { RootContext } from "../../../../../../_hooks"
import { DownloadIcon, Linkedin } from "lucide-react"

interface CertificatesLayoutProps {
    className?: string
}

export const CertificatesLayout = (props: CertificatesLayoutProps) => {
    const router = useRouter()
    const { className } = props

    const { swrs: courseDetailSwrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = courseDetailSwrs
    const { data: courseDetailData } = courseSwr
    const { courseId, title } = { ...courseDetailData }

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profileData } = profileSwr
    const { username } = { ...profileData }

    const navigateToCourseList = () => {
        router.push("/courses")
    }

    const navigateToCourseDetail = () => {
        router.push(`/courses/${courseId}`)
    }

    const getCourseCertificateTemplate = () => {
        return generateCoursesCertificate({ courseTitle: title ?? "", username: username ?? "" })
    }

    const addTolinkedIn = () => {
        const linkedIn = generateLinkedinLink(title?? "")
        window.open(linkedIn)
    }

    return (
        <div className={`${className} flex flex-col gap-y-4`}>
            <Breadcrumbs>
                <BreadcrumbItem onPress={navigateToCourseList}>Courses</BreadcrumbItem>
                <BreadcrumbItem onPress={navigateToCourseDetail}>{truncate(courseId ?? "")}</BreadcrumbItem>
                <BreadcrumbItem>Home</BreadcrumbItem>
            </Breadcrumbs>
            <div dangerouslySetInnerHTML={{ __html: getCourseCertificateTemplate() }} />
            <div className="flex flex-row gap-4">
                <Button color="primary" variant="flat" startContent={<DownloadIcon />} >
                    Download Certificate
                </Button>
                <Button color="primary" variant="bordered"  startContent={<Linkedin />} onPress={addTolinkedIn}>
                    Add to LinkedIn
                </Button>
            </div>
        </div>
    )
}