"use client"
import { getSetValues } from "@common"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { BookOpenIcon } from "lucide-react"
import { useContext } from "react"
import { ManagementContext, PanelSelected } from "../../../_hooks"

interface MenuProps {
  className?: string;
}

export const Menu = (props: MenuProps) => {
    const { className } = props

    const { reducer } = useContext(ManagementContext)!
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
        // {
        //     startContent: (
        //         <RssIcon size={24} strokeWidth={3/2}/>
        //     ),
        //     key: "followers",
        //     content: "Followers",
        //     panelSelected: PanelSelected.Followers,
        // },
        {
            startContent: (
                <BookOpenIcon size={24} strokeWidth={3/2} />
            ),
            key: "courses",
            content: "Courses",
            panelSelected: PanelSelected.Courses,
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
