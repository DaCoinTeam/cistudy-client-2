/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
    ReactNode,
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react"
import React from "react"
import {
    Disclosure,
    ErrorResponse,
    AccountEntity,
    generateClientId,
} from "@common"
import { FindManyCoursesOutputData, findManyCourses, init } from "@services"
import useSWR, { SWRResponse } from "swr"
import { RootAction, RootState, useRootReducer } from "./useRootReducer"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { Formik, FormikProps } from "formik"
import { useRouter } from "next/navigation"
import { useDisclosure } from "@nextui-org/react"
import { useSocketClient } from "./useSocketClient"
import { Socket } from "socket.io-client"
import { NotifyFn, ToastRef, ToastRefSelectors } from "../_components"

interface FormikValues {
  searchValue: string;
}

const initialValues: FormikValues = {
    searchValue: "",
}

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<AccountEntity | null, ErrorResponse>;
    coursesSwr: SWRInfiniteResponse<FindManyCoursesOutputData, ErrorResponse>;
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

export const COLUMNS_PER_PAGE = 5

interface WrappedRootProviderSelectors {
  mutate: any;
}

const WrappedRootProvider = forwardRef<
  WrappedRootProviderSelectors,
  { children: ReactNode; formik: FormikProps<FormikValues> }
>((props, ref) => {
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

    const fetchCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourses(
                {
                    options: {
                        searchValue: "",
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                    },
                },
                {
                    results: {
                        courseId: true,
                        title: true,
                        creator: {
                            avatarId: true,
                            username: true,
                            avatarUrl: true,
                            kind: true,
                        },
                        thumbnailId: true,
                        description: true,
                        price: true,

                    },
                    metadata: {
                        count: true,
                        categories: {
                            categoryId: true,
                            name: true,
                        },
                        // topics: {
                        //     name: true,
                        //     topicId: true
                        // },
                    },
                }
            )
        },
        [reducer]
    )

    const profileSwr = useSWR(["PROFILE"], fetchProfile)

    const coursesSwr = useSWRInfinite((key) => [key, "COURSES"], fetchCourses, {
        revalidateFirstPage: false,
    })

    useImperativeHandle(ref, () => ({
        mutate: coursesSwr.mutate,
    }))

    useEffect(() => {
        generateClientId()
    }, [])

    const toastRef = useRef<ToastRefSelectors | null>(null)

    const rootContextValue: RootContextValue = useMemo(
        () => ({
            swrs: {
                profileSwr,
                coursesSwr,
            },
            formik,
            reducer,
            disclosures: {
                notConnectWalletModalDisclosure,
            },
            socket,
            notify: toastRef.current?.notify,
        }),
        [profileSwr, coursesSwr, reducer, notConnectWalletModalDisclosure, socket]
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
