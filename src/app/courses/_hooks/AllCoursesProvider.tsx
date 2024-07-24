import { ReactNode, createContext, useCallback, useContext, useMemo } from "react"

import { ErrorResponse } from "@common"
import { FindManyCoursesOutputData, findManyCourses } from "@services"
import { useSearchParams } from "next/navigation"
import { SWRConfig } from "swr"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { RootContext } from "../../_hooks"

export const COLUMNS_PER_PAGE = 9

export interface AllCoursesContextValue {
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

    const searchParams = useSearchParams()
    const searchValue = searchParams.get("searchValue")

    const {reducer} = useContext(RootContext)!
    const [state, dispatch] = reducer
    const { categoryFilter } = state
    const getCategoryFilterIds = () => {
        if (categoryFilter.length === 0) return []
        return categoryFilter.map((category) => category.categoryId)
    }

    const fetchCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourses(
                {
                    options: {
                        categoryIds: getCategoryFilterIds(),
                        searchValue: searchValue || "",
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
                        discountPrice: true,
                        enableDiscount: true,
                        courseTargets: {
                            courseTargetId: true,
                            content: true,
                        },
                        courseRatings: {
                            overallCourseRating: true,
                            totalNumberOfRatings: true,
                        }
                    },
                    metadata: {
                        count: true,
                        relativeTopics: {
                            categoryId: true,
                            name: true,
                        },
                    },
                }
            )
        },
        [searchValue, categoryFilter]
    )
    const coursesSwr = useSWRInfinite(
        (key) => [key, "COURSES", searchValue, categoryFilter],
        fetchCourses,
        {
            revalidateFirstPage: false,
        }
    )

   
    const allCoursesContextValue: AllCoursesContextValue = useMemo(
        () => ({
            swrs: {
                coursesSwr,
            },
        }),
        [searchValue, state, dispatch, coursesSwr]
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
