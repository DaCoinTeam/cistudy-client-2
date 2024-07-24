"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {
    ManagementAction,
    ManagementState,
    useManagementReducer,
} from "./useManagementReducer"
import { CourseDetailsContext } from "../../_hooks"
import { findOneCourse } from "@services"
import { CourseEntity, ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"

export interface ManagementContextValue {
  reducer: [ManagementState, React.Dispatch<ManagementAction>];
  swrs: {
    courseManagementSwr: SWRResponse<CourseEntity | undefined, ErrorResponse>;
  };
}

export const ManagementContext = createContext<ManagementContextValue | null>(
    null
)

const WrappedManagementProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useManagementReducer()

    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { courseId } = { ...course }

    const fetchCourseManagement = useCallback(async () => {
        if (!courseId) return

        return await findOneCourse(
            {
                params: {
                    courseId
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
                courseCategories: {
                    category: {
                        categoryId: true,
                        name: true,
                        level: true,
                        categoryParentRelations: {
                            category: {
                                categoryId: true,
                                name: true,
                                level: true,
                                categoryParentRelations: {
                                    category: {
                                        categoryId: true,
                                        name: true,
                                        level: true,
                                    }
                                }
                            }
                        }
                    }
                },
                enrolled: true,
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
                    contents: {
                        position: true,
                        sectionContentId: true,
                        title: true,
                        type: true,
                        lesson: {
                            thumbnailId: true,
                            lessonVideoId: true,
                            description: true,
                            durationInSeconds: true
                        },
                        quiz: {
                            questions: {
                                quizQuestionId: true
                            }
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

    const courseManagementSwr = useSWR(
        courseId ? ["COURSE_MANAGEMENT"] : null,
        fetchCourseManagement
    )

    const manageContextValue: ManagementContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                courseManagementSwr,
            },
        }),
        [reducer, courseManagementSwr]
    )

    return (
        <ManagementContext.Provider value={manageContextValue}>
            {children}
        </ManagementContext.Provider>
    )
}

export const ManagementProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedManagementProvider>{children}</WrappedManagementProvider>
    </SWRConfig>
)
