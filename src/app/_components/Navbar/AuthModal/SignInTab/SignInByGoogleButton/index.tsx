import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { GoogleIcon } from "./GoogleIcon"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth, verifyGoogleAccessToken } from "@services"
import { RootContext } from "../../../../../_hooks"
import { NavbarContext } from "../../../NavbarProviders"

export const SignInByGoogleIcon = () => {
    const provider = new GoogleAuthProvider()

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate } = profileSwr

    const { disclosures } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onClose } = authModalDisclosure

    const onPress = async () => {
       
         
        const credential = await signInWithPopup(firebaseAuth, provider)
        const token = await credential.user.getIdToken()
        await verifyGoogleAccessToken(
            { params: { token } },
            {
                username: true,
                email: true,
                avatarUrl: true
            }
        )
        await mutate()
        onClose()
    }

    return (
        <Button onPress={onPress} isIconOnly variant="flat" className="w-12 h-12">
            <GoogleIcon size={40} />
        </Button>
    )
}
