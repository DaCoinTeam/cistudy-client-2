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
} from "./useCourseDetailsReducer"
import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"

export interface CourseDetailsContextValue {
  state: CourseDetailsState;
  dispatch: React.Dispatch<CourseDetailsAction>;
  functions: {
    fetchAndSetCourse: () => Promise<void>;
  };
}

export const CourseDetailsContext =
  createContext<CourseDetailsContextValue | null>(null)

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
                description: true,
                previewVideoId: true,
                thumbnailId: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                    position: true
                },
                sections: {
                    sectionId: true,
                    title: true,
                    lectures: {
                        lectureId: true,
                        thumbnailId: true,
                        lectureVideoId: true,
                        processStatus: true,
                        title: true,
                    }
                }
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSE",
                payload: response,
            })
            dispatch({
                type: "SET_FINISH_FETCH",
                payload: true,
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

    const courseDetailsContextValue: CourseDetailsContextValue = useMemo(
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
