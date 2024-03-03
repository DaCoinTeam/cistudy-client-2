import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { GoogleIcon } from "./GoogleIcon"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth, verifyGoogleAccessToken } from "@services"
import { RootContext } from "../../../../../_hooks"

export const SignInByGoogleIcon = () => {
    const provider = new GoogleAuthProvider()

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate } = profileSwr


    const onPress = async () => {
        const credential = await signInWithPopup(firebaseAuth, provider)
        const token = await credential.user.getIdToken()
        const response = await verifyGoogleAccessToken({ token })
        await mutate(response)
    }
  
    return (
        <Button onPress={onPress} isIconOnly variant="flat" className="w-12 h-12">
            <GoogleIcon size={40} />
        </Button>
    )
}