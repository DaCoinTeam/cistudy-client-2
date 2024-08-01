"use client"
import React, { useContext } from "react"
import { Sidebar, ContentPanel } from "./_components"
import { BreadcrumbItem, Breadcrumbs, Button, Chip, Spacer } from "@nextui-org/react"
import { ManagementContext } from "./_hooks"
import useSWRMutation from "swr/mutation"
import { publishCourse } from "@services"
import { RootContext } from "../../../_hooks"
import { ToastType } from "../../../_components"
import { VerifyStatus } from "../../../../common/types"

const Page = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data, mutate } = courseManagementSwr
    const { courseId, verifyStatus } = { ...data }
    
    const { notify } = useContext(RootContext)!

    const publishSwr = useSWRMutation(
        "PUBLISH",
        async (
            _,
            {
                arg,
            }: {
        arg: {
          courseId: string;
        };
      }
        ) => {
            const res = await publishCourse({
                data: arg,
            })
            await mutate()
            return res
        } 
    )

    const renderStatus = () => {
        const map: Record<VerifyStatus, JSX.Element> = {
            [VerifyStatus.Draft]: <Chip color="default" variant="flat"> Draft </Chip>,
            [VerifyStatus.Pending]: <Chip color="warning" variant="flat"> Pending </Chip>,
            [VerifyStatus.Approved]: <Chip color="success" variant="flat"> Approved </Chip>,
            [VerifyStatus.Rejected]: <Chip color="danger" variant="flat"> Rejected </Chip>,
        }
        return map[verifyStatus ?? VerifyStatus.Draft]
    }

    return (
        <div className="px-12 my-12 max-w-[1600px] mx-auto w-full">
            <div className="flex justify-between items-center">
                <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Courses</BreadcrumbItem>
                    <BreadcrumbItem>Management</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2 items-center">
                    {renderStatus()}
                    {
                        verifyStatus === VerifyStatus.Draft
                            ? <Button
                                color="primary"
                                onPress={async () => {
                                    if (!courseId) return
                                    const { message } = await publishSwr.trigger({
                                        courseId,
                                    })
          notify!({
              data: {
                  message,
              },
              type: ToastType.Success,
          })
                                }}
                                isLoading={publishSwr.isMutating}
                                isDisabled={publishSwr.isMutating}
                            >
                                {publishSwr.isMutating ? "Publishing" : "Publish"}
                            </Button> : null
                    }
                    
                </div>
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
    