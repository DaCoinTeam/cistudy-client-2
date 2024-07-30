import { useContext, useEffect, useRef } from "react"
import { CourseDetailsContext } from "../../../../_hooks"
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react"
import { capitalizeWords, generateLinkedinLink, truncate } from "@common"
import { useRouter } from "next/navigation"
import { RootContext } from "../../../../../../_hooks"
import { DownloadIcon, Linkedin } from "lucide-react"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import dayjs from "dayjs"

interface CertificatesLayoutProps {
    className?: string
}

export const CertificateLayout = (props: CertificatesLayoutProps) => {
    const today = dayjs(new Date).format("MMMM DD, YYYY")
    const certificateId = uuidv4()
    const issueYear = dayjs(new Date).format("YYYY")
    const issueMonth = dayjs(new Date).format("MM")
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const image = new Image()
    image.crossOrigin="anonymous"
    image.src = "/Certificate.png"
    const router = useRouter()
    const { className } = props

    const { swrs: courseDetailSwrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = courseDetailSwrs
    const { data: courseDetailData } = courseSwr
    const { courseId, title, creator } = { ...courseDetailData }
    const { username: creatorUsername } = { ...creator }

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

    const addTolinkedIn = () => {
        const linkedIn = generateLinkedinLink({certId: certificateId, courseTitle: title ?? "", issueYear, issueMonth})
        window.open(linkedIn)
    }

    useEffect(() => {
        image.onload = () => {
            drawCertificate()
        }
    }, [])

    const drawCertificate = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            ctx.font = "52px Georgia"
            ctx.textAlign = "center"
            ctx.fillText(username ?? "", 535, 400, 600)
            ctx.font = "40px Georgia"
            ctx.fillText(capitalizeWords(title?? ""), 525, 470, 600)
            ctx.font = "bold 24px Georgia"
            ctx.fillText(creatorUsername ?? "", 855, 682, 600)
            ctx.font = "16px Georgia"
            ctx.fillText(today, 265, 639, 328)
            ctx.fillText("7 Hours 20 Minutes", 285, 667, 200)
            ctx.fillText(certificateId, 275, 725, 400)
        }
    }

    useEffect(() => {
        drawCertificate()
    }, [title, username, creatorUsername])

    const downloadCertificate = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const link = document.createElement("a")
            link.download = "certificate.png"
            link.href = canvas.toDataURL("image/png")
            link.click()
        }
    }

    return (
        <div className={`${className} flex flex-col gap-y-4`}>
            <Breadcrumbs>
                <BreadcrumbItem onPress={navigateToCourseList}>Courses</BreadcrumbItem>
                <BreadcrumbItem onPress={navigateToCourseDetail}>{truncate(courseId ?? "")}</BreadcrumbItem>
                <BreadcrumbItem>Home</BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex flex-col gap-4">
                <div className="border-2">
                    <canvas id="certificate" width={1052} height={884} ref={canvasRef}></canvas>
                </div>
                <div className="flex flex-row gap-4">
                    <Button color="primary" variant="flat" startContent={<DownloadIcon />} onPress={downloadCertificate} >
                        Download Certificate
                    </Button>
                    <Button color="primary" variant="bordered" startContent={<Linkedin />} onPress={addTolinkedIn}>
                        Add to LinkedIn
                    </Button>
                </div>
            </div>
        </div>
    )
}