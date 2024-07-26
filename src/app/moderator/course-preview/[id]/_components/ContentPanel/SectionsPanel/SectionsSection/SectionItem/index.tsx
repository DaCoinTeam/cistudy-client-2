import React from "react"
import { SectionEntity, sortByPosition } from "@common"
import { SectionContentItem } from "./SectionContentItem"

interface SectionItemProps {
  section: SectionEntity;
}

const WrappedSectionItem = (props: SectionItemProps) => {
    const { section } = props
    return (
        <>
            {sortByPosition(section.contents).map((sectionContent) => (
                <SectionContentItem key={sectionContent.sectionContentId} sectionContent={sectionContent} />
            ))}
        </>
    )
}

export const SectionItem = (props: SectionItemProps) => (
    <WrappedSectionItem {...props} />
)
