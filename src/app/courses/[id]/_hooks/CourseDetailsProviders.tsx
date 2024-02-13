"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
} from "react"

import {
    CourseDetailsAction,
    CourseDetailsState,
    useCourseDetailsReducer,
} from "./useCourseDetails"
import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"

export interface ICourseDetailsContextValue {
  state: CourseDetailsState;
  dispatch: React.Dispatch<CourseDetailsAction>;
  functions: {
    fetchAndSetCourse: () => Promise<void>;
  };
}

export const CourseDetailsContext =
  createContext<ICourseDetailsContextValue | null>(null)

export const CourseDetailsProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useCourseDetailsReducer()

    const params = useParams()
    const courseId = params.id as string

    const fetchAndSetCourse = useCallback(async () => {
        const response = await findOneCourse(
            {
                courseId,
            },
            {
                courseId: true,
                title: true,
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSE",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetCourse()
        }
        handleEffect()
    }, [])

    const courseDetailsContextValue: ICourseDetailsContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetCourse,
            },
        }),
        [state, dispatch]
    )

    return (
        <CourseDetailsContext.Provider value={courseDetailsContextValue}>
            {children}
        </CourseDetailsContext.Provider>
    )
}