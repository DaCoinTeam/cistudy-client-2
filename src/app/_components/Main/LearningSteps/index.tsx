import {
    AwardIcon,
    BookCheckIcon,
    LogInIcon,
    MessageSquareShareIcon
} from "lucide-react"
export const LearningSteps = () => (
    <div className='mt-10 max-w-[1080px] mx-auto px-12 py-12 mb-12'>
        <div className='w-full grid grid-cols-3 gap-20 items-center'>
            <div className='col-span-2 grid grid-cols-2 gap-y-16 me-10'>
                <div className='grid grid-cols-2 gap-6'>
                    <div className=''>
                        <div className='text-primary text-3xl font-bold mb-2'>Enroll</div>
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
                        <div className='rounded-full p-5 float-end  inline-block bg-primary transform transition-transform duration-300 hover:scale-130'>
                            <BookCheckIcon size={25} className='text-primary' />
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-primary text-3xl font-bold mb-2'>Learn</div>
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
                            <MessageSquareShareIcon size={25} className='text-primary' />
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
)
