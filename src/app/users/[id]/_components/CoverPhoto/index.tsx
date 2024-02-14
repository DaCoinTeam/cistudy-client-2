import React, { useContext, useRef } from "react"
import { UserDetailsContext } from "../../_hooks"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { Button, Image } from "@nextui-org/react"
import { getAssetUrl, updateProfile } from "@services"
import { PhotoIcon } from "@heroicons/react/24/solid"
import { RootContext } from "../../../../_hooks"
import { isErrorResponse } from "@common"

interface CoverPhotoProps {
  className?: string;
}
export const CoverPhoto = (props: CoverPhotoProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { state, functions } = useContext(UserDetailsContext)!
    const { fetchAndSetUser } = functions
    const { user } = state
    const { functions: rootFunctions } = useContext(RootContext)!
    const { fetchAndSetProfile } = rootFunctions

    const profile = useSelector((state: RootState) => state.auth.profile)

    const isOwnProfile = user?.userId === profile?.userId

    const onClick = () => {
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
                className={`${props.className} absolute grid content-center overflow-hidden`}
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
                            onClick={onClick}
                            className="z-10 w-fit"
                            startContent={<PhotoIcon className="w-6 h-6" />}
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
