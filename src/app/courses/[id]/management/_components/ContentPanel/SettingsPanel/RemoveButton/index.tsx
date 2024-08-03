import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { ManagementContext } from "../../../../_hooks"
import { VerifyStatus } from "@common"

export const RemoveButton = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr
    const { verifyStatus } = { ...data }
    
    return (
        <div>
            <Button
                isDisabled={verifyStatus === VerifyStatus.Approved || verifyStatus === VerifyStatus.Pending}
                color="danger"
                className="w-fit"
                variant="bordered"
            >
      Delete
            </Button>
        </div>
    )
}
