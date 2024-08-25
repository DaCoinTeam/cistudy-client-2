import {
    ArrowRightEndOnRectangleIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline"
import { Spacer } from "@nextui-org/react"
import { BookCheckIcon, MessageSquareShareIcon } from "lucide-react"
export const LearningSteps = () => (
    <div className='mt-10 max-w-[1080px] mx-auto px-12 py-12 mb-12'>
        <div className='w-full grid grid-cols-7 gap-12 items-center'>
            <div className='col-span-5 me-10'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <div className='flex items-start'>
                            <div className='flex items-start'>
                                <div className='me-5 w-[8rem]'>
                                    <div className='text-3xl tracking-tight text-primary-500 font-semibold mb-2'>
                    Enroll
                                    </div>
                                    <div>Join courses easily.</div>
                                </div>
                                <div>
                                    <div className='rounded-full p-5  inline-block bg-primary-500  transform transition-transform duration-300 hover:scale-130'>
                                        <ArrowRightEndOnRectangleIcon className='w-8 h-8' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-8'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='0.6'
                                stroke='currentColor'
                                className='size-24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
                                />
                            </svg>
                        </div>

                        <div className='flex items-end'>
                            <div className='flex items-start '>
                                <div className='flex flex-col justify-center items-end'>
                                    <div>
                                        <div className='rounded-full bg-success-500 p-5 float-end  inline-block  transform transition-transform duration-300 hover:scale-130'>
                                            <BookCheckIcon size={31} className='' />
                                        </div>
                                    </div>
                                </div>
                                <div className='ms-10 w-[8rem]'>
                                    <div>
                                        <div className='text-3xl tracking-tight text-success-500 font-semibold mb-2'>
                      Learn
                                        </div>
                                        <div>Gain valuable knowledge</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <Spacer x={32} />
                        <div className=''>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='0.6'
                                stroke='currentColor'
                                className='size-24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18'
                                />
                            </svg>
                        </div>
                        <Spacer x={36} />
                        <div className=''>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='0.6'
                                stroke='currentColor'
                                className='size-24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3'
                                />
                            </svg>
                        </div>
                        <Spacer x={36} />
                    </div>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <div className='flex items-end '>
                                <div className='me-4 w-[8rem]'>
                                    <div>
                                        <div className='text-3xl tracking-tight text-rose-500 font-semibold mb-2'>
                      Reward
                                        </div>
                                        <div>Earn for participation</div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <div>
                                        <div className='rounded-full p-5 inline-block  bg-rose-500 transform transition-transform duration-300 hover:scale-130'>
                                            <TrophyIcon className='w-8 h-8' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-8'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='0.6'
                                stroke='currentColor'
                                className='size-24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
                                />
                            </svg>
                        </div>
                        <div className='flex items-end'>
                            <div className='flex items-center'>
                                <div>
                                    <div className='rounded-full p-5 float-end inline-block bg-warning-500 transform transition-transform duration-300 hover:scale-130'>
                                        <MessageSquareShareIcon size={31} className='' />
                                    </div>
                                </div>

                                <div className='ms-10 w-[8rem]'>
                                    <div className='text-3xl tracking-tight text-warning-500 font-semibold mb-2'>
                    Interact
                                    </div>
                                    <div>Engage with others</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-2  h-full flex flex-col justify-center items-center '>
                <div className='text-4xl tracking-tight font-bold text-gray-900 dark:text-white  mb-4'>
          Easy steps to learn and earn
                </div>
                <div className='font-normal text-gray-600  dark:text-gray-400 text-pretty'>
          Join quickly, acquire new skills, connect with others, and receive
          rewards.
                </div>
            </div>
        </div>
    </div>
)
