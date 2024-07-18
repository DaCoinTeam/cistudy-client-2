import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import { ErrorResponse } from "@common"
import { FindManyCoursesOutputData, findManyCourses } from "@services"
import { SWRConfig } from "swr"

import {
    AllCoursesAction,
    AllCoursesState,
    useAllCoursesReducer,
} from "./useAllCoursesReducer"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"

export const COLUMNS_PER_PAGE = 9

export interface AllCoursesContextValue {
    reducer: [AllCoursesState, React.Dispatch<AllCoursesAction>]
    swrs: {
        coursesSwr: SWRInfiniteResponse<
            FindManyCoursesOutputData,
            ErrorResponse
        >
    }
}

export const AllCoursesContext = createContext<AllCoursesContextValue | null>(
    null
)

export const WrappedAllCoursesProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const reducer = useAllCoursesReducer()

    const [state] = reducer
    const { searchValue } = state

    const fetchCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourses(
                {
                    options: {
                        searchValue: "",
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
                    results: {
                        courseId: true,
                        title: true,
                        creator: {
                            avatarId: true,
                            username: true,
                            avatarUrl: true,
                            kind: true,
                        },
                        thumbnailId: true,
                        description: true,
                        price: true,
                        courseRatings: {
                            overallCourseRating: true,
                            totalNumberOfRatings: true,
                        }
                    },
                    metadata: {
                        count: true,
                        categories: {
                            categoryId: true,
                            name: true,
                        },
                        highRateCourses: {
                            courseId: true,
                            title: true,
                            creator: {
                                avatarId: true,
                                username: true,
                                avatarUrl: true,
                                kind: true,
                            },
                            thumbnailId: true,
                            description: true,
                            price: true,
                        },
                    },
                }
            )
        },
        [reducer]
    )

    const coursesSwr = useSWRInfinite(
        (key) => [key, "COURSES", searchValue],
        fetchCourses,
        {
            revalidateFirstPage: false,
        }
    )

   
    const allCoursesContextValue: AllCoursesContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                coursesSwr,
            },
        }),
        [searchValue, reducer, coursesSwr]
    )

    return (
        <AllCoursesContext.Provider value={allCoursesContextValue}>
            {children}
        </AllCoursesContext.Provider>
    )
}

export const AllCoursesProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedAllCoursesProvider>{children}</WrappedAllCoursesProvider>
    </SWRConfig>
)
