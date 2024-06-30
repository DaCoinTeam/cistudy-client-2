"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {
    HomeAction,
    HomeState,
    useHomeReducer,
} from "./useHomeReducer"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"
import { findOneCourseAuth } from "../../../../../services/server"
import { CourseDetailsContext } from "../../_hooks"

export interface HomeContextValue {
  reducer: [HomeState, React.Dispatch<HomeAction>];
  swrs: {
    courseHomeSwr: SWRResponse<CourseEntity | undefined, ErrorResponse>;
  };
}

export const HomeContext = createContext<HomeContextValue | null>(
    null
)

const WrappedHomeProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useHomeReducer()

    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data : course } = courseSwr
    const { courseId } = { ...course }

    const fetchCourseHome = useCallback(async () => {
        if (!courseId) return
        return await findOneCourseAuth(
            {
                params: {
                    courseId,
                } 
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
                    position: true,
                },
                sections: {
                    sectionId: true,
                    title: true,
                    lessons: {
                        lessonId: true,
                        thumbnailId: true,
                        lessonVideoId: true,
                        title: true,
                    },
                },
                creator: {
                    avatarId: true,
                    username: true,
                    numberOfFollowers: true
                }
            }
        )
    }, [courseId])

    const courseHomeSwr = useSWR(courseId ? ["COURSE_HOME"] : null, fetchCourseHome, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const homeContextValue: HomeContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                courseHomeSwr
            }
        }),
        [reducer, courseHomeSwr]
    )
    

    return (
        <HomeContext.Provider value={homeContextValue}>
            {children}
        </HomeContext.Provider>
    )
}

export const HomeProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedHomeProvider>{children}</WrappedHomeProvider>
    </SWRConfig>
)
