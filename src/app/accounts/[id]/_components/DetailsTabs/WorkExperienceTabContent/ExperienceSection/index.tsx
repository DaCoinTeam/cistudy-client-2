import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react"
import { Edit3, PlusIcon, Trash2 } from "lucide-react"
import { AddExperienceModalRefSelectors, AddExperiencesModalRef, EditExperienceModalRef, EditExperienceModalRefSelectors } from "./ExperienceModalRef"
import { useContext, useRef, useState } from "react"
import useSWRMutation from "swr/mutation"
import { deleteJob, DeleteJobInput, getAssetUrl } from "@services"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../_shared"
import { useParams } from "next/navigation"
import { RootContext } from "../../../../../../_hooks"
import { AccountDetailsContext } from "../../../../_hooks"
import dayjs from "dayjs"
import { ToastType } from "../../../../../../_components"
import { AccountJobEntity, ErrorResponse } from "@common"

export const ExperienceSection = () => {
    const [currentExperience, setCurrentExperience] = useState<AccountJobEntity | null>(null)
    const route = useParams()
    const accountIdParam = route.id

    const {swrs: rootSwrs, notify} = useContext(RootContext)!
    const {profileSwr} = rootSwrs
    const {data: profileData} = profileSwr
    const {accountId: currentAccountId} = {...profileData}

    const {swrs: accountDetailSwrs} = useContext(AccountDetailsContext)!
    const {accountSwr} = accountDetailSwrs
    const {data: accountData, mutate} = accountSwr
    const {accountJobs} = {...accountData}
    const addExperienceModalRef = useRef<AddExperienceModalRefSelectors>(null)
    const editExperienceModalRef = useRef<EditExperienceModalRefSelectors>(null)
    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors>(null)

    const deleteExperienceSwrMutation = useSWRMutation(
        "DELETE_EXPERIENCE",
        async(_: string, {arg} : {arg : DeleteJobInput}) => {
            return await deleteJob(arg)
        }
    )

    const handleDeleteExperience = async(accountJobId: string) => {
        const {message} = await deleteExperienceSwrMutation.trigger({accountJobId})
        try {
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
            mutate()
        } catch (ex) {
            const {message} = ex as ErrorResponse
            notify!({
                data: {
                    error: message as string
                },
                type: ToastType.Error
            })
        }
    }

    const handleOpenEditExperienceModal = (experience: AccountJobEntity) => {
        setCurrentExperience(experience)
        editExperienceModalRef.current?.onOpen()
    }

    const handleOpenDeleteExperienceModal = (experience: AccountJobEntity) => {
        setCurrentExperience(experience)
        confirmDeleteModalRef.current?.onOpen()
    }

    return (
        <div>
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between p-4">
                    <div className="text-xl font-bold">Experience</div>
                    {
                        currentAccountId === accountIdParam && (
                            <PlusIcon className="w-5 h-5 cursor-pointer" strokeWidth={3 / 2} onClick={() => addExperienceModalRef.current?.onOpen()} />
                        )
                    }
                </CardHeader>
                <CardBody className="p-4">
                    {
                        accountJobs && accountJobs.length > 0? accountJobs?.map((job, index) => (
                            <div key={job.accountJobId} className="gap-4">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row py-4 gap-2">
                                        <div>
                                            <Image className="w-44 h-20" src={getAssetUrl(job.companyThumbnailId)} alt="company" />
                                        </div>
                                        <div className="gap-2">
                                            <div className="text-lg font-semibold">
                                                {job.companyName}
                                            </div>

                                            <div className="text-base">
                                                {job.role}
                                            </div>

                                            <div className="text-base opacity-50">
                                                {dayjs(job.startDate).format("MMM YYYY")} - {job.endDate ? dayjs(job.endDate).format("MMM YYYY") : "Present"} · {job.endDate ? dayjs(job.endDate).diff(dayjs(job.startDate), "year") : dayjs().diff(dayjs(job.startDate), "year")} years
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {
                                            currentAccountId === accountIdParam && (
                                                <div className="flex flex-row gap-4">
                                                    <Trash2 className="w-5 h-5 cursor-pointer text-danger" strokeWidth={3 / 2} onClick={() => handleOpenDeleteExperienceModal(job)} />
                                                    <Edit3 className="w-5 h-5 cursor-pointer text-primary" strokeWidth={3 / 2} onClick={() => handleOpenEditExperienceModal(job)} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    index < accountJobs.length-1 && (<Divider />)
                                }
                            </div>
                        )) : (
                            <div className="flex items-center">
                                No experience to display
                            </div>
                        )
                    }
                </CardBody>
            </Card>

            <AddExperiencesModalRef ref={addExperienceModalRef} />
            <ConfirmDeleteModalRef title="Delete Experience" content="Are you sure you want to delete this experience?" ref={confirmDeleteModalRef} isLoading={deleteExperienceSwrMutation.isMutating} onDeletePress={() => handleDeleteExperience(currentExperience?.accountJobId as string)} />
            <EditExperienceModalRef ref={editExperienceModalRef} experience={currentExperience as AccountJobEntity} />
        </div>
    )
}