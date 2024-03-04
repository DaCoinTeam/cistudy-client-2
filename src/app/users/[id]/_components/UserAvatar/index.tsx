import { getAssetUrl, updateProfile } from "@services"
import { useContext, useRef } from "react"
import { UserDetailsContext } from "../../_hooks"
import { RootContext } from "../../../../_hooks"
import { CameraIcon } from "@heroicons/react/24/solid"
import { Avatar, Button } from "@nextui-org/react"

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = (props: UserAvatarProps) => {
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user, mutate } = userSwr

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

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
                avatarIndex: 0
            },
            files: [file]
        })

        await mutate()
    }

    return (
        <>
            <div className={`${className} flex gap-6 items-end`}>
                <div className="relative">
                    <Avatar
                        isBordered
                        classNames={{
                            base: "ring-0"
                        }}
                        className="w-44 h-44"
                        src={getAssetUrl(user?.avatarId, { forceUpdate: true })}
                    />
                    {isOwnProfile ? (
                        <Button
                            onPress={onPress}
                            radius="full"
                            isIconOnly
                            className="bg-content2 absolute bottom-0 right-0"
                        >
                            <CameraIcon height={24} width={24} />
                        </Button>
                    ) : null}
                </div>
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
