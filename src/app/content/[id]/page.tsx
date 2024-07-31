"use client"
import React, { useContext } from "react"
import { Content, LessonSkeleton, SectionsCard } from "./_components"
import { ContentDetailsContext } from "./_hooks"
import { BreadcrumbItem, Breadcrumbs, Button, Spacer } from "@nextui-org/react"
import useSWRMutation from "swr/mutation"
import { createCourseCertificate } from "@services"
import { RootContext } from "../../_hooks"
import { ToastType } from "../../_components"
import { CertificateStatus } from "../../../common/types"

const Page = () => {
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { isLoading, mutate } = sectionContentSwr

    const { notify } = useContext(RootContext)!

    const { trigger, isMutating } = useSWRMutation(
        "CREATE_COURSE_CERTIFICATE",
        async () => {
            const { message } = await createCourseCertificate({
                data: {
                    courseId: sectionContentSwr.data?.section.course.courseId ?? "",
                },
            })
            await mutate()
      notify!({
          data: {
              message,
          },
          type: ToastType.Success,
      })
        }
    )

    return (
        <div>
            {!sectionContentSwr.data || isLoading ? (
                <LessonSkeleton />
            ) : (
                <div className="gap-12">
                    <div className="max-w-[1920px]  p-12 mx-auto">
                        <div className="flex justify-between items-center">
                            <Breadcrumbs size="lg">
                                <BreadcrumbItem> Courses </BreadcrumbItem>
                                <BreadcrumbItem>
                                    {sectionContentSwr.data.section.course.title}
                                </BreadcrumbItem>
                                <BreadcrumbItem>Learn</BreadcrumbItem>
                            </Breadcrumbs>
                            {sectionContentSwr.data.section.course.certificateStatus !==
              CertificateStatus.Cannot ? (
                                    <Button
                                        isLoading={isMutating}
                                        onPress={async () => {
                                            if (
                                                sectionContentSwr.data?.section.course
                                                    .certificateStatus === CertificateStatus.Gotten
                                            ) {
                                                console.log("x")
                                            } else {
                                                trigger()
                                            }
                                        }}
                                        color="primary"
                                    >
                                        {sectionContentSwr.data.section.course.certificateStatus ===
                  CertificateStatus.Gotten
                                            ? "View Certificate"
                                            : "Get Certificate"}
                                    </Button>
                                ) : null}
                        </div>
                        <Spacer y={12} />
                        <div className="grid grid-cols-7 gap-12">
                            <SectionsCard className="col-span-2 h-fit" />
                            <Content className="col-span-5" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
