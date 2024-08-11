"use client"
import React, { useContext } from "react"
import { AdminContext, PanelSelected } from "../../../_hooks"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { getSetValues } from "@common"
import { BanknoteIcon, BookOpenIcon } from "lucide-react"
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline"

interface MenuProps {
  className?: string;
}

export const Menu = (props: MenuProps) => {
    const { className } = props

    const { reducer } = useContext(AdminContext)!
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
                <UserCircleIcon height={24} width={24}/>
            ),
            key: "accounts",
            content: "Accounts",
            panelSelected: PanelSelected.Accounts,
        },
        {
            startContent: (
                <BookOpenIcon size={24} strokeWidth={3/2} />
            ),
            key: "courses",
            content: "Courses",
            panelSelected: PanelSelected.Courses,
        },
        {
            startContent: (
                <BanknoteIcon size={24} strokeWidth={3/2} />
            ),
            key: "transactions",
            content: "Transactions",
            panelSelected: PanelSelected.Transactions,
        },
        {
            startContent: (
                <BellIcon className="w-5 h-5" strokeWidth={3/2} />
            ),
            key: "notifications",
            content: "Notifications",
            panelSelected: PanelSelected.Notifications,
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
