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

export interface HasPositionLike {
    position: number
}

export const sortByPosition = <Item extends HasPositionLike>(items : Item[]) => {
    const clonedItems = Object.assign(items, [])

    clonedItems?.sort((prev, next) => {
        return prev.position - next.position
    })

    return clonedItems
}
