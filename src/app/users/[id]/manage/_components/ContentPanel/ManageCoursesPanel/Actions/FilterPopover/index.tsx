"use client"
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react"
import { FilterIcon } from "lucide-react"
import React from "react"

export const FilterPopover = () => {
    return (
        <Popover placement="right">
            <PopoverTrigger>
                <Button className="bg-content2" startContent={<FilterIcon size={20} strokeWidth={4 / 3} />}>
          Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Popover Content</div>
                    <div className="text-tiny">This is the popover content</div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
