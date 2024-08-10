"use client"
import { Link } from "@nextui-org/react"
import React, { useRef } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { SelectSectionTypeModal, SelectSectionTypeModalRef } from "./SelectSectionTypeModal"
import { SectionEntity } from "@common"

export const AddSectionContentItem = ({section} : {section: SectionEntity}) => {
    const selectSectionTypeModalRef = useRef<SelectSectionTypeModalRef>(null)

    const onPress = async () => {
        selectSectionTypeModalRef.current?.onOpen()
    }

    return (
        <div>
            <Link
                as="button"
                className="w-full grid place-content-center h-10"
                onPress={onPress}
                color="primary"
            >
                <div className="gap-2 flex">
                    <PlusIcon width={20} height={20}/>
                    <div className="text-sm">Add Section Content</div>
                </div>
    
            </Link>
            <SelectSectionTypeModal section={section} ref={selectSectionTypeModalRef} />
        </div>
    )
}
