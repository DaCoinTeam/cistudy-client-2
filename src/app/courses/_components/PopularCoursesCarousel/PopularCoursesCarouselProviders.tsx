"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
} from "react"

import {
    PopularCoursesCarouselAction,
    PopularCoursesCarouselState,
    usePopularCoursesCarouselReducer,
} from "./usePopularCoursesCarouselReducer"
import { findManyCourses } from "@services"
import { isErrorResponse } from "@common"

export interface PopularCoursesCarouselContextValue {
  state: PopularCoursesCarouselState;
  dispatch: React.Dispatch<PopularCoursesCarouselAction>;
  functions: {
    fetchAndSetCourses: () => Promise<void>
  }
}

export const PopularCoursesCarouselContext =
  createContext<PopularCoursesCarouselContextValue | null>(null)

export const PopularCoursesCarouselProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = usePopularCoursesCarouselReducer()

    const fetchAndSetCourses = useCallback(async () => {
        const response = await findManyCourses(
            {
                courseId: true,
                title: true,
                description: true,
                previewVideoId: true,
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSES",
                payload: response,
            })
            dispatch({
                type: "SET_FINISH_FETCH",
                payload: true,
            })
        } else {
            //toastify => ....
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetCourses()
        }
        handleEffect()
    }, [])

    const PopularCoursesCarouselContextValue: PopularCoursesCarouselContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetCourses
            }
        }),
        [state, dispatch]
    )

    return (
        <PopularCoursesCarouselContext.Provider value={PopularCoursesCarouselContextValue}>
            {children}
        </PopularCoursesCarouselContext.Provider>
    )
}
