"use client"
import { ReactNode, createContext, useCallback, useMemo } from "react"

import { CategoryEntity, ErrorResponse } from "@common"
import { findManyCategories } from "@services"
import useSWR, { SWRConfig, SWRResponse } from "swr"

export interface CourseFiltersContextValue {
  swrs: {
    categoriesSwr: SWRResponse<Array<CategoryEntity>, ErrorResponse>;
  };
}

export const CourseFiltersContext =
  createContext<CourseFiltersContextValue | null>(null)

export const WrappedCourseFiltersProvider = ({
    children,
}: {
  children: ReactNode;
}) => {

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

    const categoriesSwr = useSWR(["CATEGORIES"], fetchCategories, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })

    const courseFiltersContextValue: CourseFiltersContextValue = useMemo(
        () => ({
            swrs: {
                categoriesSwr,
            },
        }),
        [categoriesSwr]
    )

    return (
        <CourseFiltersContext.Provider value={courseFiltersContextValue}>
            {children}
        </CourseFiltersContext.Provider>
    )
}

export const CourseFiltersProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCourseFiltersProvider>{children}</WrappedCourseFiltersProvider>
    </SWRConfig>
)
