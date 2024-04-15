import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, CardFooter, CardHeader, Image, User } from "@nextui-org/react"
// import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/outline"
import { CourseEntity } from "@common"
import { getAssetUrl, getAvatarUrl } from "../../../../services/server"

// interface CourseInterface {
//   id?: number;
//   title?: string;
//   thumbnail?: string;
//   price?: string;
//   authorImg?: string;
//   authorName?: string;
//   rating?: number;
//   level?: string;
// }
export const CourseCard = (props: CourseEntity) => {
    const { title, creator, courseTopics, courseSubcategories, category, thumbnailId, price, } = { ...props }
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = {
        ...creator,
    }
    return (
        <Card
            // isFooterBlurred
            className='col-span-12 sm:col-span-7 h-[280px] border border-divider'
        >
            <CardHeader className="p-0">
                <Image
                    removeWrapper
                    alt='Relaxing app background'
                    className='z-0 w-full h-full object-cover'
                    src={getAssetUrl(thumbnailId)}
                />
            </CardHeader>
            
            <div className='absolute bottom-28 left-4 flex items-center'>
            </div>
            <CardFooter className='absolute bottom-0 z-10 bg-content1 h-[130px] flex-col px-4 justify-start'>
                <p className='text-base font-bold line-clamp-2'>{title}</p>                
                
             
                <User
                    className= "w-full justify-start py-1"
                    avatarProps={{
                        src: getAvatarUrl({
                            avatarId,
                            avatarUrl,
                            kind,
                        }),
                        className: "w-7 h-7 justify-start"
                    }}
                    name={username}
                />
                               
                <div className='flex flex-grow gap-2 w-full justify-between'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon
                            icon={faStar}
                            className='text-yellow-500 w-4 h-4 me-2  p-1 '
                        />
                        <span className='text-sm font-semibold'>5.0</span>
                    </div>
                    {/* <div className='flex items-center  '>
                        <UserIcon className='w-4 h-4 me-2 ' />
                        <span className='text-sm font-semibold'>{}</span>
                    </div> */}
                    <div className='flex items-center'>
                        {/* <BriefcaseIcon className=' w-4 h-4 me-2 ' /> */}
                        <span className='text-base font-semibold'>{price} STARCI</span>
                    </div>
                    
                </div>
            </CardFooter>
        </Card>
 
    )
}
