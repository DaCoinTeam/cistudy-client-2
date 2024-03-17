import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, CardFooter, Image } from "@nextui-org/react"
import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/outline"

interface CourseInterface {
  id?: number;
  title?: string;
  thumbnail?: string;
  price?: string;
  authorImg?: string;
  authorName?: string;
  rating?: number;
  level?: string;
}
export const CourseCard = (props: CourseInterface) => {
    return (
        <Card
            isFooterBlurred
            className='col-span-12 sm:col-span-7 h-[280px]  '
        >
            <Image
                removeWrapper
                alt='Relaxing app background'
                className='z-0 w-full h-full object-cover'
                src={props.thumbnail}
            />
            <div className='absolute bottom-28 left-4 flex items-center '>
                <Image
                    alt='Breathing app icon'
                    className='rounded-full w-9 h-9 object-cover me-1'
                    src={props.authorImg}
                />
                <div className='rounded px-2 py-1 '>
                    <p className='text-sm text-white font-semibold '>
                        {props.authorName}
                    </p>
                </div>
            </div>
            <CardFooter className='absolute bottom-0 z-10 bg-content1 h-[100px] flex-col px-4 justify-items-start'>
                <div className='h-[40px] mb-2 flex'>
                    <p className='text-base font-bold'>{props.title}</p>
                </div>
                <div className='flex flex-grow gap-2 w-full justify-between'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon
                            icon={faStar}
                            className='text-yellow-500 w-4 h-4 me-2  p-1 '
                        />
                        <span className='text-sm font-semibold'> {props.rating || 5}</span>
                    </div>
                    <div className='flex items-center  '>
                        <UserIcon className='w-4 h-4 me-2 ' />
                        <span className='text-sm font-semibold'>125</span>
                    </div>
                    <div className='flex items-center  '>
                        <BriefcaseIcon className=' w-4 h-4 me-2 ' />
                        <span className='text-sm font-semibold'>{props.level}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
 
    )
}
