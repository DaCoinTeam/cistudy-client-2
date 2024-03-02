"use client"
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from "react"

import {
    ManagementAction,
    ManagementState,
    useManagementReducer,
} from "./useManagementReducer"
import { CourseDetailsContext } from "../../_hooks"
import { findOneCourse } from "@services"
import { isErrorResponse } from "@common"

export interface ManagementContextValue {
  state: ManagementState;
  dispatch: React.Dispatch<ManagementAction>;
  functions: {
    fetchAndSetCourseManaged: () => Promise<void>
  }
}

export const ManagementContext = createContext<ManagementContextValue | null>(null)

export const ManagementProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useManagementReducer()

    const { state: courseDetailsState } =
    useContext(CourseDetailsContext)!

    const { course } = courseDetailsState

    const fetchAndSetCourseManaged = useCallback(async () => {
        if (course === null) return
        const { courseId } = course
        
        const response = await findOneCourse(
            {
                courseId,
            },
            {
                courseId: true,
                description: true,
                title: true,
                previewVideoId: true,
                thumbnailId: true,
                sections: {
                    sectionId: true,
                    title: true,
                    lectures: {
                        lectureId: true,
                        thumbnailId: true,
                        lectureVideoId: true,
                        title: true,
                        resources: {
                            resourceId: true,
                            name: true,
                            fileId: true
                        }
                    }
                },
                courseTargets: {
                    courseTargetId: true,
                    content: true
                }
            }
        )
        
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSE_MANAGEMENT",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [course?.courseId])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetCourseManaged()
        }
        handleEffect()
    }, [course?.courseId])

    const manageContextValue: ManagementContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetCourseManaged
            }
        }),
        [state, dispatch]
    )

    return (
        <ManagementContext.Provider value={manageContextValue}>
            {children}
        </ManagementContext.Provider>
    )
}
