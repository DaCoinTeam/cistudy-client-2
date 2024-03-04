"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useMemo,
} from "react"

import { findOneLecture } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, LectureEntity } from "@common"
import useSWR, { SWRResponse } from "swr"

export interface LectureDetailsContextValue {
  swrs: {
    lecturesSwr: SWRResponse<LectureEntity, ErrorResponse>;
  };
}

export const LectureDetailsContext =
  createContext<LectureDetailsContextValue | null>(null)

export const LectureDetailsProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const lectureId = params.id as string

    const fetchLecture = useCallback(async () => {
        return await findOneLecture(
            {
                params: {
                    lectureId,
                }
            },
            {
                lectureId: true,
                title: true,
                lectureVideoId: true,
                thumbnailId: true,
                videoType: true,
                description: true,
                numberOfViews: true,
                createdAt: true,
                resources: {
                    resourceId: true,
                    fileId: true,
                },
                section: {
                    course: {
                        creator: {
                            avatarId: true,
                            username: true,
                            numberOfFollowers: true
                        }
                    }
                }
            }
        )
    }, [])

    const lecturesSwr = useSWR(["LECTURE"], fetchLecture)

    const lectureDetailsContextValue: LectureDetailsContextValue = useMemo(
        () => ({
            swrs: {
                lecturesSwr
            }
        }),
        [lecturesSwr]
    )

    return (
        <LectureDetailsContext.Provider value={lectureDetailsContextValue}>
            {children}
        </LectureDetailsContext.Provider>
    )
}
