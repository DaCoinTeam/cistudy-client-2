"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findOneLecture } from "@services"
import { useParams } from "next/navigation"
import { ErrorResponse, LectureEntity } from "@common"
import useSWR, { SWRResponse } from "swr"
import { RootContext } from "../../../_hooks"

export interface LectureDetailsContextValue {
  swrs: {
    lecturesSwr: SWRResponse<LectureEntity | undefined, ErrorResponse>;
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

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const fetchLecture = useCallback(async () => {
        if (!profile) return
        const { userId } = profile

        return await findOneLecture(
            {
                params: {
                    lectureId,
                },
                options: {
                    followerId: userId,
                },
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
                    sectionId: true,
                    course: {
                        creator: {
                            avatarId: true,
                            username: true,
                            numberOfFollowers: true,
                            userId: true,
                            followed: true,
                        },
                        sections: {
                            sectionId: true,
                            title: true,
                            lectures: {
                                lectureId: true,
                                thumbnailId: true,
                                title: true
                            }
                        }
                    },
                },
            }
        )
    }, [profile?.userId])

    const lecturesSwr = useSWR(profile?.userId ? ["LECTURE"] : null, fetchLecture)

    const lectureDetailsContextValue: LectureDetailsContextValue = useMemo(
        () => ({
            swrs: {
                lecturesSwr,
            },
        }),
        [lecturesSwr]
    )

    return (
        <LectureDetailsContext.Provider value={lectureDetailsContextValue}>
            {children}
        </LectureDetailsContext.Provider>
    )
}
