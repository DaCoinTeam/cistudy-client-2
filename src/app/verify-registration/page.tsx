"use client"
import React, { useContext } from "react"
import { VerifyRegistrationContext } from "./_hooks"
import { Button, Image, Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"

const Page = () => {
    const { swrs } = useContext(VerifyRegistrationContext)!
    const { verifyRegistrationSwrMutation } = swrs
    const { isMutating } = verifyRegistrationSwrMutation
    const router = useRouter()
    return (
        <div className="w-screen h-screen grid place-items-center">
            {isMutating ? (<Spinner size="lg" label="Validating" />) : (<div className="grid place-items-center gap-2">
                <Image className="w-[400px]" removeWrapper src="congrats.png" alt="congrats"/>
                <div className="text-4xl font-bold">Congratulations!</div>
                <div>You have verified your account successfully!</div>
                <Button color="primary" onPress={() => router.push("/")}> Continue </Button>
            </div>)}
        </div>
    )
}
export default Page
