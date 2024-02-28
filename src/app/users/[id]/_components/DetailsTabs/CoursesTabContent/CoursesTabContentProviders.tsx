"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"

import {
    CoursesTabContentAction,
    CoursesTabContentState,
    useCoursesTabContentReducer,
} from "./useCoursesTabContentReducer"
import { findManyCreatedCourses } from "@services"
import { isErrorResponse } from "@common"
import { UserDetailsContext } from "../../../_hooks"

export interface CoursesTabContentContextValue {
  state: CoursesTabContentState;
  dispatch: React.Dispatch<CoursesTabContentAction>;
  functions: {
    fetchAndSetCreatedCourses: () => Promise<void>;
  };
}

export const CoursesTabContentContext =
  createContext<CoursesTabContentContextValue | null>(null)

export const CoursesTabContentProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useCoursesTabContentReducer()

    const { state: userDetailsState } = useContext(UserDetailsContext)!
    const { user } = userDetailsState

    const fetchAndSetCreatedCourses = useCallback(async () => {
        if (user === null) return
        const { userId } = user

        const response = await findManyCreatedCourses(
            {
                userId,
            },
            {
                courseId: true,
                thumbnailId: true,
                previewVideoId: true,
                title: true
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSES",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [user])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetCreatedCourses()
        }
        handleEffect()
    }, [user])

    const coursesTabContentContextValue: CoursesTabContentContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetCreatedCourses,
            },
        }),
        [state, dispatch]
    )

    return (
        <CoursesTabContentContext.Provider value={coursesTabContentContextValue}>
            {children}
        </CoursesTabContentContext.Provider>
    )
}
