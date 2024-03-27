"use client"
import React, { ReactNode, createContext, useCallback, useContext, useMemo } from "react"

import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"
import { RootContext } from "../../../_hooks"

export interface CourseDetailsContextValue {
  swrs: {
    courseSwr: SWRResponse<CourseEntity, ErrorResponse>;
  };
}

export const CourseDetailsContext =
  createContext<CourseDetailsContextValue | null>(null)

export const WrappedCourseDetailsProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const courseId = params.id as string

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const { userId } = { ...profile }

    const fetchCourse = useCallback(async () => {
        return await findOneCourse(
            {
                params: {
                    courseId,
                    userId
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
                    lectures: {
                        lectureId: true,
                        thumbnailId: true,
                        lectureVideoId: true,
                        title: true,
                    },
                },
                category: {
                    categoryId: true,
                    name: true
                },
                courseSubcategories: {
                    subcategory: {
                        subcategoryId: true,
                        name: true
                    }
                },
                courseTopics: {
                    topic: {
                        topicId: true,
                        name: true,
                        svgId: true
                    }
                },
                creator: {
                    avatarId: true,
                    username: true,
                    numberOfFollowers: true
                }
            }
        )
    }, [userId])

    const courseSwr = useSWR(["COURSE", userId], fetchCourse, {
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

export const CourseDetailsProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCourseDetailsProvider>{children}</WrappedCourseDetailsProvider>
    </SWRConfig>
)
