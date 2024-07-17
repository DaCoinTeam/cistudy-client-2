import { Tabs, Tab, Spacer } from "@nextui-org/react"
import React from "react"
import { ClapperboardIcon, ImageIcon } from "lucide-react"
import { VideoTab } from "./VideoTab"
import { ThumbnailTab } from "./ThumbailTab"

interface PreviewSectionProps {
  className?: string;
}

export const PreviewSection = (props: PreviewSectionProps) => {
    const { className } = props

    return (
        <div className={`${className}`}>
            <div className="text-2xl"> Preview </div>
            <Spacer y={4}/>
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
        </div>
    )
}
