import { Button } from "@nextui-org/react"
import { ArrowBigUpDashIcon } from "lucide-react"
import React from "react"

export const PublishButton = () => {
    return (
        <Button size="lg" color="primary" fullWidth startContent={<ArrowBigUpDashIcon size={16}/>}> Publish </Button>
    )
}