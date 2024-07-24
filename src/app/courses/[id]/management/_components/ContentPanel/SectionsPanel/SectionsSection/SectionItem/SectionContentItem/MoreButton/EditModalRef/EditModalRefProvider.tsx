"use client"
import React, {
    ReactNode,
    createContext,
    useMemo,
} from "react"
import { Disclosure } from "@common"
import { useDisclosure } from "@nextui-org/react"
interface EditModalRefContextValue {
  discloresure: Disclosure
}

export const EditModalRefContext =
  createContext<EditModalRefContextValue | null>(null)

export const EditModalRefProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const discloresure = useDisclosure()

    const editModalRefContextValue: EditModalRefContextValue = useMemo(
        () => ({
            discloresure
        }),
        [discloresure]
    )

    return (
        <EditModalRefContext.Provider value={editModalRefContextValue}>
            {children}
        </EditModalRefContext.Provider>
    )
}