"use client"
import React, { useContext } from "react"
import { ManagementContext } from "../../../_hooks/ManagementProviders"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { getSetValues } from "@common"
import { PanelSelected } from "../../../_hooks"
import { BookAIcon, ListCollapseIcon } from "lucide-react"

interface MenuProps {
  className?: string;
}

export const Menu = (props: MenuProps) => {
    const { className } = props

    const { state, dispatch } = useContext(ManagementContext)!
    const { panelSelected } = state

    const selectedKeys = new Set([panelSelected])

    const isSelected = (panelSelected: PanelSelected) => Array.from(selectedKeys).includes(panelSelected) ? "!text-primary rounded-large" : ""

    const onSelectionChange = (selection: Selection) => {
        if (typeof selection === "string") return
        const value = getSetValues(selection).at(0)

        if (!value) return
        const panelSelected = value
        dispatch({
            type: "SET_PANEL_SELECTED",
            payload: panelSelected as PanelSelected,
        })
    }

    return (
        <div className={`${className}`}>
            <Listbox
                hideSelectedIcon
                aria-label="Menu"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectionChange}
                autoFocus={true}
                className="p-0"
            >
                <ListboxItem
                    classNames={{
                        title: "text-base",
                        base: `items-center px-0 rounded-none text-foreground-500 !bg-transparent ${isSelected(PanelSelected.Details)}`
                    }}
                    startContent={<ListCollapseIcon size={24} strokeWidth={4/3}/>}
                    key="details"
                >
          Details
                </ListboxItem>
                <ListboxItem
                    classNames={{
                        title: "text-base",
                        base: `rounded-none px-0 !bg-transparent text-foreground-500 ${isSelected(PanelSelected.Curriculum)}`,
                    }}
                    startContent={<BookAIcon size={24} strokeWidth={4/3} />}
                    key="curriculum"
                >
          Curriculum
                </ListboxItem>
            </Listbox>    
        </div>        
    )
}
