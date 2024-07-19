"use client"
import { Button, Image, Link } from "@nextui-org/react"
import { BG_IMG_1, BG_IMG_2 } from "@config"
import { ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const Heading = () => {
    const router = useRouter()
    return (
        <div className='grid grid-cols-5 gap-16 items-center justify-between h-[35rem] max-w-[1120px] mx-auto '>
            <div className='col-span-3 z-10'>
                <div>
                    <div className='text-4xl tracking-tight font-extrabold text-primary mb-6'>
            Share To Earn:
                        <div className='mt-3'>Where Sharing Sparks Earnings!</div>
                    </div>
                    <div className='text-xl font-medium  text-slate-700 leading-8'>
            We aim for a vibrant, interactive learning community where everyone
            benefits from active participation.
                    </div>
                </div>
                <div className='mt-6'>
                    <Button
                        color='secondary'
                        onClick={() => router.push("/courses")}
                        className='p-4 py-6 font-medium text-base'
                        endContent={
                            <div>
                                <ArrowRightIcon size={20} />
                            </div>
                        }
                    >
            Explore Courses
                    </Button>
                    <Link color='primary' className='ms-6 font-medium text-base'>
            More
                    </Link>
                </div>
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
