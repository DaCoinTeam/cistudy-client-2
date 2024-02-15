import { Button } from "@nextui-org/react"
import React from "react"
import { FacebookIcon } from "./FacebookIcon"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseAuth, verifyGoogleAccessToken } from "@services"
import { AppDispatch, setProfile } from "@redux"
import { useDispatch } from "react-redux"
import { isErrorResponse } from "@common"

export const SignInByFacebookIcon = () => {
    const provider = new GoogleAuthProvider()

    const dispatch : AppDispatch = useDispatch()

    const onPress = async () => {
        const credential = await signInWithPopup(firebaseAuth, provider)
        const token = await credential.user.getIdToken()
        const response = await verifyGoogleAccessToken({ token })
        if (!isErrorResponse(response)){
            dispatch(setProfile(response))
        } else {
            console.log(response)
        }
    }
  
    return (
        <Button onPress={onPress} isIconOnly variant="flat" className="w-12 h-12">
            <FacebookIcon size={40} />
        </Button>
    )
}