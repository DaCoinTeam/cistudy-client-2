import { SectionEntity } from "../types"

export const sortSections = (sections : SectionEntity[] | undefined) => {
    const sortedSections = sections

    sortedSections?.sort((a, b) => {
        return a.position - b.position
    })

    sortedSections?.map((section) => {
        section.contents.sort((a, b) => {
            return a.position - b.position
        })
    })
    return sortedSections
}