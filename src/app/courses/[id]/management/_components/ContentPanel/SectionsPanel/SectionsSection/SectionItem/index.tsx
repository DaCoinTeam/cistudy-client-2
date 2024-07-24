import React from "react"
import { SectionEntity } from "@common"
import { SectionContentItem } from "./SectionContentItem"
import { AddSectionContentItem } from "./AddSectionContent"

interface SectionItemProps {
  section: SectionEntity;
}

const WrappedSectionItem = (props: SectionItemProps) => {
    const { section } = props

    return (
        <>
            {section.contents.map((sectionContentItem) => (
                <SectionContentItem key={sectionContentItem.sectionContentId} sectionContentItem={sectionContentItem} />
            ))}
            <AddSectionContentItem sectionId={section.sectionId} />
        </>
    )
}

export const SectionItem = (props: SectionItemProps) => (
    <WrappedSectionItem {...props} />
)
