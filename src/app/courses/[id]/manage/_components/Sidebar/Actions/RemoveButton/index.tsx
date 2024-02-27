import { Button } from "@nextui-org/react"
import { XOctagonIcon } from "lucide-react"
import React from "react"

export const RemoveButton = () => {
    return (
        <Button size="lg" color="danger" variant="flat" fullWidth startContent={<XOctagonIcon size={16} />}>
      Delete
        </Button>
    )
}
