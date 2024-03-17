import { Card, CardFooter, CardHeader, Image, Spacer } from "@nextui-org/react"
import Rating from "../../../courses/[id]/_components/Rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faStar } from "@fortawesome/free-solid-svg-icons"
// import Rating from "../../../../courses/[id]/_components/Rating"
import { BriefcaseIcon, UserIcon  } from "@heroicons/react/24/outline"

interface CourseInterface {
  id?: number;
  title?: string;
  thumbnail?: string;
  price?: string;
  authorImg?: string;
  authorName?: string;
  rating?: number;
}
export const CourseCard = (props: CourseInterface) => {
    console.log(props)
    return (
    // <Card className='col-span-12 sm:col-span-4 h-[310px]'>
    //     <Image
    //         removeWrapper
    //         alt='Card background'
    //         className='z-0 w-full h-full object-cover'
    //         src={props.thumbnail}
    //     />
    //     <CardFooter className='absolute z-10 bottom-1 flex-col !items-start'>
    //         <p className='text-tiny text-white/60 uppercase font-bold'>
    //   Plant a tree
    //         </p>
    //         <h4 className='text-white font-medium text-large'>{props.title}</h4>
    //     </CardFooter>
    // </Card>
        <Card isFooterBlurred className="col-span-12 sm:col-span-7 h-[280px] border-divider">
            {/* <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                <h4 className="text-white/90 font-medium text-xl">Intermediate</h4>
            </CardHeader> */}
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={props.thumbnail}
            />
            <div className="absolute bottom-28 left-4 flex items-center ">
                <Image
                    alt="Breathing app icon"
                    className="rounded-full w-9 h-9 bg-black object-cover me-1"
                    src={props.authorImg}
                />
                <div className="rounded px-2 py-1 ">
                    <p className="text-sm text-white font-semibold ">{props.authorName}</p>
                </div>
            </div>
            <CardFooter className="absolute bg-white bottom-0 z-10  border-default-600 dark:border-default-100 h-[100px] flex-col px-4 justify-items-start">
                <div className="h-[40px] mb-1 flex">
                    <p className="text-sm text-gray-900 font-bold">{props.title}</p>
                </div>
                <div className="flex flex-grow gap-2 w-full justify-between">
                    <div className="flex items-center"> 
                        <FontAwesomeIcon icon={faStar}  className="text-yellow-500 w-4 h-4 me-2  border p-1 rounded-full " /> 
                        <span className="text-tiny"> {props.rating || 5}</span>
                    </div>
                    <div className="flex items-center  "> 
                        <UserIcon className='text-gray-800 w-4 h-4 me-2 ' />
                        <span className="text-tiny">125</span>
                    </div>
                    <div className="flex items-center  "> 
                        <BriefcaseIcon className='text-gray-800 w-4 h-4 me-2 ' />
                        <span className="text-tiny"> Intermediate</span>
                    </div>
                </div>
                {/* <Button radius="full" size="sm">Get App</Button> */}
            </CardFooter>
        </Card>
        // <Card className="py-4">
        //     <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        //         <p className="text-tiny uppercase font-bold">{props.authorName}</p>
        //         <p className="text-base ">{props.rating}</p>
        //         <h4 className="font-bold text-large">{props.title}</h4>
        //     </CardHeader>
        //     <CardBody className="overflow-visible py-2">
        //         <Image
        //             alt="Card background"
        //             className="object-cover rounded-xl"
        //             src={props.thumbnail}
        //             width={270}
        //         />
        //     </CardBody>
        // </Card>
    )
}

