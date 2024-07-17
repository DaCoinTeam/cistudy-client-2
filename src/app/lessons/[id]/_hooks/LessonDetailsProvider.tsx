"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findOneLesson } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, LessonEntity } from "@common"
import useSWR, { SWRResponse } from "swr"
import { RootContext } from "../../../_hooks"

export interface LessonDetailsContextValue {
  swrs: {
    lessonsSwr: SWRResponse<LessonEntity | undefined, ErrorResponse>;
  };
}

export const LessonDetailsContext =
  createContext<LessonDetailsContextValue | null>(null)

export const LessonDetailsProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const lessonId = params.id as string

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const fetchLesson = useCallback(async () => {
        if (!profile) return
        const { accountId } = profile

        return await findOneLesson(
            {
                params: {
                    lessonId,
                },
                options: {
                    followerId: accountId,
                },
            },
            {
                lessonId: true,
                title: true,
                lessonVideoId: true,     
                thumbnailId: true,
                videoType: true,
                description: true,
                numberOfViews: true,
                createdAt: true,
                quiz: {
                    quizId: true,
                    timeLimit: true,
                    highestScoreRecorded: true,
                    totalNumberOfAttempts: true,
                    lastAttemptScore: true,
                    questions: {
                        quizQuestionId: true,
                    },
                },
                resources: {
                    resourceId: true,
                    fileId: true,
                    name: true
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
                        },
                        sections: {
                            sectionId: true,
                            title: true,
                            lessons: {
                                lessonId: true,
                                thumbnailId: true,
                                title: true,
                                quiz: {
                                    quizId: true,
                                    timeLimit: true,
                                    highestScoreRecorded: true,
                                    totalNumberOfAttempts: true,
                                },
                            }
                        }
                    },
                },
            }
        )
    }, [profile?.accountId])

    const lessonsSwr = useSWR(profile?.accountId ? ["LESSON"] : null, fetchLesson)

    const lessonDetailsContextValue: LessonDetailsContextValue = useMemo(
        () => ({
            swrs: {
                lessonsSwr,
            },
        }),
        [lessonsSwr]
    )

    return (
        <LessonDetailsContext.Provider value={lessonDetailsContextValue}>
            {children}
        </LessonDetailsContext.Provider>
    )
}
