"use client"
import React, { ReactNode, createContext, useMemo } from "react"

import {
    ContentsEditorAction,
    ContentsEditorState,
    useContentsEditorReducer,
} from "./useContentsEditorReducer"

export interface ContentsEditorContextValue {
  state: ContentsEditorState;
  dispatch: React.Dispatch<ContentsEditorAction>;
}

export const ContentsEditorContext =
  createContext<ContentsEditorContextValue | null>(null)

export const ContentsEditorsProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useContentsEditorReducer()

    const contentsEditorContextValue: ContentsEditorContextValue = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch]
    )

    return (
        <ContentsEditorContext.Provider value={contentsEditorContextValue}>
            {children}
        </ContentsEditorContext.Provider>
    )
}
