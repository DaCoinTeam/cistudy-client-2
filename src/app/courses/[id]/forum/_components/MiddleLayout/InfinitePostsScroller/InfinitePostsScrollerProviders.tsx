"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import { CourseDetailsContext } from "../../../../_hooks"
import {
    FindManyPostsOutputData,
    findManyPosts,
} from "@services"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { SWRConfig } from "swr"

export interface InfinitePostsScrollerContextValue {
  swrs: {
    postsSwr: SWRInfiniteResponse<FindManyPostsOutputData | undefined, ErrorResponse>;
  };
}

export const COLUMNS_PER_PAGE = 5

export const InfinitePostsScrollerContext =
  createContext<InfinitePostsScrollerContextValue | null>(null)

const WrappedInfinitePostsScrollerProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr

    const fetchPosts = useCallback(
        async (key: number) => {
            if (!course) return
            const { courseId } = course

            return await findManyPosts(
                {
                    courseId,
                    options: {
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
                    results: {
                        postId: true,
                        title: true,
                        html: true,
                        postMedias: {
                            mediaId: true,
                            postMediaId: true,
                            mediaType: true,
                        },
                        numberOfLikes: true,
                        numberOfComments: true,
                        creator: {
                            avatarId: true,
                            username: true,
                        },
                        updatedAt: true,
                        liked: true,
                    },
                    metadata: {
                        count: true
                    }          
                }
            )
        },
        [course?.courseId]
    )

    const postsSwr = useSWRInfinite(
        (key) => (course?.courseId ? [key, "POSTS"] : null),
        fetchPosts,
        {
            revalidateFirstPage: false,
        }
    )

    const infinitePostsScrollerContextValue: InfinitePostsScrollerContextValue =
    useMemo(
        () => ({
            swrs: {
                postsSwr,
            },
        }),
        [postsSwr]
    )

    return (
        <InfinitePostsScrollerContext.Provider
            value={infinitePostsScrollerContextValue}
        >
            {children}
        </InfinitePostsScrollerContext.Provider>
    )
}

export const InfinitePostsScrollerProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedInfinitePostsScrollerProviders>
            {children}
        </WrappedInfinitePostsScrollerProviders>
    </SWRConfig>
)
