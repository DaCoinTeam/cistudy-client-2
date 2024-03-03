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
import { ErrorResponse, PostEntity } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import useSWR, { SWRConfig, SWRResponse } from "swr"

export interface InfinitePostsScrollerContextValue {
  swrs: {
    postsSwr: SWRInfiniteResponse<Array<PostEntity> | undefined, ErrorResponse>;
    postsMetadataSwr: SWRResponse<
      FindManyPostsMetadataOutputData,
      ErrorResponse
    >;
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
        (key) => (course?.courseId ? [key, "FETCH_POSTS"] : null),
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
            swrs: {
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
