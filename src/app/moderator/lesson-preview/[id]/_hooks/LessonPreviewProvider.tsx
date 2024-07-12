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
import { RootContext } from "../../../../_hooks" 

export interface LessonPreviewContextValue {
  swrs: {
    lessonsSwr: SWRResponse<LessonEntity | undefined, ErrorResponse>;
  };
}

export const LessonPreviewContext =
  createContext<LessonPreviewContextValue | null>(null)

export const LessonPreviewProvider = ({
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
                                title: true
                            }
                        }
                    },
                },
            }
        )
    }, [profile?.accountId])

    const lessonsSwr = useSWR(profile?.accountId ? ["LESSON"] : null, fetchLesson)

    const lessonPreviewContextValue: LessonPreviewContextValue = useMemo(
        () => ({
            swrs: {
                lessonsSwr,
            },
        }),
        [lessonsSwr]
    )

    return (
        <LessonPreviewContext.Provider value={lessonPreviewContextValue}>
            {children}
        </LessonPreviewContext.Provider>
    )
}
