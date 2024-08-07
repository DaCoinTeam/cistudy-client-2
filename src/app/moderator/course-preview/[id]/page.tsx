"use client"
import React, { useContext, useRef } from "react"
import { Sidebar, ContentPanel, CourseApproveModalRef, CourseApproveModalRefSelectors } from "./_components"
import { BreadcrumbItem, Breadcrumbs, Button, Spacer } from "@nextui-org/react"
import { ManagementContext } from "./_hooks"
import { VerifyStatus } from "../../../../common/types"
import { useRouter } from "next/navigation"

const Page = () => {
    const courseApproveModalRef = useRef<CourseApproveModalRefSelectors>(null)
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr
    const { title, verifyStatus } = { ...data }
    const router = useRouter()

    return (
        <div className="px-12 my-12 max-w-[1600px] mx-auto w-full">
            <div className="flex justify-between items-center">
                <Breadcrumbs>
                    <BreadcrumbItem onPress={() => router.push("/moderator") }>Moderator</BreadcrumbItem>
                    <BreadcrumbItem>Course-Preview</BreadcrumbItem>
                    <BreadcrumbItem>{title}</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2 items-center">
                    {
                        verifyStatus === VerifyStatus.Pending && (
                            <Button
                                color="primary"
                                onPress={() => courseApproveModalRef.current?.onOpen()}
                            >
                                Resolve
                            </Button>
                        )
                    }
                </div>
            </div>
            <Spacer y={6}/>
            <div className="grid grid-cols-4 gap-12 flex">
                <Sidebar className="col-span-1 h-fit"/>
                <ContentPanel className="col-start-2 col-span-3"/>
            </div>
            <CourseApproveModalRef
                ref={courseApproveModalRef}
            />
        </div>
    )
}

export default Page
    