import { CardBody, Card, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { ManageContext } from "../../../../_hooks"
import { MoreButton } from "./MoreButton"
import { VideoPlayer } from "../../../../../../../_shared"
import { EditPreviewVideoButton } from "./EditPreviewVideoButton"

interface PreviewCardProps {
  className?: string;
}

export const PreviewCard = (props: PreviewCardProps) => {
    const { className } = props

    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    return (
        <Card shadow="none" className={`${className} border border-divider`}>
            <CardHeader className="p-4 pb-0 text-xl font-semibold"> Preview </CardHeader>
            <CardBody className="gap-4 p-4">
                <VideoPlayer src={getAssetUrl(courseManaged?.previewVideoId)} />
                <div className="flex gap-4">
                    <EditPreviewVideoButton className="flex-1"/>
                    <MoreButton />
                </div>
            </CardBody>
        </Card>
    )
}
