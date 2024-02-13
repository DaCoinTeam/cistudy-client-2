import { getAssetUrl, updateProfile } from "@services"
import { isErrorResponse } from "@common"
import { useContext, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { UserDetailsContext } from "../../_hooks"
import { RootContext } from "../../../../_hooks"
import { CameraIcon } from "@heroicons/react/24/solid"
import { Avatar, Button } from "@nextui-org/react"

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = (props: UserAvatarProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { state, functions } = useContext(UserDetailsContext)!
    const { fetchAndSetUser } = functions
    const { user } = state
    const { functions: rootFunctions } = useContext(RootContext)!
    const { fetchAndSetProfile } = rootFunctions

    const profile = useSelector((state: RootState) => state.auth.profile)

    const isOwnProfile = user?.userId === profile?.userId

    const onClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        const response = await updateProfile({
            data: {
                avatarIndex: 0
            },
            files: [file]
        })
        
        if (!isErrorResponse(response)) {
            await fetchAndSetUser()
            await fetchAndSetProfile()
        } else {
            console.log(response)
        }
    }

    return (
        <>
            <div className={`${props.className} flex gap-6 items-end`}>
                <div className="relative">
                    <Avatar
                        isBordered
                        className="w-44 h-44"
                        src={getAssetUrl(user?.avatarId)}
                    />
                    {isOwnProfile ? (
                        <Button
                            onClick={onClick}
                            radius="full"
                            isIconOnly
                            className="absolute bottom-0 right-0"
                        >
                            <CameraIcon className="w-6 h-6" />
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
