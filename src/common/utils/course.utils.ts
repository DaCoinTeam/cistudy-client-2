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
    const clonedItems = Object.assign(items, []) as Array<Item>

    clonedItems?.sort((prev, next) => {
        return prev.position - next.position
    })

    return clonedItems
}

export const capitalizeWords = (text : string) => {
    return text.replace(/\b\w/g, function(char : string) {
        return char.toUpperCase()
    })
}

export interface CertificateProps {
    certId: string
    courseTitle: string
    issueYear: string
    issueMonth: string
    expirationYear?: string
    expirationMonth?: string
    certUrl?: string
}

export const generateLinkedinLink = (props : CertificateProps) => {
    const {certId, courseTitle, issueYear, issueMonth, expirationYear, expirationMonth, certUrl} = props
    const linkedinLink = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${courseTitle}&certId=${certId}&issueYear=${issueYear}&issueMonth=${issueMonth}&expirationYear=${expirationYear}&expirationMonth=${expirationMonth}&certUrl=${certUrl}&organizationName=CiStudy`
    return linkedinLink
}
