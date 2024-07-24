import React, { createContext, useMemo } from "react"
import { SectionContentEntity } from "@common"
import { MoreButton } from "./MoreButton"
import { useRouter } from "next/navigation"

interface SectionContentItemProps {
  sectionContentItem: SectionContentEntity;
}

interface SectionContentItemContextValue {
  props: SectionContentItemProps;
}

export const SectionContentItemContext = createContext<SectionContentItemContextValue | null>(
    null
)

export const SectionContentItem = (props: SectionContentItemProps) => {
    const { sectionContentItem } = props

    const sectionContextItemContextValue: SectionContentItemContextValue = useMemo(
        () => ({
            props,
        }),
        [props]
    )

    // const router = useRouter()

    // const onPress = () => router.push(`/lessons/${lessonId}`)

    return (
        <SectionContentItemContext.Provider value={sectionContextItemContextValue}>
            <div className="justify-between flex items-center w-full">
                <div>
                    {sectionContentItem.sectionContentId} - {sectionContentItem.type}
                </div>
                {/* <div className="flex gap-3 w-full">
                    <InteractiveThumbnail isPressable className="w-40 h-fit" src={getAssetUrl(thumbnailId)} onPress={onPress}/>
                    <div>
                        <div> {title} </div>
                        <div className="text-xs text-foreground-400">15 min </div>
                        <div className="text-xs text-foreground-400"> {description} </div>
                    </div>
                </div> */}
                {/* <MoreButton /> */}
            </div>
        </SectionContentItemContext.Provider>
    )
}
