"use client"
import React, { useContext } from "react"
import { HomeContext } from "../../../_hooks"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { getSetValues } from "@common"
import { PanelSelected } from "../../../_hooks"
import {
    ChatBubbleLeftRightIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline"

interface MenuProps {
  className?: string;
}

export const Menu = (props: MenuProps) => {
    const { className } = props

    const { reducer } = useContext(HomeContext)!
    const [state, dispatch] = reducer
    const { panelSelected } = state

    const selectedKeys = new Set([panelSelected])

    const isSelected = (panelSelected: PanelSelected) =>
        Array.from(selectedKeys).includes(panelSelected)
            ? "!bg-primary/20 !text-primary rounded-medium"
            : ""

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

    const items = [
        {
            startContent: (
                <ListBulletIcon width={24} height={24} strokeWidth={3 / 2} />
            ),
            key: "sections",
            content: "Sections",
            panelSelected: PanelSelected.Sections,
        },
        {
            startContent: (
                <ChatBubbleLeftRightIcon width={24} height={24} strokeWidth={3 / 2} />
            ),
            key: "forum",
            content: "Forum",
            panelSelected: PanelSelected.Forum,
        },
    ]

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
                classNames={{
                    list: "gap-0",
                }}
            >
                {items.map(({ key, startContent, panelSelected, content }) => (
                    <ListboxItem
                        classNames={{
                            title: "text-base",
                            base: `items-center rounded-none text-foreground-400 !p-3 !bg-transparent ${isSelected(
                                panelSelected
                            )}`,
                        }}
                        startContent={startContent}
                        key={key}
                    >
                        {content}
                    </ListboxItem>
                ))}
            </Listbox>
        </div>
    )
}
