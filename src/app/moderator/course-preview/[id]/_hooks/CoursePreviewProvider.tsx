"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"

export interface CoursePreviewContextValue {
  swrs: {
    courseSwr: SWRResponse<CourseEntity, ErrorResponse>;
  };
}

export const CoursePreviewContext =
  createContext<CoursePreviewContextValue | null>(null)

export const WrappedCoursePreviewProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const courseId = params.id as string

    const fetchCourse = useCallback(async () => {
        return await findOneCourse(
            {
                params: {
                    courseId,
                },
            },
            {
                courseId: true,
                title: true,
                description: true,
                previewVideoId: true,
                thumbnailId: true,
                price: true,
                discountPrice: true,
                enableDiscount: true,
                enrolled: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                    position: true,
                },
                sections: {
                    sectionId: true,
                    title: true,
                    lessons: {
                        lessonId: true,
                        thumbnailId: true,
                        lessonVideoId: true,
                        title: true,
                    },
                },
                creator: {
                    avatarId: true,
                    username: true,
                    numberOfFollowers: true,
                    avatarUrl: true,
                    kind: true,
                    accountId: true,
                    walletAddress: true
                }
            }
        )
    }, [])

    const courseSwr = useSWR(
        ["COURSE"],
        fetchCourse, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )

    const coursePreviewContextValue: CoursePreviewContextValue = useMemo(
        () => ({
            swrs: {
                courseSwr,
            },
        }),
        [courseSwr]
    )

    return (
        <CoursePreviewContext.Provider value={coursePreviewContextValue}>
            {children}
        </CoursePreviewContext.Provider>
    )
}

export const CoursePreviewProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCoursePreviewProvider>{children}</WrappedCoursePreviewProvider>
    </SWRConfig>
)
