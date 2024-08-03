"use client"
import { Chip, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { PublishButton } from "./PublishButton"
import { VerifyStatus } from "@common"
import { ManagementContext } from "../../../_hooks"
import { RemoveButton } from "./RemoveButton"

interface SettingsPanelProps {
  className?: string;
}
export const SettingsPanel = (props: SettingsPanelProps) => {
    const { className } = props
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr
    const { verifyStatus } = { ...data }

    const renderStatus = () => {
        const map: Record<VerifyStatus, JSX.Element> = {
            [VerifyStatus.Draft]: (
                <Chip size="lg" color="default" variant="flat">
          Draft
                </Chip>
            ),
            [VerifyStatus.Pending]: (
                <Chip size="lg" color="warning" variant="flat">
          Pending
                </Chip>
            ),
            [VerifyStatus.Approved]: (
                <Chip size="lg" color="success" variant="flat">

          Approved
                </Chip>
            ),
            [VerifyStatus.Rejected]: (
                <Chip size="lg" color="danger" variant="flat">
          Rejected
                </Chip>
            ),
        }
        return map[verifyStatus ?? VerifyStatus.Draft]
    }

    return (
        <div className={`${className}`}>
            <div className="text-2xl font-semibold"> Actions </div>
            <Spacer y={6} />
            <div>{renderStatus()}</div>
            <Spacer y={6} />
            <div>
                <div className="grid gap-4">
                    <div>
            If you find that the quality and content of your courses meet the
            necessary standards and expectations, you can proceed with
            submitting them for review to ensure they are evaluated and approved
            accordingly. 
                        <br/>
            If your course is not accepted upon initial review, you have the opportunity to make necessary revisions and resubmit it for consideration.
                    </div>
                    <PublishButton />
                </div>
            </div>
            <Spacer y={6}/>
            <div>
                <div className="grid gap-4">
                    <div>You are permitted to delete your course only under two conditions: if it is still in draft status or if it has been formally rejected.</div>
                    <RemoveButton/>
                </div>
            </div>
        </div>
    )
}
