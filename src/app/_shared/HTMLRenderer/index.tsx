import { Skeleton } from "@nextui-org/react"
import React from "react"

interface HTMLRendererProps {
  className?: string;
  html?: string;
}

export const HTMLRenderer = (props: HTMLRendererProps) => {
    const { className, html } = props
    return (
        <div className={className}>
            {html ? (
                <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
                <div className="flex flex-col gap-1">
                    <Skeleton className="rounded-large h-3.5 my-[0.1875rem] w-full" />
                    <Skeleton className="rounded-large h-3.5 my-[0.1875rem] w-[75%]" />
                    <Skeleton className="rounded-large h-3.5 my-[0.1875rem] w-[50%]" />
                </div>
            )}
        </div>
    )
}
