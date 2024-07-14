"use client"
import React, { ReactNode, createContext, useEffect, useMemo } from "react"

import { verifyRegistration } from "@services"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { useSearchParams } from "next/navigation"

export interface VerifyRegistrationContextValue {
  swrs: {
    verifyRegistrationSwrMutation: SWRMutationResponse<
      void,
      unknown,
      "VERIFY_REGISTRATION",
      never
    >;
  };
}

export const VerifyRegistrationContext =
  createContext<VerifyRegistrationContextValue | null>(null)

export const VerifyRegistrationProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const searchParams = useSearchParams()

    const verifyRegistrationSwrMutation = useSWRMutation(
        "VERIFY_REGISTRATION",
        async () => {
            await verifyRegistration({
                token: searchParams.get("token") ?? "",
            })
        }
    )

    useEffect(() => {
        const handleEffect = async () => {
            await verifyRegistrationSwrMutation.trigger()
        }
        handleEffect()
    }, [])

    const verifyRegistrationContextValue: VerifyRegistrationContextValue =
    useMemo(
        () => ({
            swrs: {
                verifyRegistrationSwrMutation,
            },
        }),
        [verifyRegistrationSwrMutation]
    )

    return (
        <VerifyRegistrationContext.Provider value={verifyRegistrationContextValue}>
            {children}
        </VerifyRegistrationContext.Provider>
    )
}
