"use client"
import { Avatar, AvatarGroup, Button, Image } from "@nextui-org/react"
import { BG_IMG_1, BG_IMG_2 } from "@config"
import { ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const Heading = () => {
    const router = useRouter()
    return (
        <div className='grid grid-cols-5 gap-16 items-center justify-between h-[35rem] max-w-[1120px] mx-auto '>
            <div className='col-span-3 z-10'>
                <div className='text-start mt-6'>
                    <h1 className='text-4xl tracking-tight text-slate-800 dark:text-slate-200 font-semibold mb-2'>
            Interact To Earn
                    </h1>
                    <h1 className='text-4xl font-semibold mb-2 tracking-tight text-slate-800  dark:text-slate-200'>
            Where Sharing Sparks{" "}
                        <span className='inline-block bg-blue-500 transform -skew-x-10 px-3 py-1 rounded text-white'>
                            <span className='transform skew-x-10 inline-block'>Earnings</span>
                        </span>
                    </h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-4 max-w-[520px]'>
            We aim for a vibrant, interactive learning community where everyone
            benefits from active participation and collaborative efforts.{" "}
                    </p>
                </div>
                <div className='mt-6'>
                    <Button
                        color='primary'
                        onClick={() => router.push("/courses")}
                        className='px-4 py-6 font-medium text-base'
                        endContent={
                            <div>
                                <ArrowRightIcon size={20} />
                            </div>
                        }
                    >
            Explore Courses
                    </Button>
                </div>
                {/* <div className='mt-12'>
                    <div className='text-base text-slate-500 mb-3 tracking-tight leading-8'>
            From 99+ Reviews
                    </div>
                    <AvatarGroup isBordered max={4} total={99}>

                        <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
                        <Avatar src='https://i.pravatar.cc/150?u=a04258a2462d826712d' />
                        <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
                        <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026302d' />
                        <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
                        <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026708c' />
                    </AvatarGroup>
                </div> */}
            </div>
            <div className='col-span-2'>
                <div className='relative  w-[86.0084%]  ml-auto overflow-hidden border border-gray-300/60 rounded-t-full p-2 z-10'>
                    <div className='overflow-hidden border-10 border-white rounded-t-full'>
                        <Image alt='img1' className='rounded-b-none ' src={BG_IMG_1} />
                    </div>
                </div>
                <div className='relative w-[69.7738%] mt-[-25.672%] ml-[-15%] overflow-hidden  border border-gray-300/60 rounded-bl-[75%] z-20'>
                    <div className='border-[8px] border-white dark:border-black overflow-hidden dark:bg-black rounded-bl-[75%]'>
                        <Image alt='img2' className='rounded-none' src={BG_IMG_2} />
                    </div>
                </div>
            </div>
        </div>
    )
}
