"use client"
import { CertificateEntity, ErrorResponse } from "@common"
import { findOneCertificate } from "@services"
import { useParams } from "next/navigation"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useMemo,
} from "react"

import useSWR, { SWRResponse } from "swr"

export interface CertificateContextValue {
    swrs: {
        certificateSwr: SWRResponse<CertificateEntity, ErrorResponse>
    }
}

export const CertificateContext =
  createContext<CertificateContextValue | null>(null)

export const CertificateProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const params = useParams()
    const certificateId = params.id as string

    const fetchCertificate = useCallback(async () => {
        return await findOneCertificate(
            {
                certificateId
            } ,
            {
                certificateId: true,
                account: {
                    accountId: true,
                    username: true,
                    avatarId: true,
                    avatarUrl: true,
                    kind: true
                },
                course: {
                    courseId: true,
                    title: true,
                    description: true,
                    creator: {
                        avatarId: true,
                        avatarUrl: true,
                        kind: true,
                        numberOfFollowers: true,
                        accountId: true,
                        username: true
                    },
                    courseRatings: {
                        overallCourseRating: true,
                        totalNumberOfRatings: true,
                    },
                    numberOfEnrollments: true,
                    courseTargets: {
                        courseTargetId: true,
                        content: true,
                    }
                },
                createdAt: true,
                expiredDate: true
            }
        )
    }, [certificateId])

    const certificateSwr = useSWR("CERTIFICATE", fetchCertificate)

    const certificateContextValue: CertificateContextValue = useMemo(
        () => ({
            swrs: {
                certificateSwr
            }
        }),
        [certificateSwr]
    )

    return (
        <CertificateContext.Provider value={certificateContextValue}>
            {children}
        </CertificateContext.Provider>
    )
}
