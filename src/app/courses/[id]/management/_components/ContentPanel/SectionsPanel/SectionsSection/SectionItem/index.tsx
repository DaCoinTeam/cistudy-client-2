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
            {section.contents.map((sectionContent) => (
                <SectionContentItem key={sectionContent.sectionContentId} sectionContent={sectionContent} />
            ))}
            <AddSectionContentItem sectionId={section.sectionId} />
        </>
    )
}

export const SectionItem = (props: SectionItemProps) => (
    <WrappedSectionItem {...props} />
)
