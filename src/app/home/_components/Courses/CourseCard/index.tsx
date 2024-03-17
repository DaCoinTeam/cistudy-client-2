import React from "react"
import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { Stars } from "../../../../_shared"

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
        <Card isFooterBlurred className="col-span-12 sm:col-span-7 h-[280px]">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                <h4 className="text-white/90 font-medium text-xl">Intermediate</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={props.thumbnail}
            />
            <CardFooter className="absolute bg-white/80 bottom-0 z-10  border-default-600 dark:border-default-100 h-[110px] flex-col ps-4 justify-items-start">
                <div>
                    <p className="text-2xl text-gray-900 font-bold">{props.title}</p>
                </div>
                <div className="flex flex-grow gap-2 items-center w-full ps-2">
                    <Image
                        alt="Breathing app icon"
                        className="rounded-full w-16 h-16 bg-black object-cover me-2"
                        src={props.authorImg}
                    />
                    <div className="flex flex-col">
                        <p className="text-2xl text-gray-900 font-medium ">{props.authorName}</p>
                        <div className=" text-gray-900 font-bold">
                            <Stars />
                        </div>
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

