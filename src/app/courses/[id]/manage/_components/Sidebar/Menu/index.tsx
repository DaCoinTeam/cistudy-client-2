"use client"
import React, { useContext } from "react"
import { ManageContext } from "../../../_hooks/ManageProviders"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { getSetValues } from "@common"
import { PanelSelected } from "../../../_hooks"
import { InfoIcon, ListChecksIcon } from "lucide-react"

interface MenuProps {
  className?: string;
}

export const Menu = (props: MenuProps) => {
    const { className } = props

    const { state, dispatch } = useContext(ManageContext)!
    const { panelSelected } = state

    const selectedKeys = new Set([panelSelected])

    const isSelected = (panelSelected: PanelSelected) => Array.from(selectedKeys).includes(panelSelected) ? "!text-primary !bg-primary/20 rounded-large" : ""

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
                        base: `!py-2 items-center rounded-none !bg-transparent ${isSelected(PanelSelected.Details)}`
                    }}
                    className="gap-4"
                    startContent={<InfoIcon size={24} strokeWidth={4/3}/>}
                    key="details"
                >
          Details
                </ListboxItem>
                <ListboxItem
                    classNames={{
                        title: "text-base",
                        base: `!py-2 rounded-none !bg-transparent ${isSelected(PanelSelected.Curriculum)}`,
                    }}
                    className="gap-4"
                    startContent={<ListChecksIcon size={24} strokeWidth={4/3} />}
                    key="curriculum"
                >
          Curriculum
                </ListboxItem>
            </Listbox>    
        </div>        
    )
}
