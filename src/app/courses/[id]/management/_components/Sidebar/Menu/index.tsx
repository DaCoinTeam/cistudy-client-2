"use client"
import { getSetValues } from "@common"
import { Cog6ToothIcon, CurrencyDollarIcon, ListBulletIcon } from "@heroicons/react/24/outline"
import { Listbox, ListboxItem, Selection } from "@nextui-org/react"
import { Goal, ScanEyeIcon, BarChart3Icon, ActivityIcon } from "lucide-react"
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
        {
            startContent: <Cog6ToothIcon width={24} height={24} />,
            key: "general",
            content: "General",
            panelSelected: PanelSelected.General,
        },
        {
            startContent: <ScanEyeIcon size={24} strokeWidth={3 / 2} />,
            key: "preview",
            content: "Preview Video",
            panelSelected: PanelSelected.Preview,
        },
        {
            startContent: <Goal size={24} strokeWidth={3 / 2} />,
            key: "target",
            content: "Target",
            panelSelected: PanelSelected.Target
        },
        {
            startContent: <ListBulletIcon width={24} height={24} />,
            key: "sections",
            content: "Sections",
            panelSelected: PanelSelected.Sections,
        },
        {
            startContent: <CurrencyDollarIcon  width={24} height={24} />,
            key: "price",
            content: "Price",
            panelSelected: PanelSelected.Price,
        },
        {
            startContent: <ActivityIcon width={24} height={24} strokeWidth={3/2}/>,
            key: "actions",
            content: "Actions",
            panelSelected: PanelSelected.Settings,
        },
        {
            startContent: <BarChart3Icon width={24} height={24} />,
            key: "analytics",
            content: "Analytics",
            panelSelected: PanelSelected.Analytics,
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
