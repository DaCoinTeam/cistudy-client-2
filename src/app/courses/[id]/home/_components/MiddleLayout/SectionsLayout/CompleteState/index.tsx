import React, { useContext } from "react"
import { HomeContext } from "../../../../_hooks"
import { Button, Progress, Spacer } from "@nextui-org/react"
import { CertificateStatus } from "@common"
import useSWRMutation from "swr/mutation"
import { CreateCourseCertificateInput, createCourseCertificate } from "@services"
import { RootContext } from "../../../../../../../_hooks"
import { ToastType } from "../../../../../../../_components"

export const CompleteState = () => {
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data, mutate } = courseHomeSwr
    const { notify } = useContext(RootContext)!
    
    const { trigger, isMutating } = useSWRMutation("CREATE_COURSE_CERTIFICATE", async (_, { arg }: { 
        arg: CreateCourseCertificateInput
    }) => {
        const { message } = await createCourseCertificate(arg)
        await mutate()
        
        notify!({
            data: {
                message
            }
            ,type: ToastType.Success
        })
    })

    return (
        <div>
            <Progress showValueLabel className="w-[400px]" color="primary" value={(data?.completedContents ?? 0) * 100 / (data?.totalContents ?? 1)}/>
            <Spacer y={4}/>
            <div className="flex gap-2 text-sm items-center text-foreground-400">
                <div className="w-[150px]">Completed contents</div>
                <div>{data?.completedContents}</div>
            </div>
            <Spacer y={2}/>
            <div className="flex gap-2 text-sm items-center text-foreground-400">
                <div className="w-[150px]">Total contents</div>
                <div>{data?.totalContents}</div>
            </div>
            <Spacer y={6}/>
            <div className="flex-2">
                {
                    data?.certificateStatus === CertificateStatus.Gotten ? (
                        <Button
                            color="primary"
                            onPress={() => {
                                window.open(`/certificate/${data.certificate?.certificateId}`)
                            }}>
                            View Certificate
                        </Button>
                    ) : (
                        <Button
                            color="primary"
                            isLoading={isMutating}
                            isDisabled={data?.certificateStatus === CertificateStatus.Cannot}
                            onPress={async () => {
                                if (!data?.courseId) return
                                await trigger({
                                    data: {
                                        courseId: data?.courseId
                                    }
                                })
                            }}>
                                Get Certificate & Rewards
                        </Button>
                    )
                }
            </div>
        </div>
    )
}