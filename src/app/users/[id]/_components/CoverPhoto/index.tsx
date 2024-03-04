import React, { useContext, useRef } from "react"
import { UserDetailsContext } from "../../_hooks"
import { Button, Image } from "@nextui-org/react"
import { getAssetUrl, updateProfile } from "@services"
import { RootContext } from "../../../../_hooks"
import { ImageUpIcon } from "lucide-react"

interface CoverPhotoProps {
  className?: string;
}
export const CoverPhoto = (props: CoverPhotoProps) => {
    console.log("Recalled")
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user, mutate } = userSwr

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile, mutate: rootMutate } = profileSwr

    const isOwnProfile = user?.userId === profile?.userId

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        await updateProfile({
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
                    src={getAssetUrl(user?.coverPhotoId, { forceUpdate: true })}
                    className="w-full"
                    classNames={{
                        wrapper: "w-full !max-w-full absolute",
                    }}
                />
                {
                    isOwnProfile ? (
                        <div className="w-full h-full max-w-[1280px] m-auto relative">
                            <Button
                                onPress={onPress}
                                className="bg-content1 z-10 w-fit absolute bottom-6 right-6 border shadow-none"
                                startContent={<ImageUpIcon size={24} strokeWidth={3/2} />}
                            >
            Upload cover photo
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
