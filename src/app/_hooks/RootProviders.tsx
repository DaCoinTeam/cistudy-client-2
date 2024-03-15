"use client"
import {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
} from "react"
import React from "react"
import { ErrorResponse, UserEntity, generateClientId } from "@common"
import { FindManyCoursesOutputData, findManyCourses, init } from "@services"
import useSWR, { SWRResponse } from "swr"
import { RootAction, RootState, useRootReducer } from "./useRootReducer"
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite"
import { FormikProps, useFormik } from "formik"
import { useRouter } from "next/navigation"

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
}

export const RootContext = createContext<RootContextValue | null>(null)

export const COLUMNS_PER_PAGE = 5

const WrappedRootProviders = (props: {
  children: ReactNode;
  formik: FormikProps<FormikValues>;
  coursesSwr: SWRInfiniteResponse<FindManyCoursesOutputData, ErrorResponse>;
}) => {
    const reducer = useRootReducer()

    const { formik, coursesSwr } = props

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
            })
        } catch (ex) {
            return null
        }
    }, [])

    const profileSwr = useSWR(
        [formik.values.searchValue, "PROFILE"],
        fetchProfile,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    )

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
        }),
        [profileSwr, coursesSwr, reducer, formik]
    )

    return (
        <RootContext.Provider value={rootContextValue}>
            {props.children}
        </RootContext.Provider>
    )
}

export const RootProviders = ({ children }: { children: ReactNode }) => {
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async ({ searchValue }) => {
            const urlInstance = new URL(window.location.href)
            const searchParams = urlInstance.searchParams
            urlInstance.pathname = "/courses"
            if (searchParams.has("searchValue")) {
                searchParams.set("searchValue", searchValue)
            } else {
                searchParams.append("searchValue", searchValue)
            }
            router.push(urlInstance.toString())
            await coursesSwr.mutate()
        },
    })

    const fetchCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourses(
                {
                    options: {
                        skip: COLUMNS_PER_PAGE * key,
                        take: COLUMNS_PER_PAGE,
                        searchValue: formik.values.searchValue,
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
                        categories: {
                            categoryId: true,
                            name: true,
                        },
                        subcategories: {
                            subcategoryId: true,
                            name: true,
                        },
                        topics: {
                            topicId: true,
                            name: true,
                        },
                    },
                }
            )
        },
        [formik.values.searchValue]
    )

    const coursesSwr = useSWRInfinite((key) => [key, "COURSES"], fetchCourses, {
        revalidateFirstPage: false,
    })

    const router = useRouter()
    return (
        <WrappedRootProviders formik={formik} coursesSwr={coursesSwr}>
            {children}
        </WrappedRootProviders>
    )
}
