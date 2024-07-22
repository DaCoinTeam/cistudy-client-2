import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {
    FindManyCourseReviewsOutputData,
    findManyCourseReviews,
} from "@services"
import { SWRConfig } from "swr"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { ErrorResponse } from "../../../../../../common/types"
import { CourseDetailsContext } from "../../../_hooks"

export interface CourseReviewsContextValue {
  swrs: {
    courseReviewsSwr: SWRInfiniteResponse<
      FindManyCourseReviewsOutputData,
      ErrorResponse
    >;
  };
}

export const CourseReviewsContext =
  createContext<CourseReviewsContextValue | null>(null)
export const COLUMNS_PER_PAGE = 4

export const WrappedCourseReviewsProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const courseId = course?.courseId ?? ""
    const fetchManyCourseReviews = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourseReviews(
                {
                    params: {
                        courseId,
                    },
                    options: {
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
                    results: {
                        courseReviewId: true,
                        content: true,
                        rating: true,
                        createdAt: true,
                        updatedAt: true,
                        account: {
                            accountId: true,
                            username: true,
                            email: true,
                            avatarId: true,
                            avatarUrl: true,
                            kind: true,
                            // numberOfFollowers: true,
                        },
                    },
                    metadata: {
                        count: true,
                    },
                }
            )
        },
        [courseSwr]
    )

    const courseReviewsSwr = useSWRInfinite(
        (key) => [key, "REVIEWS", courseId],
        fetchManyCourseReviews,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )

    const courseReviewsContextValue: CourseReviewsContextValue = useMemo(
        () => ({
            swrs: {
                courseReviewsSwr,
            },
        }),
        [courseReviewsSwr, courseSwr]
    )

    return (
        <CourseReviewsContext.Provider value={courseReviewsContextValue}>
            {children}
        </CourseReviewsContext.Provider>
    )
}

export const CourseReviewsProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCourseReviewsProvider>{children}</WrappedCourseReviewsProvider>
    </SWRConfig>
)
