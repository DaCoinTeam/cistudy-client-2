import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spacer,
} from "@nextui-org/react"

import { getAssetUrl } from "@services"
import { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { ClipboardPenLineIcon, FolderOpenIcon, PlaySquareIcon } from "lucide-react"
export const CourseSideBar = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { previewVideoId } = { ...course }
    return (
        <Card shadow="none" radius="md" className="w-80 border border-divider">
            <CardHeader className="p-0 pb-2 object-cover">
                <VideoPlayer
                    className="w-full rounded-b-none h-[180px]"
                    src={getAssetUrl(previewVideoId)}
                />
            </CardHeader>
            <CardBody className="p-4">
                <div>
                    <div className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              599 STARCI
                    </div>
                </div>
                <Spacer y={4} />
                <div>
                    <div className="text">
              This course included
                    </div>
                    <Spacer y={2}/>
                    <div className="flex text-foreground-500 flex-col gap-2">
                        <div className="flex gap-2">
                            <PlaySquareIcon size={20} strokeWidth={3/2}/>
                            <div className="text-sm"> 4 lectures</div> 
                        </div>
                        <div className="flex text-foreground-500 gap-2">
                            <FolderOpenIcon size={20} strokeWidth={3/2}/>
                            <div className="text-sm"> 7 downloadable resources </div> 
                        </div>
                    </div>    
                </div>
            </CardBody>
            <CardFooter className="p-4 pt-2 flex-col gap-4">
                <Button startContent={<ClipboardPenLineIcon height={20} width={20} strokeWidth={3/2} />} color="primary" fullWidth>
          Enroll now
                </Button>
                <Button
                    color="primary"
                    variant="light"
                    startContent={<ShoppingCartIcon height={20} width={20} />}
                    fullWidth
                >
          Add to cart
                </Button>
            </CardFooter>
        </Card>
    )
}
