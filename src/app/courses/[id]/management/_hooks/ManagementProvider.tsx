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
                enrolled: true,
                verifyStatus: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                    position: true,
                },
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
                            videoType: true,
                        },
                        quiz: {
                            quizId: true,
                            timeLimit: true,
                            passingPercent: true,
                            description: true,
                            questions: {
                                quizQuestionId: true,
                                mediaId: true,
                                mediaType: true,
                                position: true,
                                answers: {
                                    quizQuestionAnswerId: true,
                                    content: true,
                                    isCorrect: true,
                                    position: true,
                                    lastAnswer: true,
                                },
                                point: true,
                                question: true,
                            }
                        },
                        resource: {
                            resourceId: true,
                            description: true,
                            attachments: {
                                createdAt: true,
                                name: true,
                                fileId: true,
                                resourceAttachmentId: true,
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
