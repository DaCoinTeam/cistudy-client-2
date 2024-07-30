"use client"
import { Button, Card, CardBody, Link, Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { ContentDetailsContext } from "../../../_hooks"
import {
    MarkAsCompletedResourceInput,
    getAssetUrl,
    markAsCompletedResource,
} from "@services"
import useSWRMutation from "swr/mutation"
import { CompleteState } from "@common"

export const ResourceContent = () => {
    const { swrs } = useContext(ContentDetailsContext)!
    const { sectionContentSwr } = swrs
    const { data: sectionContentData, mutate } = sectionContentSwr
    const { resource, completeState } = { ...sectionContentData }

    const { trigger, isMutating } = useSWRMutation(
        "MARK_AS_COMPLETED_RESOURCE",
        async (_, { arg }: { arg: MarkAsCompletedResourceInput }) => {
            await markAsCompletedResource(arg)
            await mutate()
        }
    )

    return (
        <div>
            <div className="text-2xl">{sectionContentData?.title}</div>
            <Spacer y={1} />
            <div className="text-foreground-400 text-sm">{resource?.description}</div>
            <Spacer y={6} />
            <div>{resource?.attachments.length} attachments included</div>
            <Spacer y={4} />
            <div className="grid gap-4">
                {resource?.attachments.map(({ resourceAttachmentId, fileId, name }) => (
                    <Card
                        key={resourceAttachmentId}
                        isPressable
                        shadow="none"
                        className="bg-content2"
                    >
                        <CardBody className="p-4">
                            <div className="justify-between flex items-center">
                                <Link
                                    underline="always"
                                    size="sm"
                                    color="foreground"
                                    isExternal
                                    href={getAssetUrl(fileId)}
                                >
                                    {" "}
                                    {name}{" "}
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <Spacer y={6} />
            <Button
                isDisabled={completeState === CompleteState.Completed}
                isLoading={isMutating}
                color="primary"
                onPress={async () =>
                    await trigger({
                        data: {
                            resourceId: sectionContentData?.sectionContentId ?? "",
                        },
                    })
                }
            >
                {completeState !== CompleteState.Completed
                    ? "Mark As Completed"
                    : "Completed"}
            </Button>
        </div>
    )
}
