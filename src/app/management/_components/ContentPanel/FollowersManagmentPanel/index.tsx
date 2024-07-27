import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import React from "react"

export const FollowersManagementPanel = () => {
    const [isFollowed, setIsFollowed] = React.useState(false)

    return (
        <Card className="max-w-[340px] border border-divider " shadow="none">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src="https://thanhnien.mediacdn.vn/Uploaded/thaobtn/2022_11_14/e375b2356ecda893f1dc-9121.jpg" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Nguyen Van Tu Cuong</h4>
                        <h5 className="text-small tracking-tight text-default-400">@tucuong</h5>
                    </div>
                </div>
                <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <div>
            Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                </div>
                <span className="pt-2">
            #FrontendWithZoey 
                    <span className="py-2" aria-label="computer" role="img">
              💻
                    </span>
                </span>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">4</p>
                    <p className=" text-default-400 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">Followers</p>
                </div>
            </CardFooter>
        </Card>
    )
}