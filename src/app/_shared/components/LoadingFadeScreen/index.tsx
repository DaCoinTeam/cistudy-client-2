import { Spinner } from "@nextui-org/react"
import React from "react"

export interface LoadingFadeScreenProps {
  isLoading?: boolean;
}

export const LoadingFadeScreen = ({ isLoading }: LoadingFadeScreenProps) => {
    return (
        <>
            {
                isLoading ? (<div className="absolute w-screen h-screen grid place-items-center bg-foreground/20">
                    <Spinner size="lg" label="Loading" />
                </div>) : null
            }
        </>
    )
}
