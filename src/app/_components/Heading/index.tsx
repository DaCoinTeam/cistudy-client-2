"use client"
import { Avatar, Button, Image, Link, Spacer } from "@nextui-org/react"
import { useContext } from "react"

import {
    ArrowRightIcon,
    AwardIcon,
    BookCheckIcon,
    LogInIcon,
    MessageSquareShareIcon,
    PresentationIcon,
    TrophyIcon,
    UserIcon,
} from "lucide-react"
import { RootContext } from "../../_hooks"
import { Stars } from "../../_shared"
import { BG_DECORATION, BG_IMG_1, BG_IMG_2 } from "@config"

export const Heading = () => {
    const { swrs } = useContext(RootContext)!
    const { highlightSwr } = { ...swrs }
    const { data } = { ...highlightSwr }
    const {
        totalNumberOfAvailableCourses,
        totalNumberOfPosts,
        totalNumberOfVerifiedAccounts,
    } = { ...data }
    return (
        <div className='relative overflow-hidden '>
            <div className='w-[80%] absolute -z-10]'>
                <Image
                    alt='bg_decoration'
                    className='rounded-none h-[580px] mt-[-1rem]'
                    src={BG_DECORATION}
                />
            </div>
            <div className='px-2 '>
                <div className='grid grid-cols-5 gap-16 items-center justify-between h-[35rem] max-w-[1120px] mx-auto'>
                    <div className='col-span-3 z-10'>
                        <div>
                            <div className='text-4xl tracking-tight font-extrabold text-primary mb-6'>
                Share To Earn:
                                <div className='mt-3'>Where Sharing Sparks Earnings!</div>
                            </div>
                            <div className='text-xl font-medium  text-slate-600 leading-8'>
                We aim for a vibrant, interactive learning community where
                everyone benefits from active participation.
                            </div>
                        </div>
                        <div className='mt-6'>
                            <Button
                                color='secondary'
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
                        <div className='relative w-[69.7738%] mt-[-25.672%] ml-[-15%] overflow-hidden bg-white border border-gray-300/60 rounded-bl-[75%] z-20'>
                            <div className='border-[10px] border-white overflow-hidden rounded-bl-[75%]'>
                                <Image alt='img2' className='rounded-none' src={BG_IMG_2} />
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={12} />
                <div className='flex justify-center bg-primary  dark:bg-opacity-80 mx-0 mb-20 py-12 px-6 z-10'>
                    <div className=' w-full '>
                        <div className='flex flex-col justify-around items-center mb-4 text-white'>
                            <div className='text-4xl tracking-tight font-extrabold  mb-4'>
                Our Growing Community
                            </div>
                            <div className='mb-4 font-light dark:text-gray-500 sm:text-xl text-gray-400'>
                Join thousands who are transforming their learning journey with
                CiStudy.
                            </div>
                        </div>
                        <div className='flex flex-row w-full justify-between max-w-[720px]  mx-auto '>
                            <div className='items-center flex flex-col '>
                                <div className='rounded-full p-5  inline-block bg-blue-100 '>
                                    <UserIcon size={25} className='text-primary' />
                                </div>
                                <div className='text-4xl pt-4 pb-2 font-medium text-white'>
                                    {totalNumberOfVerifiedAccounts}+
                                </div>
                                <div className='text-gray-500 sm:text-xl dark:text-gray-400 font-medium'>
                  Active Accounts
                                </div>
                            </div>

                            <div className='items-center flex flex-col'>
                                <div className='rounded-full p-5  inline-block bg-blue-100 '>
                                    <TrophyIcon size={25} className='text-primary' />
                                </div>
                                <div className='text-4xl pt-4 pb-2 font-medium text-white'>
                                    {totalNumberOfPosts}+
                                </div>
                                <div className='text-gray-500 sm:text-xl dark:text-gray-400 font-medium'>
                  Rewardable Posts
                                </div>
                            </div>

                            <div className='items-center flex flex-col '>
                                <div className='rounded-full p-5  inline-block bg-blue-100 '>
                                    <PresentationIcon size={25} className='text-primary' />
                                </div>
                                <div className='text-4xl pt-4 pb-2 font-medium text-white'>
                                    {totalNumberOfAvailableCourses}+
                                </div>
                                <div className='text-gray-500 sm:text-xl dark:text-gray-400 font-medium'>
                  Diverse Courses
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-10 max-w-[1080px] mx-auto px-12 py-12 mb-12'>
                    <div className='w-full grid grid-cols-3 gap-20 items-center'>
                        <div className='col-span-2 grid grid-cols-2 gap-y-16 me-10'>
                            <div className='grid grid-cols-2 gap-6'>
                                <div className=''>
                                    <div className='text-primary text-3xl font-bold mb-2'>
                    Enroll
                                    </div>
                                    <div className='font-semibold'>Join many courses</div>
                                </div>
                                <div>
                                    <div className='rounded-full p-5  inline-block bg-primary  transform transition-transform duration-300 hover:scale-130'>
                                        <LogInIcon size={25} className='text-white' />
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                                <div>
                                    <div className='rounded-full p-5 float-end  inline-block bg-secondary transform transition-transform duration-300 hover:scale-130'>
                                        <BookCheckIcon size={25} className='text-primary' />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-secondary text-3xl font-bold mb-2'>
                    Learn
                                    </div>
                                    <div className='font-semibold'>
                    Learn and access all courses resource
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                                <div>
                                    <div className='text-yellow-400 text-3xl font-bold mb-2'>
                    Reward
                                    </div>
                                    <div className='font-semibold'>
                    Get rewarded for your contributions
                                    </div>
                                </div>
                                <div className='items-center'>
                                    <div className='rounded-full p-5 inline-block bg-yellow-400 transform transition-transform duration-300 hover:scale-130'>
                                        <AwardIcon size={25} className='text-primary' />
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                                <div className=''>
                                    <div className='rounded-full p-5 float-end inline-block bg-cyan-600 transform transition-transform duration-300 hover:scale-130'>
                                        <MessageSquareShareIcon
                                            size={25}
                                            className='text-primary'
                                        />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-cyan-600 text-3xl font-bold mb-2'>
                    Interact
                                    </div>
                                    <div className='font-semibold'>
                    Actively participating in the course forum
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 px-4  h-full p-8 '>
                            <div className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white  mb-4'>
                Easy steps to learn and earn.
                            </div>
                            <div className='font-light text-gray-500 sm:text-xl dark:text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit{" "}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-10 max-w-[1080px] mx-auto '>
                    <div className='mx-auto mb-8 max-w-screen-sm lg:mb-16 text-center'>
                        <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
              Best Instructors
                        </h2>
                        <p className='font-light text-gray-500 sm:text-xl dark:text-gray-400'>
              Explore the whole collection of open-source web components and
              elements built with the utility classes from Tailwind
                        </p>
                    </div>
                    <div className='grid grid-cols-5'>
                        <div className='flex flex-col items-center'>
                            <Avatar
                                src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                                className='h-20 w-20 text-large'
                            />
                            <div className='mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2'>
                Namee ne
                            </div>
                            <div className='font-light text-gray-500 text-sm dark:text-gray-400'>
                Senior Web Developer
                            </div>

                            <Stars readonly initialValue={4.5} />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Avatar
                                src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                                className='h-20 w-20 text-large'
                            />
                            <div className='mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2'>
                Namee ne
                            </div>
                            <div className='font-light text-gray-500 text-sm dark:text-gray-400'>
                Senior Web Developer
                            </div>

                            <Stars readonly initialValue={4.5} />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Avatar
                                src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                                className='h-20 w-20 text-large'
                            />
                            <div className='mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2'>
                Namee ne
                            </div>
                            <div className='font-light text-gray-500 text-sm dark:text-gray-400'>
                Senior Web Developer
                            </div>

                            <Stars readonly initialValue={4.5} />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Avatar
                                src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                                className='h-20 w-20 text-large'
                            />
                            <div className='mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2'>
                Namee ne
                            </div>
                            <div className='font-light text-gray-500 text-sm dark:text-gray-400'>
                Senior Web Developer
                            </div>

                            <Stars readonly initialValue={4.5} />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Avatar
                                src='https://i.pravatar.cc/150?u=a04258114e29026302d'
                                className='h-20 w-20 text-large'
                            />
                            <div className='mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2'>
                Namee ne
                            </div>
                            <div className='font-light text-gray-500 text-sm dark:text-gray-400'>
                Senior Web Developer
                            </div>

                            <Stars readonly initialValue={4.5} />
                        </div>
                    </div>
                </div>
                <Spacer y={6} />
            </div>
        </div>
    )
}
