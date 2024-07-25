"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react"
import React, { useContext } from "react"
import { SectionContentPreviewContext } from "../../../_hooks" 
import { File, Flag, ThumbsDown, ThumbsUp } from "lucide-react"
import { getAssetUrl } from "@services"

export const ResourceContent = () => {
    const {swrs} = useContext(SectionContentPreviewContext)!
    const {sectionContentSwr} = swrs
    const {data: sectionContentData} = sectionContentSwr
    const {resource} = {...sectionContentData}

    return (
        <div>
            <Card>
                <CardHeader className="text-3xl font-bold text-primary p-6">{sectionContentData?.title}</CardHeader>
                <CardBody className="mt-4 p-6 gap-4">
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, ligula a consectetur vehicula, velit metus tristique libero, sit amet cursus quam enim vitae nunc. Ut luctus leo felis, sit amet molestie eros tempus eu. Praesent vehicula tristique tempus. Integer quis convallis libero. Vivamus pretium feugiat ultricies. Morbi elementum eget ante non mattis. Sed tempus rhoncus sapien, eu lobortis eros laoreet eget. Praesent bibendum nibh ut neque fermentum, eget scelerisque lectus iaculis.
                    </div>
                    {
                        resource?.attachments?.map((attachment, index) => (
                            <Link key={index} isExternal href={getAssetUrl(attachment.fileId)} className="text-primary p-6 bg-content2 rounded-xl hover:border-primary hover:border-2">
                                <File size={28} className="mr-4" />
                                {attachment.name}
                            </Link>
                        ))
                    }
                    <Button 
                        color="primary" 
                        size="lg" 
                        className="w-52 text-white"
                    >
                            Mark as Completed
                    </Button>
                    <Divider className="mt-12" />
                </CardBody>
                <CardFooter>
                    <div className="-mt-4">
                        <Button
                            startContent={<ThumbsUp size={20} />}
                            className="bg-transparent text-primary"
                        >
                        Like
                        </Button>
                        <Button
                            startContent={<ThumbsDown size={20} />}
                            className="bg-transparent text-primary"
                        >
                        Dislike
                        </Button>
                        <Button
                            startContent={<Flag size={20} />}
                            className="bg-transparent text-primary"
                        >
                        Report an issue
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}