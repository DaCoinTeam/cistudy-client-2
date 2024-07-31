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
import { RootContext } from "../../../_hooks"

export interface ContentDetailsContextValue {
  swrs: {
    sectionContentSwr: SWRResponse<SectionContentEntity | undefined, ErrorResponse>;
  };    
}

export const ContentDetailsContext =
  createContext<ContentDetailsContextValue | null>(null)

export const ContentDetailsProvider = ({
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
        // const { accountId } = profile

        return await findOneSectionContent(
            {
                params: {
                    sectionContentId,
                },
                // options: {
                //     followerId: accountId,
                // },
            },
            {
                sectionContentId: true,
                title: true,
                position: true,
                type: true,
                createdAt: true,
                completeState: true,
                quiz: {
                    quizId: true,
                    timeLimit: true,
                    highestScoreRecorded: true,
                    totalNumberOfAttempts: true,
                    lastAttemptScore: true,
                    passingPercent: true,
                    isPassed: true,
                    description: true,
                    activeQuizAttempt: {
                        timeLeft: true,
                        quizAttemptId: true,
                        currentQuestionPosition: true,
                        attemptAnswers: {
                            quizAttemptAnswerId: true,
                            quizAttemptId: true,
                            quizQuestionAnswerId: true,  
                        }
                    },
                    quizAttempts: {
                        quizAttemptId: true,
                        attemptStatus: true,
                    },
                    questions: {
                        position: true,
                        quizQuestionId: true,
                        question: true,
                        numberOfCorrectAnswers: true,
                        answers: {
                            quizQuestionAnswerId: true,
                            content: true,
                            isCorrect: true,
                        },
                        point: true,
                        answered: true,
                    },
                },
                resource: {
                    attachments: {
                        resourceAttachmentId: true,
                        resourceId: true,
                        fileId: true,
                        name: true,
                    },
                    description: true
                },
                lesson: {
                    lessonId: true,
                    durationInSeconds: true,
                    videoType: true,
                    lessonVideoId: true,
                    description: true,
                    numberOfViews: true,
                    enableSeek: true
                },
                section: {
                    sectionId: true,
                    course: {
                        courseId: true,
                        certificateStatus: true,
                        title: true,
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
                            lockState: true,
                            position: true,
                            contents: {
                                position: true,
                                sectionContentId: true,
                                title: true,
                                type: true,
                                completeState: true,
                                quiz: {
                                    quizId: true,
                                    timeLimit: true,
                                    highestScoreRecorded: true,
                                    totalNumberOfAttempts: true,
                                    lastAttemptScore: true,
                                    passingPercent: true,
                                    description: true,
                                    questions: {
                                        quizQuestionId: true,
                                    },
                                },
                                resource: {
                                    attachments: {
                                        resourceAttachmentId: true,
                                        fileId: true,
                                    },
                                    resourceId: true,
                                    description: true
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

    const sectionContentSwr = useSWR(profile?.accountId ? ["SECTION_CONTENT", sectionContentId] : null, fetchSectionContent)

    const contentDetailsContextValue: ContentDetailsContextValue = useMemo(
        () => ({
            swrs: {
                sectionContentSwr,
            },
        }),
        [sectionContentSwr]
    )

    return (
        <ContentDetailsContext.Provider value={contentDetailsContextValue}>
            {children}
        </ContentDetailsContext.Provider>
    )
}
