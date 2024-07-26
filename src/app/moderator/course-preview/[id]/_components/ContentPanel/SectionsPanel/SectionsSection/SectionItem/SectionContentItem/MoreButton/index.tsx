import React, { useRef } from "react"

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
} from "@nextui-org/react"
import {
    Eye,
    MoreVerticalIcon,
} from "lucide-react"
import { EditModalRef, EditModalRefSelectors } from "./EditModalRef"

export const MoreButton = () => {

    const editModalRef = useRef<EditModalRefSelectors | null>(null)
    const onEditModalOpen = () => editModalRef.current?.onOpen()

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
                    <Link color="foreground">
                        <MoreVerticalIcon className="w-5 h-5" strokeWidth={3/2}/>
                    </Link>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem
                        startContent={<Eye size={20} strokeWidth={3/2} />}
                        onPress={onEditModalOpen}
                        key="view"
                    >
            View
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div className="hidden">
                <EditModalRef ref={editModalRef} />
            </div>       
        </>
    )
}
