"use client"
import { Button } from "@nextui-org/react"
import { Settings2Icon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

interface ManageButtonProps {
    className?: string
}
export const ManageButton = (props: ManageButtonProps) => {
    const { className } = props 

    const router = useRouter()
    const path = usePathname()

    const onPress = () => router.push(`${path}/manage`)
    return (
        <Button
            className={`${className} bg-content2`}
            onPress={onPress}
            startContent={<Settings2Icon size={20} strokeWidth={3/2} />}
        >
      Manage
        </Button>
    )
}
