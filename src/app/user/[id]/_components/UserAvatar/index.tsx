import { getAssetUrl, updateAvatar } from "@services"
import { isErrorResponse } from "@common"
import { useContext, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { UserDetailsContext } from "../../_hooks"
import { RootContext } from "../../../../_hooks"
import { Button } from "@nextui-org/react"
import { CameraIcon } from "@heroicons/react/24/solid"
import { Avatar } from "@nextui-org/react"

interface IUserAvatarProps {
    className?: string
}

export const UserAvatar = (props: IUserAvatarProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const { state } = useContext(UserDetailsContext)!
    const { user } = state
    const { functions } = useContext(RootContext)!
    const { fetchAndSetProfile } = functions

    const profile = useSelector(
        (state: RootState) => state.auth.profile
    )

    const isOwnProfile = user?.avatarId === profile?.avatarId

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

        const response = await updateAvatar(file)
        if (!isErrorResponse(response)){
            await fetchAndSetProfile()
        } else {
            console.log(response)
        }
    }

    return (
        <div className={`${props.className} flex gap-6 items-end`}>
            <div className="relative">
                <Avatar isBordered className="w-44 h-44" src={getAssetUrl(user?.avatarId)}/>
                {
                    isOwnProfile ? <Button onClick={onClick} radius="full" isIconOnly className="absolute bottom-0 right-0">
                        <CameraIcon className="w-6 h-6" />
                    </Button> : null
                }         
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        </div>
    )
}
