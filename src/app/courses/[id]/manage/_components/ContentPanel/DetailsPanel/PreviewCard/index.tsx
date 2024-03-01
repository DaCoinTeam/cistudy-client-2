import { CardBody, Card, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { ManageContext } from "../../../../_hooks"
import { VideoPlayer } from "../../../../../../../_shared"
import { Actions } from "./Actions"

interface PreviewCardProps {
  className?: string;
}

export const PreviewCard = (props: PreviewCardProps) => {
    const { className } = props

    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    return (
        <Card shadow="none" className={`${className} border border-divider`}>
            <CardHeader className="p-0"> 
                <VideoPlayer className="rounded-b-none" src={getAssetUrl(courseManaged?.previewVideoId)} />
            </CardHeader>
            <CardBody className="gap-4 p-6">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold leading-none">Preview</div> 
                    <Actions/>
                </div>
            </CardBody>
        </Card>
    )
}
