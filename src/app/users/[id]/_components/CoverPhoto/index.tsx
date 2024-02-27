import React, { useContext, useRef } from "react"
import { UserDetailsContext } from "../../_hooks"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { Button, Image } from "@nextui-org/react"
import { getAssetUrl, updateProfile } from "@services"
import { RootContext } from "../../../../_hooks"
import { isErrorResponse } from "@common"
import { ImageUpIcon } from "lucide-react"

interface CoverPhotoProps {
  className?: string;
}
export const CoverPhoto = (props: CoverPhotoProps) => {
    const { className } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { state, functions } = useContext(UserDetailsContext)!
    const { fetchAndSetUser } = functions
    const { user } = state
    const { functions: rootFunctions } = useContext(RootContext)!
    const { fetchAndSetProfile } = rootFunctions

    const profile = useSelector((state: RootState) => state.auth.profile)

    const isOwnProfile = user?.userId === profile?.userId

    const onPress = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files === null) return
        const file = files.item(0)
        if (file === null) return

        const response = await updateProfile({
            data: {
                coverPhotoIndex: 0
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
            <div
                className={`${className} absolute grid content-center overflow-hidden`}
            >
                <Image
                    alt="coverPhoto"
                    radius="none"
                    src={getAssetUrl(user?.coverPhotoId)}
                    className="w-full"
                    classNames={{
                        wrapper: "w-full !max-w-full absolute",
                    }}
                />
                {
                    isOwnProfile ? (
                        <Button
                            onPress={onPress}
                            className="z-10 w-fit bg-content2"
                            startContent={<ImageUpIcon size={24} strokeWidth={4/3} />}
                        >
            Upload cover photo
                        </Button>
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
