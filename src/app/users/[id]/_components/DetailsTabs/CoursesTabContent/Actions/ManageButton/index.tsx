"use client"
import { Button } from "@nextui-org/react"
import { Settings2Icon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

export const ManageButton = () => {
    const router = useRouter()
    const path = usePathname()

    const onPress = () => router.push(`${path}/manage`)
    return (
        <Button
            className="bg-content2"
            onPress={onPress}
            startContent={<Settings2Icon size={21} strokeWidth={4 / 3} />}
        >
      Manage
        </Button>
    )
}
