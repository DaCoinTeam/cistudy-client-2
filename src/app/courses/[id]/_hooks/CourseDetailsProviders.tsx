"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"

export interface CourseDetailsContextValue {
  swrs: {
    courseSwr: SWRResponse<CourseEntity, ErrorResponse>;
  };
}

export const CourseDetailsContext =
  createContext<CourseDetailsContextValue | null>(null)

export const WrappedCourseDetailsProviders = ({
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
                    courseId
                },
            },
            {
                courseId: true,
                title: true,
                description: true,
                previewVideoId: true,
                thumbnailId: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                    position: true,
                },
                sections: {
                    sectionId: true,
                    title: true,
                    lectures: {
                        lectureId: true,
                        thumbnailId: true,
                        lectureVideoId: true,
                        title: true,
                    },
                },
                creator: {
                    avatarId: true,
                    username: true,
                    numberOfFollowers: true
                }
            }
        )
    }, [])

    const courseSwr = useSWR(["COURSE"], fetchCourse, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const courseDetailsContextValue: CourseDetailsContextValue = useMemo(
        () => ({
            swrs: {
                courseSwr,
            },
        }),
        [courseSwr]
    )

    return (
        <CourseDetailsContext.Provider value={courseDetailsContextValue}>
            {children}
        </CourseDetailsContext.Provider>
    )
}

export const CourseDetailsProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCourseDetailsProviders>{children}</WrappedCourseDetailsProviders>
    </SWRConfig>
)
