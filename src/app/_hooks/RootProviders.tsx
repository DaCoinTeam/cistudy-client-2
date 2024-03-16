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
import { Formik, FormikProps } from "formik"


interface FormikValues {
  searchValue: string;
  searchInputValue: string;
}

const initialValues: FormikValues = {
    searchValue: "",
    searchInputValue: ""
}

interface RootContextValue {
  swrs: {
    profileSwr: SWRResponse<UserEntity | null, ErrorResponse>;
    coursesSwr: SWRInfiniteResponse<FindManyCoursesOutputData, ErrorResponse>;
  };
  formik: FormikProps<FormikValues>,
  reducer: [RootState, React.Dispatch<RootAction>];
}

export const RootContext = createContext<RootContextValue | null>(null)

export const COLUMNS_PER_PAGE = 5

const WrappedRootProviders = (props: { children: ReactNode, formik: FormikProps<FormikValues> }) => {
    const reducer = useRootReducer()

    const { formik } = props

    const fetchProfile = useCallback(async () => {
        try {
            return await init({
                userId: true,
                username: true,
                email: true,
                avatarId: true,
                avatarUrl: true,
                coverPhotoId: true,
                kind: true
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
        [profileSwr, coursesSwr, reducer]
    )

    return (
        <RootContext.Provider value={rootContextValue}>
            {props.children}
        </RootContext.Provider>
    )
}


export const RootProviders = ({
    children
}: {
  children: ReactNode;
}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ searchInputValue }) => {
                console.log(searchInputValue)
            }}
        >
            {(formik) => (
                <WrappedRootProviders formik={formik}>
                    {children}
                </WrappedRootProviders>
            )}
        </Formik>
    )
}