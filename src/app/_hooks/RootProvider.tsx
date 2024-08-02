/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
    AccountEntity,
    CategoryEntity,
    Disclosure,
    ErrorResponse,
    generateClientId,
} from "@common"
import { useDisclosure } from "@nextui-org/react"
import { findManyCategories, findManyLevelCategories, FindManyReceivedNotificationsOutputData, findManyReceivedNotifications, Highlight, init, initLandingPage } from "@services"
import { Formik, FormikProps } from "formik"
import { useRouter } from "next/navigation"
import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef
} from "react"
import useSWR, { SWRResponse } from "swr"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { NotifyFn, ToastRef, ToastRefSelectors } from "../_components"
import { useFirebaseMessaging } from "./useFirebaseMessaging"
import { RootAction, RootState, useRootReducer } from "./useRootReducer"

interface FormikValues {
  searchValue: string;
}


const initialValues: FormikValues = {
    searchValue: "",
}

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<AccountEntity | null, ErrorResponse>;
    highlightSwr: SWRResponse<Highlight, ErrorResponse>;
    categoriesSwr: SWRResponse<Array<CategoryEntity>, ErrorResponse>;
    topicsSwr: SWRResponse<Array<CategoryEntity>, ErrorResponse>;
    notifySwr:SWRInfiniteResponse<
    FindManyReceivedNotificationsOutputData,
    ErrorResponse
>

  };
  formik: FormikProps<FormikValues>;
  reducer: [RootState, React.Dispatch<RootAction>];
  disclosures: {
    notConnectWalletModalDisclosure: Disclosure;
  };
  notify?: NotifyFn;
}

export const RootContext = createContext<RootContextValue | null>(null)


interface WrappedRootProviderSelectors {
  mutate: any;
}
export const COLUMNS_PER_PAGE = 5

const WrappedRootProvider = ((props : { children: ReactNode; formik: FormikProps<FormikValues> }) => {
    const reducer = useRootReducer()
    const { children, formik } = props

    const notConnectWalletModalDisclosure = useDisclosure()

    const fetchProfile = useCallback(async () => {
        try {
            return await init({
                accountId: true,
                username: true,
                email: true,
                avatarId: true,
                avatarUrl: true,
                coverPhotoId: true,
                kind: true,
                walletAddress: true,
                balance: true,
                roles: {
                    roleId: true,
                    name: true,
                },
                cart: {
                    cartId: true,
                    cartCourses: {
                        cartCourseId: true,
                        course: {
                            courseId: true,
                            title: true,
                            price: true,
                            discountPrice: true,
                            thumbnailId: true,
                            description: true,
                            courseRatings: {
                                overallCourseRating: true,
                                totalNumberOfRatings: true,
                            },
                            creator: {
                                accountId: true,
                                avatarUrl: true,
                                avatarId: true,
                                kind: true,
                                username: true,
                            },
                            numberOfLessons: true,
                            numberOfQuizzes: true,
                            numberOfResources: true,
                            numberOfEnrollments: true,
                        }
                    }
                }
            })
        } catch (ex) {
            return null
        }
    }, [])
    
    const fetchHighlight = useCallback(async () => {
        return await initLandingPage({
            totalNumberOfVerifiedAccounts: true,
            totalNumberOfAvailableCourses: true, 
            totalNumberOfPosts: true,
            highRatedCourses: {
                courseId: true,
                price: true,
                discountPrice: true,
                title: true,
                description: true,
                thumbnailId: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                },
                courseRatings: {
                    overallCourseRating: true,
                    totalNumberOfRatings: true
                },
                creator: {
                    accountId: true,
                    username: true, 
                    email: true,
                    avatarId: true,
                    avatarUrl: true,
                        
                }
            },
            mostEnrolledCourses: {
                courseId: true,
                price: true,
                discountPrice: true,
                title: true,
                description: true,
                thumbnailId: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                },
                courseRatings: {
                    overallCourseRating: true,
                    totalNumberOfRatings: true
                },
                creator: {
                    accountId: true,
                    username: true, 
                    email: true,
                    avatarId: true,
                    avatarUrl: true
                }
            },
            recentlyAddedCourses: {
                courseId: true,
                price: true,
                discountPrice: true,
                title: true,
                description: true,
                thumbnailId: true,
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                },
                courseRatings: {
                    overallCourseRating: true,
                    totalNumberOfRatings: true
                },
                creator: {
                    accountId: true,
                    username: true, 
                    email: true,
                    avatarId: true,
                    avatarUrl: true
                }
            },
            highRatedInstructors: {
                accountId: true,
                username: true,
                email: true,
                avatarId: true,
                avatarUrl: true,
                kind: true,
                accountRatings: {
                    overallAccountRating: true,
                }
            }
        })
    }, [])

    
    const fetchCategories = useCallback(async () => {
        return await findManyCategories(
            {
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
                            },
                        },
                    },
                },

            }
        )
    }, [])

    const fetchTopics = useCallback(async () => {
        return await findManyLevelCategories(
            {
                params: {
                    level: 2,
                },
            },
            {
                categoryId: true,
                name: true,
                level: true,
            }
            
        )
    }, [])

    
   
    const topicsSwr = useSWR(["TOPICS"], fetchTopics, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const categoriesSwr = useSWR(["CATEGORIES"], fetchCategories, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const profileSwr = useSWR(["PROFILE"], fetchProfile)

    const highlightSwr = useSWR(["HIGHLIGHT"], fetchHighlight)

    const fetchNotifications = useCallback(
        async ([key]: [number, string]) => {
            return await findManyReceivedNotifications(
                {
                    options: {
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
                    results: {
                        title: true,
                        description: true,
                        createdAt: true,
                        senderId: true,
                        referenceLink: true,
                        viewed: true,
                        notificationId: true,
                        sender: {
                            accountId: true,
                            avatarId: true,
                            avatarUrl: true,
                            kind: true,
                        }

                    },
                    metadata: {
                        count: true,
                       
                    },
                }
            )
        },
        [profileSwr]
    )
    const notifySwr = useSWRInfinite(
        (key) => [key, "NOTIFICATIONS", profileSwr?.data?.accountId],   
        fetchNotifications,
        {
            revalidateFirstPage: false,
        }
    )
    useEffect(() => {
        generateClientId()
    }, [])

    const toastRef = useRef<ToastRefSelectors | null>(null)

    useFirebaseMessaging()

    const rootContextValue: RootContextValue = useMemo(
        () => ({
            swrs: {
                profileSwr,
                highlightSwr,
                categoriesSwr,
                topicsSwr,
                notifySwr
            },
            formik,
            reducer,
            disclosures: {
                notConnectWalletModalDisclosure,
            },
            notify: toastRef.current?.notify,
        }),
        [profileSwr, highlightSwr, notifySwr, categoriesSwr, reducer, notConnectWalletModalDisclosure]
    )

    return (
        <RootContext.Provider value={rootContextValue}>
            {children}
            <ToastRef ref={toastRef} />
        </RootContext.Provider>
    )
})

export const RootProvider = ({ children }: { children: ReactNode }) => {
    const ref = useRef<WrappedRootProviderSelectors | null>(null)

    const router = useRouter()
    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ searchValue }) => {
                const urlInstance = new URL(window.location.href)
                urlInstance.pathname = "/courses"
                urlInstance.searchParams.set("searchValue", searchValue)
                router.push(urlInstance.toString())
                await ref.current?.mutate()
            }}
        >
            {(formik) => (
                <WrappedRootProvider formik={formik}>
                    {children}
                </WrappedRootProvider>
            )}
        </Formik>
    )
}