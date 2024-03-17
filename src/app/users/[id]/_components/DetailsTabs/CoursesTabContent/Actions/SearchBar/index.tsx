import { Input } from "@nextui-org/react"
import { SearchIcon } from "lucide-react"
import React from "react"

interface SearchBarProps {
  className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
    const { className } = props
    return (
        <Input
            variant="bordered"
            classNames={{
                inputWrapper: "!border !border-divider bg-transparent shadow-none"
            }} 
            className={`${className ?? ""} w-60`}
            placeholder="Search"
            label=""
            labelPlacement="outside"
            startContent={<SearchIcon size={20} strokeWidth={3/2} />}
        />
    )
}
