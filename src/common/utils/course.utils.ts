import { SectionEntity } from "../types"
import { v4 as uuidv4 } from "uuid"

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

export interface CertificateProps {
    courseTitle: string
    username: string
}

export const generateCoursesCertificate = (props : CertificateProps) => {
    const {courseTitle, username} = props
    const certificateId = uuidv4()
    const certificateTemplate = `
            <div style="border: 3px solid rgba(177, 177, 177, 0.746); padding: 4px;">
                <div class="dark-br" style="border: 15px solid rgba(135, 135, 135, 0.81); padding: 8px;">
                    <div style="display: flex; flex-flow: row nowrap; height: 740px; width: inherit; border: 6px solid rgb(177, 177, 177);">
                        <div style="width: 25%">
                            <img src="https://media.discordapp.net/attachments/1074987128984973365/1267102267727679509/LinkedIn_left-2.png?ex=66a79072&is=66a63ef2&hm=04ad522806968a4a1b688f207e8cd8834dacb65f919455047ec83d0777cefdd6&=&format=webp&quality=lossless&width=326&height=670" alt="" style="height: 740px;">
                        </div>
                        <div style="margin-top: 90px; margin-left: 20px; width: 62%; font-family: 'Lato', sans-serif; font-size: 18px; color: #737373; font-weight: 300;">
                            <div class="logo">
                                <img id="logo" src="https://media.discordapp.net/attachments/1074987128984973365/1267102266280775755/Learning.png?ex=66a79071&is=66a63ef1&hm=76ad5da30412842d82360e6c8368ea1068bcac94dbf3e4f7c89f53dec4e038c1&=&format=webp&quality=lossless&width=625&height=62" alt="" style="height: 24px; margin-left: 9px;">
                            </div>
                            <div class="congrats" style="margin-left: 40px;">
                                <h2 style="font-weight: 300; margin-top: 3px; margin-bottom: 0px;">Certificate of Completion</h2>
                                <h3 style="font-size: 23px; font-weight: 300; margin-top: 0px;">Congratulations, ${username}</h3>
                            </div>
                            <div class="course-name" style="color: #6e6f6e; margin-top: 45px; margin-left: 40px;">
                                <h1 style="margin: 0;">${courseTitle}</h1>
                                <div class="completion" style="display: flex;flex-direction: column; color: #707071;">
                                    <h3 style="margin-top: 5px; margin-bottom: 0px; font-size: 20px; font-weight: 400;">Course completed on July 28, 2024</h3>
                                    <h3>7 hour 20 minutes</h3>
                                </div>
                            </div>
                            <div class="para" style="margin-top: 30px; margin-left: 40px;">
                                <h2 style="color: #707071; font-size: 17px; font-weight: 400;">By continuing to learn, you have expanded your perspective, sharpened your skills, and made yourself even more in demand.</h2>
                            </div>
                            <div class="authority" style="margin-top: 15px; font-size: 12.6px; font-weight: 300; display: flex; color: #707071; align-items: flex-end; margin-left: 40px;">
                                <div class="part-1">
                                    <img id="sign" src="https://media.discordapp.net/attachments/1074987128984973365/1267102266054279220/Sign2.JPG?ex=66a79071&is=66a63ef1&hm=b21952a5394841a3419d2b1af3b10ac17ef2b545232a15cc7f1edba270b40312&=&format=webp&width=1150&height=345" alt="" style="height: 67px;">
                                    <h3 style="margin: 0; font-size: 17px; font-weight: 500;">VP, Learning Content at CiStudy</h3>
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div class="vl" style="border: 1px solid #d0d0d1; height: 70px;"></div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div class="part-2">
                                    <h3 style="margin: 0; font-size: 17px; font-weight: 500;">CiStudy Learning</h3>
                                    <h3 style="margin: 0; font-size: 17px; font-weight: 500;">E2a-7, D1 street</h3>
                                    <h3 style="margin: 0; font-size: 17px; font-weight: 500;">Long Thanh My, HCM</h3>
                                </div>
                            </div>
                            <div class="certificate-id" style="margin-top: 140px; font-size: 13px; margin-left: 40px;">Certificate Id: ${certificateId}</div>
                        </div>
                    </div>
                </div>
            </div>     
`

    return certificateTemplate
}

export const generateLinkedinLink = (certificateTitle: string) => {
    const linkedinLink = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certificateTitle}`
    return linkedinLink
}
