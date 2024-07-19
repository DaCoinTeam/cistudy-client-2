"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findManyCreatedCourses } from "@services"
import { AccountDetailsContext } from "../../../_hooks"
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

export const CoursesTabContentProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account } = accountSwr

    const fetchCreatedCourses = useCallback(async () => {
        if (!account) return
        const { accountId } = account

        return findManyCreatedCourses(
            {
                params: {
                    accountId,
                }
            },
            {
                courseId: true,
                thumbnailId: true,
                previewVideoId: true,
                title: true,
            }
        )
    }, [account?.accountId])

    const createdCoursesSwr = useSWR(
        ["CREATED_COURSES"],
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
