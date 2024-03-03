"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findManyCreatedCourses } from "@services"
import { UserDetailsContext } from "../../../_hooks"
import useSWR, { SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"

export interface CoursesTabContentContextValue {
  swrs: {
    createdCoursesSwr: SWRResponse<
      Array<CourseEntity> | undefined,
      ErrorResponse
    >;
  };
}

export const CoursesTabContentContext =
  createContext<CoursesTabContentContextValue | null>(null)

export const CoursesTabContentProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user } = userSwr

    const fetchCreatedCourses = useCallback(async () => {
        if (!user) return
        const { userId } = user

        return findManyCreatedCourses(
            {
                userId,
            },
            {
                courseId: true,
                thumbnailId: true,
                previewVideoId: true,
                title: true,
            }
        )
    }, [user?.userId])

    const createdCoursesSwr = useSWR(
        ["FETCH_CREATED_COURSES"],
        fetchCreatedCourses
    )

    const coursesTabContentContextValue: CoursesTabContentContextValue = useMemo(
        () => ({
            swrs: {
                createdCoursesSwr,
            },
        }),
        [createdCoursesSwr]
    )

    return (
        <CoursesTabContentContext.Provider value={coursesTabContentContextValue}>
            {children}
        </CoursesTabContentContext.Provider>
    )
}
