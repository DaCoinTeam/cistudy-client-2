"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
} from "react"

import {
    LectureDetailsAction,
    LectureDetailsState,
    useLectureDetailsReducer,
} from "./useLectureDetailsReducer"
import { findOneLecture } from "@services"
import { useParams } from "next/navigation"
import { isErrorResponse } from "@common"

export interface LectureDetailsContextValue {
  state: LectureDetailsState;
  dispatch: React.Dispatch<LectureDetailsAction>;
  functions: {
    fetchAndSetLecture: () => Promise<void>;
  };
}

export const LectureDetailsContext =
  createContext<LectureDetailsContextValue | null>(null)

export const LectureDetailsProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useLectureDetailsReducer()

    const input = useParams()
    const lectureId = input.id as string

    const fetchAndSetLecture = useCallback(async () => {
        const response = await findOneLecture(
            {
                lectureId,
            },
            {
                lectureId: true,
                title: true,
                lectureVideoId: true,
                thumbnailId: true,
                videoType: true,
                resources: {
                    resourceId: true,
                    fileId: true,
                },
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_LECTURE",
                payload: response,
            })
            dispatch({
                type: "SET_FINISH_FETCH",
                payload: true,
            })
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetLecture()
        }
        handleEffect()
    }, [])

    const lectureDetailsContextValue: LectureDetailsContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetLecture,
            },
        }),
        [state, dispatch]
    )

    return (
        <LectureDetailsContext.Provider value={lectureDetailsContextValue}>
            {children}
        </LectureDetailsContext.Provider>
    )
}
