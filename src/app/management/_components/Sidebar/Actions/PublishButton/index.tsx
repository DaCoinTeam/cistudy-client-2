import { Button } from "@nextui-org/react"
import { ArrowUpFromLineIcon } from "lucide-react"
import React from "react"

export const PublishButton = () => {
    return (
        <Button
            color="primary"
            size="lg"
            fullWidth
            startContent={<ArrowUpFromLineIcon size={24} strokeWidth={3/2} />}
        >
      Publish
        </Button>
    )
}
