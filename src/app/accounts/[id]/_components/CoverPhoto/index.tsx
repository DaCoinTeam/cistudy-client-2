import React, { useContext, useRef } from "react"
import { AccountDetailsContext } from "../../_hooks"
import { Button, Image } from "@nextui-org/react"
import { getAssetUrl, updateProfile, UpdateProfileInput } from "@services"
import { RootContext } from "../../../../_hooks"
import { ImageUpIcon } from "lucide-react"
import useSWRMutation from "swr/mutation"

interface CoverPhotoProps {
  className?: string;
}
export const CoverPhoto = (props: CoverPhotoProps) => {
    // console.log("Recalled")
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account, mutate } = accountSwr

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile, mutate: rootMutate } = profileSwr

    const isOwnProfile = account?.accountId === profile?.accountId

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const updateProfileSwrMutation = useSWRMutation(
        "UPDATE_PROFILE",
        async (_: string, { arg }: { arg: UpdateProfileInput }) => {
            return await updateProfile(arg)
        }
    )

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        updateProfileSwrMutation.trigger({
            data: {
                coverPhotoIndex: 0
            },
            files: [file]
        })

        await mutate()
        await rootMutate()
    }

    return (
        <>
            <div
                className={`${className} absolute overflow-hidden`}
            >
                <Image
                    alt="coverPhoto"
                    radius="none"
                    src={getAssetUrl(account?.coverPhotoId, {forceUpdate: false})}
                    className="w-full"
                    classNames={{
                        wrapper: "w-full !max-w-full absolute",
                    }}
                />
                {
                    isOwnProfile ? (
                        <div className="w-full h-full max-w-[100rem] m-auto relative">
                            <Button
                                onPress={onPress}
                                className="z-10 w-fit absolute bottom-6 right-12 shadow-none"
                                startContent={updateProfileSwrMutation.isMutating? "" : <ImageUpIcon size={24} strokeWidth={3/2} />}
                                isLoading={updateProfileSwrMutation.isMutating}
                                isDisabled={updateProfileSwrMutation.isMutating}
                            >
                                {
                                    updateProfileSwrMutation.isMutating? "Uploading" : "Upload cover photo"
                                }
                            </Button>
                        </div>
                    ) : null
                }
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
        </>
    )
}
