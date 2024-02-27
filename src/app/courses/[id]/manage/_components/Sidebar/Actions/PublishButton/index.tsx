import { Button } from "@nextui-org/react"
import { ArrowBigUpDashIcon } from "lucide-react"
import React from "react"

export const PublishButton = () => {
    return (
        <Button color="primary" size="lg" fullWidth startContent={<ArrowBigUpDashIcon size={24} strokeWidth={4/3}/>}> Publish </Button>
    )
}