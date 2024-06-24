import React from "react"
import { VerifyStatus } from "@common"
import { Select, SelectItem } from "@nextui-org/react"

interface StatusSelectProps {
    className?: string
}

export const StatusSelect = (props: StatusSelectProps) => {
    const { className } = props
    const statuses = [
        {   
            label: "Pending",
            value: VerifyStatus.Pending
        },
        {
            label: "Approved",
            value: VerifyStatus.Approved
        },
        {
            label: "Rejected",
            value: VerifyStatus.Rejected
        }
    ]
    return (
        <Select 
            defaultSelectedKeys={[VerifyStatus.Pending]}
            labelPlacement="outside"
            label="" 
            className={`${className}`} 
        >
            {statuses.map(({label, value}) => (
                <SelectItem key={value} value={value}>
                    {label}
                </SelectItem>
            ))}
        </Select>
    )
  
}