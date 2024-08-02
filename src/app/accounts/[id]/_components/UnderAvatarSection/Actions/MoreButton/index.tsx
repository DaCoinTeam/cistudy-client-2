import React, { useContext, useRef } from "react"

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react"
import {
    MoreHorizontal,
} from "lucide-react"
import { FlagIcon } from "@heroicons/react/24/outline"
import { ReportAccountModalRef, ReportAccountModalRefSelectors } from "./ReportAccountModalRef"
import { AccountDetailsContext } from "../../../../_hooks"
import { RootContext } from "../../../../../../_hooks"

interface ManageThumbnailButtonProps {
  className?: string;
}

export const MoreButton = (props: ManageThumbnailButtonProps) => {
    const { className } = props
    const {swrs: rootSwrs} = useContext(RootContext)!
    const {accountId: rootAccountId} = {...rootSwrs?.profileSwr?.data}
    const {swrs} = useContext(AccountDetailsContext)!
    const {accountId} = {...swrs?.accountSwr?.data}
    const reportAccountModalRef = useRef<ReportAccountModalRefSelectors | null>(null)
    const onReportAccountModalOpen = () => reportAccountModalRef.current?.onOpen()

    return (
        <>
            <Dropdown
                placement="top-start"
                backdrop="blur"
                classNames={{
                    content: "text-center",
                }}
            >
                <DropdownTrigger>
                    <Button className={`${className} bg-content2 shadow-none`} isIconOnly>
                        <MoreHorizontal size={20} strokeWidth={3/2} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    {rootAccountId !== accountId ? (
                        <DropdownItem
                            color='danger'
                            startContent={<FlagIcon className='h-5 w-5' />}
                            onPress={onReportAccountModalOpen}
                            key='report'
                            className='text-danger'
                        >
              Report Account
                        </DropdownItem>
                    ): (<DropdownItem className="hidden"/>)}
                    
                </DropdownMenu>
            </Dropdown>
            <div className='hidden'>
                <ReportAccountModalRef ref={reportAccountModalRef} />
            </div>

        </>
    )
}
