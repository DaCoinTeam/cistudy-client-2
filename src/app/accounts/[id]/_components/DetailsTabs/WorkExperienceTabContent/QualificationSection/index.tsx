import { Card, CardHeader, CardBody, Image, Badge } from "@nextui-org/react"
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
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between p-4">
                    <div className="text-xl font-bold">Qualification</div>
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
                    <div className="flex flex-row gap-4">
                        {
                            accountQualifications && accountQualifications.length > 0? accountQualifications.map((qualification) => (
                                <div key={qualification.accountQualificationId}>
                                    <Badge className="absolute top-2 right-2 w-5 h-5" content={<X />} color="danger" isInvisible={!isEdit} onClick={() => isEdit? confirmDeleteModalRef.current?.onOpen() : ""}>
                                        <Image className="w-[400px] h-80" src={getAssetUrl(qualification.fileId)} alt="qualification" />
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