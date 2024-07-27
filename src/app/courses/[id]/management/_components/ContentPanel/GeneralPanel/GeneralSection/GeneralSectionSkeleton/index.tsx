import { Skeleton, Spacer } from "@nextui-org/react"

export const GeneralSectionSekeleton = () => {
    return (
        <div>
            <Skeleton className="w-1/5 rounded-xl mr-2">
                <div className="h-10 w-1/3 rounded-xl bg-default-300"/>
            </Skeleton>
            <Spacer y={6} />
            <Skeleton className="w-20 rounded-xl mb-2">
                <div className="h-3 w-20 rounded-xl bg-default-300"/>
            </Skeleton>
            <Skeleton className="rounded-xl mb-2">
                <div className="h-10 rounded-xl bg-default-300"/>
            </Skeleton>
            <Spacer y={4} />
            <Skeleton className="w-20 rounded-lg mb-2">
                <div className="h-3 w-20 rounded-lg bg-default-300"/>
            </Skeleton>
            <Skeleton className="rounded-xl mb-2">
                <div className="h-20 rounded-xl bg-default-300"/>
            </Skeleton>
            {Array.from({length: 3}).map((_, index) => (
                <div key={index}>
                    <Spacer y={4} />
                    <Skeleton className="w-20 rounded-lg mb-2">
                        <div className="h-3 w-20 rounded-lg bg-default-300"/>
                    </Skeleton>
                    <Skeleton className="rounded-xl mb-2">
                        <div className="h-10 rounded-xl bg-default-300"/>
                    </Skeleton>
                </div>
            ))}
            <Spacer y={6} />
            <div className="flex gap-2">
                <Skeleton className="w-20 rounded-xl mb-2">
                    <div className="h-10 w-20 rounded-xl bg-default-300"/>
                </Skeleton>
                <Skeleton className="w-20 rounded-xl mb-2">
                    <div className="h-10 w-20 rounded-xl bg-default-300"/>
                </Skeleton>
            </div>

        </div>

    )
}