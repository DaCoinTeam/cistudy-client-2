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
import { isErrorResponse } from "@common"

export interface ForumContextValue {
  state: ForumState;
  dispatch: React.Dispatch<ForumAction>;
  functions: {
    fetchAndSetPosts: () => Promise<void>;
  };
}

export const ForumContext = createContext<ForumContextValue | null>(null)

export const ForumProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useForumReducer()

    const { state: courseDetailsState } = useContext(CourseDetailsContext)!
    const { course } = courseDetailsState

    const fetchAndSetPosts = useCallback(
        async (options?: FindManyPostOptions) => {
            if (course === null) return
            const { courseId } = course

            const response = await findManyPosts(
                {
                    courseId,
                    options,
                },
                {
                    postId: true,
                    postContents: {
                        postContentId: true,
                        contentType: true,
                    },
                }
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

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetPosts()
        }
        handleEffect()
    }, [course])

    const forumContextValue: ForumContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetPosts,
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
