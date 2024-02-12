import React, { useContext } from "react"
import { UserDetailsContext } from "../../_hooks"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { Image } from "@nextui-org/react"
import { getAssetUrl } from "@services"

interface ICoverPhotoProps {
  className?: string;
}
export const CoverPhoto = (props: ICoverPhotoProps) => {
    const { state } = useContext(UserDetailsContext)!
    const { user } = state
    const profile = useSelector((state: RootState) => state.auth.profile)
    const isOwnProfile = user?.userId === profile?.userId
    return (
        <div className={`${props.className} absolute grid content-center overflow-hidden`}>
            {isOwnProfile ? (
                // <Image
                //     alt="coverPhoto"
                //     radius="none"
                //     src={getAssetUrl(user?.coverPhotoId)}
                //     className="w-full h-full"
                // />
                <div/>
            ) : (
                <Image
                    alt="coverPhoto"
                    radius="none"
                    src={getAssetUrl(user?.coverPhotoId)}
                    className="w-full"
                    classNames={
                        {
                            wrapper: "w-full !max-w-full absolute"
                        }
                    }
                />
            )}
        </div>
 
    )
}
