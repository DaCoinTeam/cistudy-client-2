import React from "react"

import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import {
    MoreVertical,
} from "lucide-react"

interface SectionItemMoreButtonProps {
  className?: string;
}

export const SectionItemMoreButton = (props: SectionItemMoreButtonProps) => {
    const { className } = props

    return (
        <Dropdown
            placement="top-start"
            backdrop="blur"
            classNames={{
                content: "text-center",
            }}
        >
            <DropdownTrigger>
                <Button className={`${className} bg-transparent`} isIconOnly>
                    <MoreVertical size={20} strokeWidth={4/3} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <div/>
            </DropdownMenu>
        </Dropdown>
    )
}
