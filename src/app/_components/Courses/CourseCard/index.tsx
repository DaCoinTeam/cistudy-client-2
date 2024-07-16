import { CourseEntity } from "@common"
import { Card, CardBody, CardFooter, Divider, Image, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "../../../../services/server"
import { Stars } from "../../../_shared"
import { useRouter } from "next/navigation"

export const CourseCard = (props: CourseEntity) => {
    const { title, creator, thumbnailId, description, price, courseId, courseRatings } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const router = useRouter()
    return (
        <Card key={courseId} onPress={() => router.push(`/courses/${courseId}`)} className="w-full hover:cursor-pointer" >
            {thumbnailId && (
                <Image
                    alt='course image'
                    width={400}
                    className='z-10  rounded-b-none object-cover  max-h-[10rem]'
                    src={getAssetUrl(thumbnailId)!}
                />
            )}
            <CardBody className="pb-1">
                <div className="text-lg mb-2 line-clamp-2"> {title} </div>
                <div className="text-sm text-foreground-400  line-clamp-2"> {description} </div>
            </CardBody>
            <CardFooter >
                <div className="flex gap-4 h-8 items-center mb-2">
                    <User classNames={{
                        name: "text-sm"
                    }} avatarProps={{
                        src: getAvatarUrl({
                            avatarUrl: avatarUrl,
                            avatarId: avatarId,
                            kind: kind
                        })
                    }} name={username} description={"2 followers"}/>
                    <Divider orientation="vertical"/>
                    <div className="flex flex-col items-end">
                        <div className="text-sm font-semibold text-primary p-0 ms-1">{price} STARCI</div>

                        <div className="flex flex-row justify-center items-end leading-4">
                            <Stars  readonly initialValue={courseRatings.overallCourseRating} />
                            <div className="text-xs text-foreground-400 ms-1">(5)</div>
                        </div>
                    </div>
                    
                </div>
            </CardFooter>
        </Card>


    // <div onClick={() => router.push(`/courses/${courseId}`)} className='col-span-12 sm:col-span-7 h-auto max-h-[17.5rem] border border-divider shadow-none rounded-xl hover:cursor-pointer'>
    //     <div className='w-full h-auto max-h-[10rem] bg-lime-600 rounded-t-xl'>
    //         {thumbnailId && (
    //             <Image
    //                 alt='course image'
    //                 width={400}
    //                 className='z-10  rounded-b-none object-cover  max-h-[10rem]'
    //                 src={getAssetUrl(thumbnailId)!}
    //             />
    //         )}
    //     </div>

    //     <div className=' h-auto min-h-[7rem] p-3 justify-start items-start z-0'>
    //         <div className='text-sm font-semibold line-clamp-2 pb-1 h-auto min-h-[2.5rem]'>
    //             {title}
    //         </div>
    //         <div className='flex flex-col'>
    //             <div className='flex pb-1 '>
    //                 <User
    //                     avatarProps={{
    //                         src: getAvatarUrl({
    //                             avatarId,
    //                             avatarUrl,
    //                             kind,
    //                         }),
    //                         className: "w-7 h-7 ",
    //                     }}
    //                     name={username}
    //                 />
    //             </div>

    //             <div className='flex  gap-2 w-full justify-between items-end'>
    //                 <div className='flex items-center'>
    //                     <StarIcon
    //                         width={24}
    //                         height={24}
    //                         className='text-yellow-500 me-2 p-1 '
    //                     />
    //                     <span className='text-sm font-semibold'>5.0</span>
    //                 </div>
    //                 <div className='flex items-center'>
    //                     <span className='text-sm font-semibold'>{price} STARCI</span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    )
}
