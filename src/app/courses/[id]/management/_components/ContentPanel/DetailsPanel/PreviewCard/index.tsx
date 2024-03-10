import { CardBody, Card, CardHeader, Tabs, Tab } from "@nextui-org/react"
import React from "react"
import { ClapperboardIcon, ImageIcon } from "lucide-react"
import { VideoTab } from "./VideoTab"
import { ThumbnailTab } from "./ThumbailTab"

interface PreviewCardProps {
  className?: string;
}

export const PreviewCard = (props: PreviewCardProps) => {
    const { className } = props

    return (
        <Card shadow="none" className={`${className} border border-divider rounded-medium`}>
            <CardHeader className="p-4 pb-2 justify-between text-lg  font-semibold items-center">
                Preview
            </CardHeader> 
            <CardBody className="p-4 pt-2">
                <Tabs
                    classNames={{
                        panel: "p-0 pt-4",
                    }}
                    variant="underlined"
                    color="primary"
                >
                    <Tab
                        key="video"
                        title={
                            <div className="flex gap-2 items-center">
                                <ClapperboardIcon size={20} strokeWidth={3/2} />
                                <div>Video</div>
                            </div>
                        }
                    >
                        <VideoTab />
                    </Tab>
                    <Tab
                        key="thumbnail"
                        title={
                            <div className="flex gap-2 items-center">
                                <ImageIcon size={20} strokeWidth={3/2} /> <div>Thumbnail</div>{" "}
                            </div>
                        }
                    >
                        <ThumbnailTab />
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    )
}
