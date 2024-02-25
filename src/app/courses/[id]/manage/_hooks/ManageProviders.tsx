"use client"
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from "react"

import {
    ManageAction,
    ManageState,
    useManageReducer,
} from "./useManageReducer"
import { CourseDetailsContext } from "../../_hooks"
import { findOneCourse } from "@services"
import { isErrorResponse } from "@common"

export interface ManageContextValue {
  state: ManageState;
  dispatch: React.Dispatch<ManageAction>;
  functions: {
    fetchAndSetCourseManaged: () => Promise<void>
  }
}

export const ManageContext = createContext<ManageContextValue | null>(null)

export const ManageProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useManageReducer()

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
                }
            }
        )
        
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSE_MANAGED",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [course])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetCourseManaged()
        }
        handleEffect()
    }, [course])

    const manageContextValue: ManageContextValue = useMemo(
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
        <ManageContext.Provider value={manageContextValue}>
            {children}
        </ManageContext.Provider>
    )
}
