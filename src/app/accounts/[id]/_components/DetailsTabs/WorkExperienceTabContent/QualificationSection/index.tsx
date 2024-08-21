import { Card, CardHeader, CardBody, Image, Spacer, Link } from "@nextui-org/react"
import { Edit3, PlusIcon, Trash2} from "lucide-react"
import { AddQualificationModalRef, AddQualificationModalRefSelectors } from "./QualificationModalRef"
import { useContext, useRef, useState } from "react"
import { deleteQualification, DeleteQualificationInput, getAssetUrl } from "@services"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { AccountDetailsContext } from "../../../../_hooks"
import { AccountQualificationEntity, ErrorResponse } from "@common"
import { useParams } from "next/navigation"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../_shared"
import dayjs from "dayjs"
import useSWRMutation from "swr/mutation"
import { EditQualificationModalRef, EditQualificationModalRefSelectors } from "./QualificationModalRef/EditQualificationModalRef"

export const QualificationSection = () => {
    const [currentQualification, setCurrentQualification] = useState<AccountQualificationEntity | null>(null)
    const route = useParams()
    const accountIdParam = route.id
    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors>(null)

    const {notify, swrs: rootSwrs} = useContext(RootContext)!
    const {profileSwr} = rootSwrs
    const {data: profileData} = profileSwr
    const {accountId: currentAccountId} = {...profileData}

    const {swrs: accountDetailSwrs} = useContext(AccountDetailsContext)!
    const {accountSwr} = accountDetailSwrs
    const {data: accountData, mutate} = accountSwr
    const {accountQualifications} = {...accountData}
    const addQualificationRef = useRef<AddQualificationModalRefSelectors>(null)
    const editQualificationRef = useRef<EditQualificationModalRefSelectors>(null)

    const deleteQualificationSwrMutation = useSWRMutation(
        "DELETE_QUALIFICATION",
        async(_: string, {arg} : {arg: DeleteQualificationInput}) => {
            return await deleteQualification(arg)
        }
    )

    const handleRemoveQualification = async(accountQualificationId: string) => {
        try {
            const {message} = await deleteQualificationSwrMutation.trigger({accountQualificationId})
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

    const handleOpenDeleteQualificationModal = (qualification: AccountQualificationEntity) => {
        setCurrentQualification(qualification)
        confirmDeleteModalRef.current?.onOpen()
    }

    const handleOpenEditQualificationModal = (qualification: AccountQualificationEntity) => {
        setCurrentQualification(qualification)
        editQualificationRef.current?.onOpen()
    }
    
    return (
        <div>
            <Card shadow="none" className="w-full border-divider border">
                <CardHeader className="flex flex-row justify-between p-4">
                    <div>
                        <div className="text-xl font-semibold">Qualification</div>
                        <div className="text-sm text-warning">At least 1 qualification is required to publish course.</div>
                    </div>   
                    <div>
                        {
                            accountIdParam === currentAccountId && (
                                <div className="flex flex-row gap-4">
                                    {
                                        accountQualifications && accountQualifications.length < 3 && (
                                            <PlusIcon className="w-5 h-5 cursor-pointer" strokeWidth={3 / 2} onClick={() => addQualificationRef.current?.onOpen()} />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="grid gap-4">
                        {
                            accountQualifications && accountQualifications.length > 0? accountQualifications.map((qualification) => (
                                <div key={qualification.accountQualificationId} className="border border-divider rounded-medium p-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <div>
                                            <div className="font-semibold">{qualification.name}</div>
                                            <div className="flex gap-2">
                                                <div className="text-sm text-foreground-400">{dayjs(new Date(qualification.issuedAt)).format("YYYY MMM, DD")}</div>
                                                <div className="text-sm text-foreground-400">{qualification.issuedFrom}</div>
                                            </div>                          
                                            <Link href={qualification.url} isExternal color="foreground" size="sm" showAnchorIcon underline="always">
                                                {qualification.url} 
                                            </Link>
                                            <Spacer y={4}/>
                                            <Image className="w-[300px]" src={getAssetUrl(qualification.fileId)} alt="qualification" />
                                        </div>

                                        <div>
                                            {
                                                currentAccountId === accountIdParam && (
                                                    <div className="flex flex-row gap-4">
                                                        <Trash2 className="w-5 h-5 cursor-pointer text-danger" strokeWidth={3 / 2} onClick={() => handleOpenDeleteQualificationModal(qualification)} />
                                                        <Edit3 className="w-5 h-5 cursor-pointer text-primary" strokeWidth={3 / 2} onClick={() => handleOpenEditQualificationModal(qualification)} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="flex items-center">
                                    No qualification to display
                                </div>
                            )
                        }
                    </div>
                </CardBody>
            </Card>

            <AddQualificationModalRef ref={addQualificationRef} />
            <ConfirmDeleteModalRef ref={confirmDeleteModalRef} title="Delete qualification" content="Confirm to delete this qualification?" isLoading={deleteQualificationSwrMutation.isMutating} onDeletePress={() => handleRemoveQualification(currentQualification?.accountQualificationId as string)} />
            <EditQualificationModalRef ref={editQualificationRef} qualification={currentQualification as AccountQualificationEntity} />
        </div>
    )
}