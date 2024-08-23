"use client"
import { resetPassword } from "@services"
import {Image} from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import useSWRMutation from "swr/mutation"
import { RESET_PASSWORD } from "@config"

const Page = () => {
    const searchParams = useSearchParams()

    const ResetPasswordSwrMutation = useSWRMutation(
        "RESET_PASSWORD",
        async () => {
            return await resetPassword({
                token: searchParams.get("token") ?? "",
            })
        }
    )

    useEffect(() => {
        const handleEffect = async () => {
            await ResetPasswordSwrMutation.trigger()
        }
        handleEffect()
    }, [])

    return (
        <div className="w-screen h-screen grid place-items-center">
            <Image src={RESET_PASSWORD} width={400} height={400} alt="Reset" />
            <div className="p-4 bg-success/20 rounded-medium">
                <div className="text-lg font-semibold">Password has been reset!</div>
                <div className="text-base">You will receive a new password within minutes.</div>
            </div>
        </div>
    )
}
export default Page
