"use client"
import React, { useContext } from "react"
import { ManageContext } from "../../_hooks/ManageProviders"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { getSetValues } from "@common"
import { PanelSelected } from "../../_hooks"

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { state, dispatch } = useContext(ManageContext)!
    const { panelSelected } = state

    const selectedKeys = new Set([panelSelected])

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
        <div className={`${props.className}`}>
            <Listbox
                aria-label="Sidebar"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectionChange}
            >
                <ListboxItem key="information">Information</ListboxItem>
                <ListboxItem key="curriculum">Curriculum</ListboxItem>
            </Listbox>
        </div>
    )
}
