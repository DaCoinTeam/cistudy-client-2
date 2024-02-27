"use client"
import React, { useContext } from "react"
import { ManageContext } from "../../../_hooks/ManageProviders"
import { Card, CardBody, CardHeader, Listbox, ListboxItem, Selection } from "@nextui-org/react"
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
        <Card className={`${className}`}>
            <CardHeader className="p-4 pb-0 text-xl font-semibold">
                Menu
            </CardHeader>
            <CardBody className="p-4">
                <Listbox
                    color="primary"
                    hideSelectedIcon
                    aria-label="Menu"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={onSelectionChange}
                    autoFocus={true}
                    className="p-0"
                    classNames={
                        {
                            list: "gap-2"
                        }
                    }
                >
                    <ListboxItem
                        classNames={{
                            title: "text-base",
                        }}
                        className="gap-3"
                        startContent={<InfoIcon size={16} />}
                        key="details"
                    >
          Details
                    </ListboxItem>
                    <ListboxItem
                        classNames={{
                            title: "text-base",
                        }}
                        className="gap-3"
                        startContent={<ListChecksIcon size={16} />}
                        key="curriculum"
                    >
          Curriculum
                    </ListboxItem>
                </Listbox>            
            </CardBody>
        </Card>
    )
}
