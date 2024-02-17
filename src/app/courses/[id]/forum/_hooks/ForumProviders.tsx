"use client"
import React, { ReactNode, createContext, useMemo } from "react"
import { ForumAction, ForumState, useForumReducer } from "./useForumReducer"

export interface ForumContextValue {
  state: ForumState;
  dispatch: React.Dispatch<ForumAction>;
}

export const ForumContext = createContext<ForumContextValue | null>(null)

export const ForumProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useForumReducer()

    const forumContextValue: ForumContextValue = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch]
    )

    return (
        <ForumContext.Provider value={forumContextValue}>
            {children}
        </ForumContext.Provider>
    )
}
