import React from "react"

import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import {
    MoreHorizontal,
} from "lucide-react"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { className } = props

    return (
        <>
            <Dropdown
                placement="top-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Button className={`${className} bg-content1 shadow-none`} isIconOnly>
                        <MoreHorizontal size={20} strokeWidth={3/2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <div/>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
