
import { Button, Card, CardBody, CardHeader, Spacer } from "@nextui-org/react"

import { faChalkboard, faCircleQuestion, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getAssetUrl } from "@services"
import { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"
export const CourseSideBar = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    //  const course = {
    //     title:"React Native: Advanced Concepts",
    //     description:"Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!",
    //     rating:4.5,
    //     creator:"Stephen Grider",
    //     creatorImg:"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    //     thumbnailId:"https://i.ytimg.com/vi/sE4jbpJz_14/sddefault.jpg",
    //     level:"Intermediate",
    //     students:423554,
    //     courseTargets: [
    //         {
    //             courseTargetId: "tg1",
    //             content: "Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!",
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             position: 1,
    //         },
    //         {
    //             courseTargetId: "tg2",
    //             content: "Understand the latest Navigation options for new React Native apps",
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             position: 1,
    //         },
    //     ]

    // }
    return (
        <Card shadow="sm"  radius="lg"  className="w-80"  >
            <CardHeader className=" h-[180px] px-0 mb-2  object-cover">
                <VideoPlayer 
                    className="w-full rounded-b-none h-[180px]"
                    src={getAssetUrl(course?.previewVideoId)}                              
                />
            </CardHeader>
            <CardBody className=" p-0 " >

                <div className="px-5 pt-3">
                    <div>
                        <div className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">599 VND</div>
                    </div>
                    {/* <div >
                        <div className=" text-sm tracking-tight text-yellow-400 dark:text-white "> Best price </div>
                    </div> */}
                    
                    <Spacer y={3} />
                    <div >
                        <div className="text-sm font-bold text-gray-400 dark:text-white">Resource</div>
                        <Spacer y={2} />
                        <div className="mb-1">
                            <FontAwesomeIcon  icon={faChalkboard} className="inline-block mr-4 text-default-500" />
                           4 Lessons
                        </div>
                       
                        <div className="mb-1" >
                            <FontAwesomeIcon  icon={faCircleQuestion} className="inline-block mr-4 text-default-500" />
                         3 Quizzes
                        </div>
                      
                        <div  className="mb-1"> 
                            <FontAwesomeIcon  icon={faFolderOpen} className="inline-block mr-4 text-default-500" />
                            7 downloadable resources
                        </div>
                    </div>
                    <Spacer y={4} />
                    <div className="mx-2">
                        <Button color="primary" className="text-white font-bold" radius="full"  fullWidth>
                         Buy Now
                        </Button>
                        <Spacer y={2} />
                        <Button color="primary" radius="full"  variant="bordered" fullWidth>
                         Add to cart
                        </Button>
                    </div>
                    
                    <Spacer y={4} />
                </div>
                
                
            </CardBody>
        </Card>
    )
}
