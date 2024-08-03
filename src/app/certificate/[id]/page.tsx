"use client"
import React, { useContext } from "react"
import { CertificateContext } from "./_hooks"
import { CourseCertificateImage, CourseCertificateInformation } from "./_components"
import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const {swrs} = useContext(CertificateContext)!
    const {certificateSwr} = swrs
    const {data} = certificateSwr

    return (
        <div className="p-12 max-w-[1920px]">
            <div>
                <Breadcrumbs>
                    <BreadcrumbItem> Courses </BreadcrumbItem>
                    <BreadcrumbItem
                        onPress={() =>
                            router.push(
                                `/courses/${data?.course.courseId}`
                            )
                        }
                    >
                        {data?.course.title}
                    </BreadcrumbItem>
                    <BreadcrumbItem onPress={() =>
                        router.push(
                            `/courses/${data?.course.courseId}/home`
                        )
                    }>Home</BreadcrumbItem>
                    <BreadcrumbItem>Certificate</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <Spacer y={12}/>
            <div className="grid grid-cols-2 gap-12 mx-auto w-full">
                <CourseCertificateInformation />
                <CourseCertificateImage />
            </div>  
        </div>
    )
}

export default Page