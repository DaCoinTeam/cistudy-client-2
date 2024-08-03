"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo
} from "react"

import { findOneCourse } from "@services"
import { useParams } from "next/navigation"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseEntity, ErrorResponse } from "@common"
import { RootContext } from "../../../_hooks"
import {
    CourseDetailsState,
    SetRefreshReviewKeyAction,
    useCourseDetailsReducer,
} from "./useCourseDetailsReducer"

export interface CourseDetailsContextValue {
  swrs: {
    courseSwr: SWRResponse<CourseEntity, ErrorResponse>;
  };
  reducer: [CourseDetailsState, React.Dispatch<SetRefreshReviewKeyAction>];
}

export const CourseDetailsContext =
  createContext<CourseDetailsContextValue | null>(null)

export const WrappedCourseDetailsProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const courseId = params.id as string

    const reducer = useCourseDetailsReducer()

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const { accountId } = { ...profile }

    const fetchCourse = useCallback(async () => {
        return await findOneCourse(
            {
                params: {
                    courseId,
                    accountId,
                },
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
                isReviewed: true,
                enrolled: true,
                courseRatings: {
                    numberOf1StarRatings: true,
                    numberOf2StarRatings: true,
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
                    contents: {
                        position: true,
                        sectionContentId: true,
                        title: true,
                        type: true,
                        lesson: {
                            thumbnailId: true,
                            lessonVideoId: true,
                            description: true,
                            durationInSeconds: true,
                            isTrial: true,
                            videoType: true,
                        },
                        quiz: {
                            questions: {
                                mediaId: true,
                                mediaType: true,
                                answers: {
                                    quizQuestionAnswerId: true,
                                },
                                quizQuestionId: true,
                            },
                            passingPercent: true,
                        },
                        resource: {
                            attachments: {
                                resourceAttachmentId: true,
                                createdAt: true,
                            },
                        },
                    },
                },
                creator: {
                    avatarId: true,
                    username: true,
                    numberOfFollowers: true,
                    avatarUrl: true,
                    kind: true,
                    accountId: true,
                    walletAddress: true,
                    bio: true,
                },
                courseCategories: {
                    category: {
                        categoryId: true,
                        name: true,
                        level: true,
                    },
                },
                courseReviews: {
                    courseReviewId: true,
                    rating: true,
                    content: true,
                    account: {
                        avatarId: true,
                        avatarUrl: true,
                        kind: true,
                        username: true,
                        //numberOfFollowers: true
                    },
                    updatedAt: true,
                },
                numberOfLessons: true,
                numberOfQuizzes: true,
                numberOfResources: true,
            }
        )
    }, [accountId])

    const courseSwr = useSWR(["COURSE", accountId], fetchCourse, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const courseDetailsContextValue: CourseDetailsContextValue = useMemo(
        () => ({
            swrs: {
                courseSwr,
            },
            reducer,
        }),
        [courseSwr, reducer]
    )

    return (
        <CourseDetailsContext.Provider value={courseDetailsContextValue}>
            {children}
        </CourseDetailsContext.Provider>
    )
}

export const CourseDetailsProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCourseDetailsProvider>{children}</WrappedCourseDetailsProvider>
    </SWRConfig>
)
