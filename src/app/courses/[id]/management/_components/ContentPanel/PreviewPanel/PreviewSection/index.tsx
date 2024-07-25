import { Tabs, Tab } from "@nextui-org/react"
import React from "react"
import { VideoTab } from "./VideoTab"
import { ThumbnailTab } from "./ThumbailTab"

interface PreviewSectionProps {
  className?: string;
}

export const PreviewSection = (props: PreviewSectionProps) => {
    const { className } = props

    return (
        <div className={`${className}`}>
            <Tabs
                classNames={{
                    panel: "p-0 pt-4",
                    cursor: "w-full"
                }}
                variant="underlined"
                color="primary"
            >
                <Tab
                    key="video"
                    title="Video"
                >
                    <VideoTab />
                </Tab>
                <Tab
                    key="thumbnail"
                    title="Thumbnail"
                >
                    <ThumbnailTab />
                </Tab>
            </Tabs>
        </div>
    )
}
