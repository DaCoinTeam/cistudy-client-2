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
import { PostEntity, Schema, isErrorResponse } from "@common"

export interface ForumContextValue {
  state: ForumState;
  dispatch: React.Dispatch<ForumAction>;
  functions: {
    fetchAndSetPosts: (options?: FindManyPostOptions) => Promise<void>;
    fetchAndAppendPosts: (options?: FindManyPostOptions) => Promise<void>;
  };
}

export const NUMBER_OF_POSTS = 5

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
    const [state, dispatch] = useForumReducer()
    const { posts } = state 
    const { state: courseDetailsState } = useContext(CourseDetailsContext)!
    const { course } = courseDetailsState

    const fetchAndSetPosts = useCallback(
        async () => {
            if (course === null) return
            const { courseId } = course

            const response = await findManyPosts(
                {
                    courseId,
                    options: {
                        skip: 0,
                        take: posts.length
                    }
                },
                findManyPostsSchema
            )
            if (!isErrorResponse(response)) {
                dispatch({
                    type: "SET_POSTS",
                    payload: response,
                })
            } else {
                console.log(response)
            }
        },
        [course]
    )

    const fetchAndAppendPosts = useCallback(
        async (options?: FindManyPostOptions) => {
            if (course === null) return
            const { courseId } = course

            const response = await findManyPosts(
                {
                    courseId,
                    options,
                },
                findManyPostsSchema
            )
            if (!isErrorResponse(response)) {
                if (!response.length) {
                    dispatch({
                        type: "SET_END_OF_POSTS_ACTION",
                        payload: true,
                    })
                    return
                }
                dispatch({
                    type: "APPEND_POSTS",
                    payload: response,
                })
            } else {
                console.log(response)
            }
        },
        [course]
    )

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndAppendPosts({
                skip: 0,
                take: NUMBER_OF_POSTS
            })
        }
        handleEffect()
    }, [course])

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
