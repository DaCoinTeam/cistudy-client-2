import { getAvatarUrl, updateProfile } from "@services"
import { useContext, useRef } from "react"
import { AccountDetailsContext } from "../../_hooks"
import { RootContext } from "../../../../_hooks"
import { Avatar, Button } from "@nextui-org/react"
import { HiCamera } from "react-icons/hi"

interface AccountAvatarProps {
  className?: string;
}

export const AccountAvatar = (props: AccountAvatarProps) => {
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account, mutate } = accountSwr
    const { accountId, avatarId, avatarUrl, kind } = {...account}

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const isOwnProfile = accountId === profile?.accountId

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
                avatarIndex: 0,
            },
            files: [file],
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
                            base: "ring-0",
                        }}
                        className="w-44 h-44"
                        src={getAvatarUrl({
                            avatarId,
                            avatarUrl,
                            kind,
                        })}
                    />
                    {isOwnProfile ? (
                        <Button
                            onPress={onPress}
                            radius="full"
                            isIconOnly
                            className="bg-content2 absolute bottom-0 right-0"
                        >
                            <HiCamera height={20} width={20} size={30} />
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
