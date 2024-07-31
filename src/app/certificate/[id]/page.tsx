"use client"
import React, { useContext } from "react"
import { CertificateContext } from "./_hooks"
import { CourseCertificateImage, CourseCertificateInformation } from "./_components"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { truncate } from "@common"

const Page = () => {
    const router = useRouter()
    const {swrs} = useContext(CertificateContext)!
    const {certificateSwr} = swrs
    const {data} = certificateSwr

    const navigateToHome = () => {
        router.push("/")
    }

    return (
        <div className="p-12 max-w-[1920px]">
            <div>
                <Breadcrumbs>
                    <BreadcrumbItem onPress={navigateToHome}>Home</BreadcrumbItem>
                    <BreadcrumbItem>Certificate</BreadcrumbItem>
                    <BreadcrumbItem>{truncate(data?.certificateId ?? "")}</BreadcrumbItem>
                </Breadcrumbs>
                <div className="text-3xl font-semibold capitalize mt-3">{data?.course.title}</div>
            </div>
            <div className="grid grid-cols-10 mx-auto w-full mt-12">
                <CourseCertificateInformation className="col-span-5" />
                <CourseCertificateImage className="col-span-5 ml-4" />
            </div>  
        </div>
    )
}

export default Page