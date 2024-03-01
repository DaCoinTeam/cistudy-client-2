import { Button } from "@nextui-org/react"
import { ArrowUpFromLineIcon } from "lucide-react"
import React from "react"

export const PublishButton = () => {
    return (
        <Button color="primary" className="text-secondary-foreground font-bold" size="lg" fullWidth startContent={<ArrowUpFromLineIcon size={24} strokeWidth={5/3}/>}> Publish </Button>
    )
}