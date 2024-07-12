"use client"
import React, { ReactNode, createContext, useMemo } from "react"
import { CourseApproveModalAction, CourseApproveModalState, useCourseApproveModalReducer } from "./useCourseApproveModalReducer"

interface CourseApproveModalContextValue {
    reducer: [CourseApproveModalState, React.Dispatch<CourseApproveModalAction>]
}

export const CourseApproveModalContext = createContext<CourseApproveModalContextValue | null>(
    null
)

const WrappedCourseApproveModalProvider = ({ children }: {
    children: ReactNode;
}) => {
    const reducer = useCourseApproveModalReducer()

    const courseApproveModalContextValue : CourseApproveModalContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <CourseApproveModalContext.Provider value={courseApproveModalContextValue}>
            {children}
        </CourseApproveModalContext.Provider>
    )
}

export const CourseApproveModalProvider = ({ children }: { children: ReactNode }) => {

    return (
        <WrappedCourseApproveModalProvider>
            {children}
        </WrappedCourseApproveModalProvider>
    )
}