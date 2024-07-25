"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findOneSectionContent } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, SectionContentEntity } from "@common"
import useSWR, { SWRResponse } from "swr"
import { RootContext } from "../../../../_hooks" 

export interface SectionContentPreviewContextValue {
  swrs: {
    sectionContentSwr: SWRResponse<SectionContentEntity | undefined, ErrorResponse>;
  };
}

export const SectionContentPreviewContext =
  createContext<SectionContentPreviewContextValue | null>(null)

export const SectionContentPreviewProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const sectionContentId = params.id as string

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const fetchSectionContent = useCallback(async () => {
        if (!profile) return

        return await findOneSectionContent(
            {
                params: {
                    sectionContentId,
                },
            },
            {
                sectionContentId: true,
                title: true,
                type: true,
                createdAt: true,
                quiz: {
                    quizId: true,
                    timeLimit: true,
                    questions: {
                        quizQuestionId: true,
                        question: true,
                        answers: {
                            quizQuestionAnswerId: true,
                            content: true,
                            isCorrect: true,
                        },
                        point: true,
                    },
                },
                resource: {
                    attachments: {
                        resourceAttachmentId: true,
                        resourceId: true,
                        fileId: true,
                        name: true,
                    }
                },
                lesson: {
                    lessonId: true,
                    durationInSeconds: true,
                    videoType: true,
                    lessonVideoId: true,
                    description: true,
                    numberOfViews: true,
                },
                section: {
                    sectionId: true,
                    course: {
                        creator: {
                            avatarId: true,
                            username: true,
                            numberOfFollowers: true,
                            accountId: true,
                            followed: true,
                            avatarUrl: true,
                            kind: true,
                        },
                        sections: {
                            sectionId: true,
                            title: true,
                            position: true,
                            contents: {
                                sectionContentId: true,
                                title: true,
                                type: true,
                                quiz: {
                                    quizId: true,
                                    timeLimit: true,
                                    questions: {
                                        quizQuestionId: true,
                                    },
                                },
                                resource: {
                                    attachments: {
                                        resourceAttachmentId: true,
                                        fileId: true
                                    }
                                },
                                lesson: {
                                    lessonId: true,
                                    durationInSeconds: true,
                                    videoType: true,
                                    lessonVideoId: true,
                                    description: true,
                                    numberOfViews: true,
                                },
                            }
                            
                        }
                    },
                },
            }
        )
    }, [profile?.accountId])

    const sectionContentSwr = useSWR(profile?.accountId ? ["SECTION_CONTENT"] : null, fetchSectionContent)

    const sectionContentPreviewContextValue: SectionContentPreviewContextValue = useMemo(
        () => ({
            swrs: {
                sectionContentSwr,
            },
        }),
        [sectionContentSwr]
    )

    return (
        <SectionContentPreviewContext.Provider value={sectionContentPreviewContextValue}>
            {children}
        </SectionContentPreviewContext.Provider>
    )
}
