"use client"
import { ReactNode, createContext, useCallback, useEffect } from "react"
import React from "react"

import {
    CourseDetailsAction,
    CourseDetailsState,
    useCourseDetailsReducer,
} from "./courseCourseDetails"
import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"

export interface ICourseDetailsContextProps {
  state: CourseDetailsState;
  dispatch: React.Dispatch<CourseDetailsAction>;
  functions: {
    fetchAndSetCourse: () => Promise<void>;
  };
}

export const CourseDetailsContext =
  createContext<ICourseDetailsContextProps | null>(null)

export const CourseDetailsProviders = ({ children }: { children: ReactNode }) => {
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
                title: true
            }
        )
        console.log(response)
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

    return (
        <CourseDetailsContext.Provider
            value={{
                state,
                dispatch,
                functions: {
                    fetchAndSetCourse,
                },
            }}
        >
            {children}
        </CourseDetailsContext.Provider>
    )
}
