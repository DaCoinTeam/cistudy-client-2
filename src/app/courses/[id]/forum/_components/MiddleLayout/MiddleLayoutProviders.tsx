"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import { CourseDetailsContext } from "../../../_hooks"
import {
    FindManyPostsOutputData,
    findManyPosts,
} from "@services"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { SWRConfig } from "swr"

export interface MiddleLayoutContextValue {
  swrs: {
    postsSwr: SWRInfiniteResponse<FindManyPostsOutputData | undefined, ErrorResponse>;
  };
}

export const COLUMNS_PER_PAGE = 5

export const MiddleLayoutContext =
  createContext<MiddleLayoutContextValue | null>(null)

const WrappedMiddleLayoutProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr

    const fetchPosts = useCallback(
        async ([key, ]: [number, string]) => {
            if (!course) return
            const { courseId } = course

            return await findManyPosts(
                {
                    params: {
                        courseId
                    },
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
                        createdAt: true,
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

    const MiddleLayoutContextValue: MiddleLayoutContextValue =
    useMemo(
        () => ({
            swrs: {
                postsSwr,
            },
        }),
        [postsSwr]
    )

    return (
        <MiddleLayoutContext.Provider
            value={MiddleLayoutContextValue}
        >
            {children}
        </MiddleLayoutContext.Provider>
    )
}

export const MiddleLayoutProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedMiddleLayoutProviders>
            {children}
        </WrappedMiddleLayoutProviders>
    </SWRConfig>
)
