"use client"
import React, { useContext } from "react"
import { Sidebar, ContentPanel } from "./_components"
import { BreadcrumbItem, Breadcrumbs, Button, Spacer } from "@nextui-org/react"
import { ManagementContext } from "./_hooks"
import { useRouter } from "next/navigation"
import { VerifyStatus } from "@common"

const Page = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr
    const { courseId, verifyStatus, title } = { ...data }


    const router = useRouter()

    return (
        <div className="px-12 my-12 max-w-[1600px] mx-auto w-full min-h-screen">
            <div className="flex justify-between items-center">
                <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Courses</BreadcrumbItem>
                    <BreadcrumbItem
                        onPress={() =>
                            router.push(
                                `/courses/${courseId}`
                            )
                        }
                    >
                        {title}
                    </BreadcrumbItem>
                    <BreadcrumbItem>Management</BreadcrumbItem>
                </Breadcrumbs>
                {
                    verifyStatus === VerifyStatus.Approved ?
                        <div className="flex gap-2 items-center">
                            <Button variant="bordered" color="primary" onPress={() => router.push(`/courses/${courseId}/home`)}> Enter </Button>
                            <Button color="primary" onPress={() => router.push(`/courses/${courseId}`)}> Preview </Button>
                        </div> 
                        : null
                }
            </div>
            <Spacer y={6}/>
            <div className="grid grid-cols-4 gap-12 flex">
                <Sidebar className="col-span-1 h-fit"/>
                <ContentPanel className="col-start-2 col-span-3"/>
            </div>
        </div>
    )
}

export default Page
    