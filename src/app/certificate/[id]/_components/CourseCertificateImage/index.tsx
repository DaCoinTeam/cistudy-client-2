import { capitalizeWords, generateLinkedinLink } from "@common"
import { Button, Spacer } from "@nextui-org/react"
import { DownloadIcon, Linkedin } from "lucide-react"
import { useContext, useEffect, useRef } from "react"
import { CertificateContext } from "../../_hooks"
import dayjs from "dayjs"

export interface CourseCertificateImageProps {
    className?: string
}

export const CourseCertificateImage = (props : CourseCertificateImageProps) => {
    const {swrs} = useContext(CertificateContext)!
    const {certificateSwr} = swrs
    const {data} = certificateSwr
    const {certificateId, course, account , createdAt} = {...data}
    const {className} = props
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    
    const imageRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        imageRef.current = new Image()
        imageRef.current.crossOrigin="anonymous"
        imageRef.current.src="/cert-template.png"
    }, [])

    useEffect(() => {
        if (!data) return
        drawCertificate()
    }, [data])

    const addTolinkedIn = () => {
        const issueYear = dayjs(createdAt).format("YYYY")
        const issueMonth = dayjs(createdAt).format("MM")
        const linkedIn = generateLinkedinLink({certId: certificateId?? "", courseTitle: course?.title ?? "", issueYear, issueMonth})
        window.open(linkedIn)
    }

    const drawCertificate = () => {
        const canvas = canvasRef.current
        const image = imageRef.current
        if (canvas && image) {
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            ctx.font = "26px Georgia"
            ctx.textAlign = "center"
            ctx.fillText(account?.username ?? "", 350, 230, 400)
            ctx.font = "30px Georgia"
            ctx.fillText(capitalizeWords(course?.title?? ""), 354, 275, 400)
            ctx.font = "bold 18px Georgia"
            ctx.fillText(course?.creator?.username ?? "", 570, 388, 200)
            ctx.font = "12px Arial"
            ctx.fillText(dayjs(createdAt).format("MMMM DD, YYYY"), 180, 362, 200)
            ctx.fillText("7 Hours 20 Minutes", 195, 380, 200)
            ctx.fillText(certificateId?? "", 186, 415, 200)
        }
    }

    const downloadCertificate = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const link = document.createElement("a")
            link.download = `${course?.title} - ${account?.username}.png`
            link.href = canvas.toDataURL("image/png")
            link.click()
        }
    }

    return (
        <div className={`${className}`}>
            <div className="border-2">
                <canvas id="certificate" width={707} height={500} ref={canvasRef}></canvas>
            </div>
            <Spacer y={4}/>
            <div className="flex flex-row gap-2">
                <Button color="primary" startContent={<DownloadIcon className="w-5 h-5" strokeWidth={3/2}/>} onPress={downloadCertificate} >
                        Download Certificate
                </Button>
                <Button color="primary" variant="bordered" startContent={<Linkedin  className="w-5 h-5" strokeWidth={3/2}/>} onPress={addTolinkedIn} >
                        Add to LinkedIn
                </Button>
            </div>
        </div>
    )
}