"use client"
import { Chip, Spacer, Textarea } from "@nextui-org/react"
import React, { useContext } from "react"
import { PublishButton } from "./PublishButton"
import { SectionContentType, VerifyStatus } from "@common"
import { ManagementContext } from "../../../_hooks"
import { RemoveButton } from "./RemoveButton"
import { Check, X } from "lucide-react"

interface SettingsPanelProps {
  className?: string;
}
export const SettingsPanel = (props: SettingsPanelProps) => {
    const { className } = props
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr
    const { verifyStatus, previousFeedback, title, description, thumbnailId, previewVideoId, sections, courseCategories, courseTargets, price } = { ...data }

    const renderStatus = () => {
        const map: Record<VerifyStatus, JSX.Element> = {
            [VerifyStatus.Draft]: (
                <Chip size="lg" color="default" variant="flat">
          Draft
                </Chip>
            ),
            [VerifyStatus.Pending]: (
                <Chip size="lg" color="warning" variant="flat">
          Pending
                </Chip>
            ),
            [VerifyStatus.Approved]: (
                <Chip size="lg" color="success" variant="flat">

          Approved
                </Chip>
            ),
            [VerifyStatus.Rejected]: (
                <Chip size="lg" color="danger" variant="flat">
          Rejected
                </Chip>
            ),
        }
        return map[verifyStatus ?? VerifyStatus.Draft]
    }

    const checkCategoryLevels = () => {
        if (!courseCategories) return false
        const hasLevel0 = courseCategories.some(item => item.category.level === 0)
        const hasLevel1 = courseCategories.some(item => item.category.level === 1)
        const hasLevel2 = courseCategories.some(item => item.category.level === 2)
        
        return hasLevel0 && hasLevel1 && hasLevel2
    }

    return (
        <div className={`${className}`}>
            <div className="text-2xl font-semibold"> Actions </div>
            <Spacer y={6} />
            <div>{renderStatus()}</div>
            {verifyStatus === VerifyStatus.Rejected && <div><Spacer y={6} /> <Textarea color="danger" value={`Reason: ${previousFeedback}`} fullWidth isReadOnly /></div>}
            <Spacer y={6} />
            <div>
                <div className="grid gap-4">
                    <div>
            If you find that the quality and content of your courses meet the
            necessary standards and expectations, you can proceed with
            submitting them for review to ensure they are evaluated and approved
            accordingly. 
                        <br/>
            If your course is not accepted upon initial review, you have the opportunity to make necessary revisions and resubmit it for consideration.
                    </div>
                    <div>Your course must meet these requirements before publishing:</div>
                    <div className="grid border border-divider rounded-medium p-4 gap-2 text-sm">
                        <div className="flex flex-row gap-2">
                            {
                                title && title?.length > 20 ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${title && title?.length > 20? "text-success" : "text-danger"}`}>Title is longer than 20 characters</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                description && description?.length > 100 ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${description && description?.length > 100 ? "text-success" : "text-danger"}`}>Description is longer than 100 characters</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                checkCategoryLevels() ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${checkCategoryLevels()? "text-success" : "text-danger"}`}>Have at least 1 category, 1 subcategory, 1 topic</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                thumbnailId && previewVideoId ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${thumbnailId && previewVideoId ? "text-success" : "text-danger"}`}>Must have thumbnail and video preview</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                courseTargets && courseTargets?.length > 1 ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${courseTargets && courseTargets?.length > 1 ? "text-success" : "text-danger"}`}>Have at least 2 targets</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                sections && sections?.length > 0 && sections.every((section) => section.contents.length > 0) ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${sections && sections?.length > 0 && sections.every((section) => section.contents.length > 0)? "text-success" : "text-danger"}`}>Have at least 1 section and 1 content in each section</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                sections && sections?.length > 0 && sections.every((section) => section.contents.length > 0 && section.contents.every((content) => {
                                    if (content.type !== SectionContentType.Lesson) return true
                                    return content.lesson?.lessonVideoId
                                })) ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${sections && sections?.length > 0 && sections.every((section) => section.contents.length > 0 && section.contents.every((content) => {
                                if (content.type !== SectionContentType.Lesson) return true
                                return content.lesson?.lessonVideoId
                            })) ? "text-success" : "text-danger"}`}>Lesson in each section must have a video</div>
                        </div>

                        <div className="flex flex-row gap-2">
                            {
                                price ? <Check size={20} className="text-success" /> : <X size={20} className="text-danger" />
                            }
                            <div className={`${price? "text-success" : "text-danger"}`}>Have price</div>
                        </div>
                    </div>
                    <PublishButton />
                </div>
            </div>
            <Spacer y={6}/>
            <div>
                <div className="grid gap-4">
                    <div>You are permitted to delete your course only under two conditions: if it is still in draft status or if it has been formally rejected.</div>
                    <RemoveButton/>
                </div>
            </div>
        </div>
    )
}
