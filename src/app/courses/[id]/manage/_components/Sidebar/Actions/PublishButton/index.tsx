import { Button } from "@nextui-org/react"
import { ArrowBigUpDashIcon } from "lucide-react"
import React from "react"

export const PublishButton = () => {
    return (
        <Button color="primary" fullWidth startContent={<ArrowBigUpDashIcon size={14}/>}> Publish </Button>
    )
}