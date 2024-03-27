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
import { Disclosure, ErrorResponse, UserEntity, generateClientId } from "@common"
import { FindManyCoursesOutputData, findManyCourses, init } from "@services"
import useSWR, { SWRResponse } from "swr"
import { RootAction, RootState, useRootReducer } from "./useRootReducer"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { Formik, FormikProps } from "formik"
import { useRouter } from "next/navigation"
import { useDisclosure } from "@nextui-org/react"

interface FormikValues {
  searchValue: string;
}

const initialValues: FormikValues = {
    searchValue: "",
}

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<UserEntity | null, ErrorResponse>;
    coursesSwr: SWRInfiniteResponse<FindManyCoursesOutputData, ErrorResponse>;
  };
  formik: FormikProps<FormikValues>;
  reducer: [RootState, React.Dispatch<RootAction>];
  disclosures: {
    notConnectWalletModalDisclosure: Disclosure;
  };
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
    const { formik } = props

    const notConnectWalletModalDisclosure = useDisclosure()

    const fetchProfile = useCallback(async () => {
        try {
            return await init({
                userId: true,
                username: true,
                email: true,
                avatarId: true,
                avatarUrl: true,
                coverPhotoId: true,
                kind: true,
                balance: true
            })
        } catch (ex) {
            console.log(ex)
            return null
        }
    }, [])

    const fetchCourses = useCallback(async ([key]: [number, string]) => {
        return await findManyCourses(
            {
                options: {
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
                    },
                    thumbnailId: true,
                    description: true,
                },
                metadata: {
                    count: true,
                },
            }
        )
    }, [])

    const profileSwr = useSWR(["PROFILE"], fetchProfile, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const coursesSwr = useSWRInfinite((key) => [key, "COURSES"], fetchCourses, {
        revalidateFirstPage: false,
    })

    useImperativeHandle(ref, () => ({
        mutate: coursesSwr.mutate,
    }))

    useEffect(() => {
        generateClientId()
    }, [])

    const rootContextValue: RootContextValue = useMemo(
        () => ({
            swrs: {
                profileSwr,
                coursesSwr,
            },
            formik,
            reducer,
            disclosures: {
                notConnectWalletModalDisclosure
            }
        }),
        [profileSwr, coursesSwr, reducer]
    )

    return (
        <RootContext.Provider value={rootContextValue}>
            {props.children}
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