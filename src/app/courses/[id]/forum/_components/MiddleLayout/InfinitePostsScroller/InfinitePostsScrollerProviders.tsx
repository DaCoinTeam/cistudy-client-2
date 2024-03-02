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
import { PostEntity, isErrorResponse } from "@common"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import useSWR, { SWRResponse } from "swr"

export interface InfinitePostsScrollerContextValue {
  swr: {
    postsSwr: SWRInfiniteResponse<Array<PostEntity> | null>;
    postsMetadataSwr: SWRResponse<FindManyPostsMetadataOutputData | null>;
  };
}

export const COLUMNS_PER_PAGE = 5

export const InfinitePostsScrollerContext =
  createContext<InfinitePostsScrollerContextValue | null>(null)

export const InfinitePostsScrollerProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { state: courseDetailsState } = useContext(CourseDetailsContext)!
    const { course } = courseDetailsState

    const fetchPosts = useCallback(async (key: number) => {
        if (course === null) return null
        const { courseId } = course

        const response = await findManyPosts(
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
            }
        )

        if (!isErrorResponse(response)) return response

        //process error
        console.log(response)
        return null
    }, [course?.courseId])

    const fetchPostsMetadata = useCallback(async () => {
        const response = await findManyPostsMetadata({
            numberOfPosts: true,
        })

        if (!isErrorResponse(response)) return response

        //process error
        console.log(response)
        return null
    }, [])

    const postsSwr = useSWRInfinite((key) => [course?.courseId ? key : null], fetchPosts)

    const postsMetadataSwr = useSWR([postsSwr], fetchPostsMetadata)

    const infinitePostsScrollerContextValue: InfinitePostsScrollerContextValue =
    useMemo(
        () => ({
            swr: {
                postsSwr,
                postsMetadataSwr,
            },
        }),
        [ postsSwr, postsMetadataSwr ]
    )

    return (
        <InfinitePostsScrollerContext.Provider
            value={infinitePostsScrollerContextValue}
        >
            {children}
        </InfinitePostsScrollerContext.Provider>
    )
}
