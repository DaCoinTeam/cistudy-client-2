"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"
import {
    FindManyPostsOutputData,
    findManyPosts,
} from "@services"
import { ErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { SWRConfig } from "swr"
import { HomeContext } from "../../../_hooks"

export interface ForumLayoutContextValue {
  swrs: {
    postsSwr: SWRInfiniteResponse<FindManyPostsOutputData | undefined, ErrorResponse>;
  };
}

export const COLUMNS_PER_PAGE = 5

export const ForumLayoutContext =
  createContext<ForumLayoutContextValue | null>(null)

const WrappedForumLayoutProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr

    const fetchPosts = useCallback(
        async ([key, ]: [number, string]) => {
            if (!courseHome) return
            const { courseId } = courseHome

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
                            accountId: true,
                            avatarId: true,
                            username: true,
                            avatarUrl: true,
                            kind: true
                        },
                        createdAt: true,
                        updatedAt: true,
                        liked: true,
                        isRewardable: true,
                        isCompleted: true,
                        isPostOwner: true,
                        numberOfRewardableCommentsLeft: true,
                        numberOfRewardableLikesLeft: true,


                    },
                    metadata: {
                        count: true
                    }          
                }
            )
        },
        [courseHome?.courseId]
    )

    const postsSwr = useSWRInfinite(
        (key) => (courseHome?.courseId ? [key, "POSTS"] : null),
        fetchPosts,
        {
            revalidateFirstPage: false,
        }
    )

    const ForumLayoutContextValue: ForumLayoutContextValue =
    useMemo(
        () => ({
            swrs: {
                postsSwr,
            },
        }),
        [postsSwr]
    )

    return (
        <ForumLayoutContext.Provider
            value={ForumLayoutContextValue}
        >
            {children}
        </ForumLayoutContext.Provider>
    )
}

export const ForumLayoutProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedForumLayoutProvider>
            {children}
        </WrappedForumLayoutProvider>
    </SWRConfig>
)
