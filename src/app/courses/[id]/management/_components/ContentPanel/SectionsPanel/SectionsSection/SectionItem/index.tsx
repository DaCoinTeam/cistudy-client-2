import React from "react"
import { SectionEntity, sortByPosition } from "@common"
import { SectionContentItem } from "./SectionContentItem"
import { AddSectionContentItem } from "./AddSectionContent"

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
            <AddSectionContentItem section={section} />
        </>
    )
}

export const SectionItem = (props: SectionItemProps) => (
    <WrappedSectionItem {...props} />
)
