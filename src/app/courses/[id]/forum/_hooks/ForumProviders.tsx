"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"
import { ForumAction, ForumState, useForumReducer } from "./useForumReducer"
import { CourseDetailsContext } from "../../_hooks"
import { FindManyPostOptions, findManyPosts } from "@services"
import { CourseEntity, PostEntity, Schema, isErrorResponse } from "@common"

export interface ForumContextValue {
  state: ForumState;
  dispatch: React.Dispatch<ForumAction>;
  functions: {
    fetchAndSetPosts: (options?: FindManyPostOptions) => Promise<void>;
    fetchAndAppendPosts: (options?: FindManyPostOptions) => Promise<void>;
  };
}

export const COLUMNS_PER_PAGE = 5

export const ForumContext = createContext<ForumContextValue | null>(null)

export const findManyPostsSchema: Schema<PostEntity> = {
    postId: true,
    title: true,
    html: true,
    postMedias: {
        postMediaId: true,
        mediaId: true,
        mediaType: true
    },
    postReacts: {
        postReactId: true,
        userId: true,
        liked: true
    }
}

export const ForumProviders = ({ children }: { children: ReactNode }) => {
    const [ state, dispatch ] = useForumReducer()
    const { page } = state 
    const { state: courseDetailsState } = useContext(CourseDetailsContext)!
    const { course } = courseDetailsState

    const fetchPosts = useCallback(
        async () => {
            if (course === null) return []
            const { courseId } = course

            return await findManyPosts(
                {
                    courseId,
                    options: {
                        skip: COLUMNS_PER_PAGE * (page - 1),
                        take: COLUMNS_PER_PAGE
                    }
                },
                findManyPostsSchema
            )
        },
        [course]
    )

    const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite<Array<CourseEntity>>(
        (index) => `/api/comment?postId=${postId}&currentPage=${index + 1}`,
      )

    const forumContextValue: ForumContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetPosts,
                fetchAndAppendPosts,
            },
        }),
        [state, dispatch]
    )

    return (
        <ForumContext.Provider value={forumContextValue}>
            {children}
        </ForumContext.Provider>
    )
}
function useSWRInfinite(getKey: any, arg1: any, arg2: any): { data: any; error: any; isLoading: any; isValidating: any; mutate: any; size: any; setSize: any } {
    throw new Error("Function not implemented.")
}

