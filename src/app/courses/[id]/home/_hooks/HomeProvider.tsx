"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {
    HomeAction,
    HomeState,
    useHomeReducer,
} from "./useHomeReducer"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"
import { findOneCourseAuth } from "../../../../../services/server"
import { CourseDetailsContext } from "../../_hooks"
import { RootContext } from "../../../../_hooks"

export interface HomeContextValue {
  reducer: [HomeState, React.Dispatch<HomeAction>];
  swrs: {
    courseHomeSwr: SWRResponse<CourseEntity | undefined, ErrorResponse>;
  };
}

export const HomeContext = createContext<HomeContextValue | null>(
    null
)

const WrappedHomeProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useHomeReducer()

    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data : course } = courseSwr
    const { courseId } = { ...course }

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr
    const { accountId } = { ...profile }

    const fetchCourseHome = useCallback(async () => {
        if (!courseId) return
        return await findOneCourseAuth(
            {
                params: {
                    courseId,
                    accountId: accountId as string,
                } 
            },
            {
                courseId: true,
                title: true,
                description: true,
                previewVideoId: true,
                thumbnailId: true,
                price: true,
                discountPrice: true,
                enableDiscount: true,
                isCreator: true,
                enrolled: true,
                completedContents: true,
                totalContents: true,
                students: {
                    accountId: true,
                    username: true,
                    avatarId: true,
                    avatarUrl: true,
                    kind: true
                },
                certificate: {
                    certificateId: true
                },
                certificateStatus: true,
                courseRatings: {
                    numberOf1StarRatings: true,
                    numberOf2StarRatings:true,
                    numberOf3StarRatings: true,
                    numberOf4StarRatings: true,
                    numberOf5StarRatings: true,
                    overallCourseRating: true,
                    totalNumberOfRatings: true,
                },
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                    position: true,
                },
                sections: {
                    sectionId: true,
                    title: true,
                    position: true,
                    lockState: true,
                    contents: {
                        completeState: true,
                        position: true,
                        sectionContentId: true,
                        title: true,
                        type: true,
                        lesson: {
                            thumbnailId: true,
                            lessonVideoId: true,
                            description: true,
                            videoType: true,
                            durationInSeconds: true
                        },
                        quiz: {
                            quizId: true,
                            passingPercent: true,
                            questions: {
                                quizQuestionId: true
                            },
                        },
                        resource: {
                            attachments: {
                                createdAt: true
                            }
                        }
                    }
                },
                creator: {
                    avatarId: true,
                    username: true,
                    numberOfFollowers: true,
                    avatarUrl: true,
                    kind: true,
                    accountId: true,
                    walletAddress: true
                },
                numberOfLessons: true,
                numberOfQuizzes: true,
                numberOfResources: true
            }
        )
    }, [courseId])

    const courseHomeSwr = useSWR(courseId ? ["COURSE_HOME"] : null, fetchCourseHome, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const homeContextValue: HomeContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                courseHomeSwr
            }
        }),
        [reducer, courseHomeSwr]
    )
    

    return (
        <HomeContext.Provider value={homeContextValue}>
            {children}
        </HomeContext.Provider>
    )
}

export const HomeProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedHomeProvider>{children}</WrappedHomeProvider>
    </SWRConfig>
)
