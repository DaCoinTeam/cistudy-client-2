import { Card, CardHeader, CardBody, Image, Badge, Spacer, Link } from "@nextui-org/react"
import { Edit3, PlusIcon, X } from "lucide-react"
import { AddQualificationModalRef, AddQualificationModalRefSelectors } from "./QualificationModalRef"
import { useContext, useRef, useState } from "react"
import { deleteQualification, getAssetUrl } from "@services"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { AccountDetailsContext } from "../../../../_hooks"
import { ErrorResponse } from "@common"
import { useParams } from "next/navigation"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../_shared"
import dayjs from "dayjs"

export const QualificationSection = () => {
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
    const [isEdit, setIsEdit] = useState(false)

    const handleRemoveQualification = async(accountQualificationId: string) => {
        try {
            const {message} = await deleteQualification({accountQualificationId})
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
                                        accountQualifications && accountQualifications.length > 0 && (
                                            <Edit3 className={`w-5 h-5 ${isEdit? "text-primary" : ""} cursor-pointer`} strokeWidth={3 / 2} onClick={() => {setIsEdit(!isEdit)}} />
                                        )
                                    }
                                    <PlusIcon className="w-5 h-5 cursor-pointer" strokeWidth={3 / 2} onClick={() => addQualificationRef.current?.onOpen()} />
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
                                    <Badge className="absolute top-2 right-2 w-5 h-5" content={<X />} color="danger" isInvisible={!isEdit} onClick={() => isEdit? confirmDeleteModalRef.current?.onOpen() : ""}>
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
                                    </Badge>

                                    <ConfirmDeleteModalRef
                                        ref={confirmDeleteModalRef}
                                        title="Delete Qualification"
                                        content="Are you sure you want to delete this qualification?"
                                        onDeletePress={() => handleRemoveQualification(qualification.accountQualificationId)}
                                    />
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
        </div>
    )
}