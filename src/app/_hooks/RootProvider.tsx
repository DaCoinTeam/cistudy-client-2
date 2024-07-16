/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
    AccountEntity,
    Disclosure,
    ErrorResponse,
    generateClientId,
} from "@common"
import { useDisclosure } from "@nextui-org/react"
import { HighlightDTO, init, initLandingPage } from "@services"
import { Formik, FormikProps } from "formik"
import { useRouter } from "next/navigation"
import React, {
    ReactNode,
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef
} from "react"
import { Socket } from "socket.io-client"
import useSWR, { SWRResponse } from "swr"
import { NotifyFn, ToastRef, ToastRefSelectors } from "../_components"
import { RootAction, RootState, useRootReducer } from "./useRootReducer"
import { useSocketClient } from "./useSocketClient"

interface FormikValues {
  searchValue: string;
}


const initialValues: FormikValues = {
    searchValue: "",
}

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<AccountEntity | null, ErrorResponse>;
    highlightSwr: SWRResponse<HighlightDTO | null, ErrorResponse>;
  };
  formik: FormikProps<FormikValues>;
  reducer: [RootState, React.Dispatch<RootAction>];
  disclosures: {
    notConnectWalletModalDisclosure: Disclosure;
  };
  socket: Socket | null;
  notify?: NotifyFn;
}

export const RootContext = createContext<RootContextValue | null>(null)


interface WrappedRootProviderSelectors {
  mutate: any;
}

const WrappedRootProvider = forwardRef<
  WrappedRootProviderSelectors,
  { children: ReactNode; formik: FormikProps<FormikValues> }
>((props) => {
    const reducer = useRootReducer()
    const { children, formik } = props

    const notConnectWalletModalDisclosure = useDisclosure()
    const socket = useSocketClient()

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
            })
        } catch (ex) {
            // console.log(ex)
            return null
        }
    }, [])

   

    const profileSwr = useSWR(["PROFILE"], fetchProfile)

    const fetchHighlight = useCallback(async () => {
        try {
            return await initLandingPage({
                totalNumberOfVerifiedAccounts: true,
                totalNumberOfAvailableCourses: true, 
                totalNumberOfPosts: true,
                highRatedCourses: {
                    courseId: true,
                    price: true,
                    title: true,
                    description: true,
                    courseRatings: {
                        overallCourseRating: true
                    },
                    creator: {
                        accountId: true,
                        username: true, 
                        email: true,
                        avatarId: true,
                        avatarUrl: true
                    }
                },
                mostEnrolledCourses: {
                    courseId: true,
                    price: true,
                    title: true,
                    description: true,
                    courseRatings: {
                        overallCourseRating: true
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
                    title: true,
                    description: true,
                    courseRatings: {
                        overallCourseRating: true
                    },
                    creator: {
                        accountId: true,
                        username: true, 
                        email: true,
                        avatarId: true,
                        avatarUrl: true
                    }
                },
            })
        } catch (ex) {
            // console.log(ex)
            return null
        }
    }, [])
    const highlightSwr = useSWR(["HIGHLIGHT"], fetchHighlight)


    // useImperativeHandle(ref, () => ({
    //     mutate: coursesSwr.mutate,
    // }))

    useEffect(() => {
        generateClientId()
    }, [])

    const toastRef = useRef<ToastRefSelectors | null>(null)

    const rootContextValue: RootContextValue = useMemo(
        () => ({
            swrs: {
                profileSwr,
                highlightSwr
            },
            formik,
            reducer,
            disclosures: {
                notConnectWalletModalDisclosure,
            },
            socket,
            notify: toastRef.current?.notify,
        }),
        [profileSwr, reducer, notConnectWalletModalDisclosure, socket]
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
                <WrappedRootProvider ref={ref} formik={formik}>
                    {children}
                </WrappedRootProvider>
            )}
        </Formik>
    )
}
