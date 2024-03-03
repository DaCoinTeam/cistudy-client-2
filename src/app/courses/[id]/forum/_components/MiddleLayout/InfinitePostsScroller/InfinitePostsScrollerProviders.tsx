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
    FindManyPostsMetadataOutputData,
    findManyPosts,
    findManyPostsMetadata,
} from "@services"
import { PostEntity } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import useSWR, { Fetcher, SWRConfig, SWRResponse } from "swr"

export interface InfinitePostsScrollerContextValue {
  swr: {
    postsSwr: SWRInfiniteResponse<Array<PostEntity> | null>;
    postsMetadataSwr: SWRResponse<FindManyPostsMetadataOutputData>;
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
    const { state: courseDetailsState } = useContext(CourseDetailsContext)!
    const { course } = courseDetailsState

    const fetchPosts: Fetcher<Array<PostEntity> | null, string> = useCallback(
        async (key: string) => {
            if (course === null) return null
            const { courseId } = course

            return await findManyPosts(
                {
                    courseId,
                    options: {
                        skip: COLUMNS_PER_PAGE * Number.parseInt(key),
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
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
                }
            )
        },
        [course?.courseId]
    )

    const fetchPostsMetadata = useCallback(async () => {
        return await findManyPostsMetadata({
            numberOfPosts: true,
        })
    }, [])

    const postsSwr = useSWRInfinite(
        (key) =>
            course?.courseId
                ? [key.toString(), "FETCH_POSTS"]
                : null,
        fetchPosts,
        {
            revalidateFirstPage: false,
        }
    )

    const postsMetadataSwr = useSWR(
        course?.courseId ? ["FETCH_POSTS_METADATA"] : null,
        fetchPostsMetadata
    )

    const infinitePostsScrollerContextValue: InfinitePostsScrollerContextValue =
    useMemo(
        () => ({
            swr: {
                postsSwr,
                postsMetadataSwr,
            },
        }),
        [postsSwr, postsMetadataSwr]
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
