"use client"
import React, { useContext } from "react"
import { ManageContext } from "../ManageProviders"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { Key, getSetValues } from "@common"
import { PanelSelected } from "../useManageReducer"

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { state, dispatch } = useContext(ManageContext)!
    const { panelSelected } = state

    const keyToPanelSelected: Record<Key, PanelSelected> = {
        information: PanelSelected.Information,
        curriculum: PanelSelected.Curriculum,
    }
    const panelSelectedToKey: Record<PanelSelected, Key> = {
        [PanelSelected.Information]: "information",
        [PanelSelected.Curriculum]: "curriculum",
    }

    const selectedKeys = new Set([panelSelectedToKey[panelSelected]])

    const onSelectionChange = (selection: Selection) => {
        if (typeof selection === "string") return
        const value = getSetValues(selection).at(0)
        
        if (!value) return 
        const panelSelected = keyToPanelSelected[value]
        dispatch({
            type: "SET_PANEL_SELECTED",
            payload: panelSelected,
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
