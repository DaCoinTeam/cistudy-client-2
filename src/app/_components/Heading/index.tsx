"use client"
import { Button, Link, Spacer } from "@nextui-org/react"
import { useContext } from "react"
// import { DeployedChains } from "./DeployedChains"
// import { STARCI_TEACH } from "@config"
import {
    ArrowRightIcon,
    AwardIcon,
    BookCheckIcon,
    LogInIcon,
    MessageSquareShareIcon,
    PresentationIcon,
    TrophyIcon,
    UserIcon
} from "lucide-react"
import { RootContext } from "../../_hooks"

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
        <div className='relative overflow-hidden mt-12'>
            {/* <div className='h-[800px] -rotate-6 w-[200%] bg-blue-100 absolute -top-[35%] -left-[50%]'>
                {" "}
            </div> */}
            
            <div className=' px-2 '>
                <div className='grid grid-cols-5 gap-6 items-center justify-between h-[25rem] max-w-[1080px] mx-auto '>
                    <div className='col-span-3'>
                        {/* <div className="text-[5rem] font-bold text-primary"> 
                            <span className="text-primary">
                        Ci
                            </span>
                            <span className="text-secondary">
                        Study
                            </span>
                        </div> */}
                        <div>
                            <div className='text-4xl font-bold text-primary mb-6'>
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
                    <div>

                    </div>

                    {/* <Image
                        className="col-span-1"
                        alt="starciTeach"
                        src={STARCI_TEACH}
                    />  */}
                </div>
                <Spacer y={12} />
                <div className='flex justify-center bg-primary border mx-0 mb-20 py-12 px-6 text-white' >
                    <div className=' w-full '>
                        <div className="flex flex-col justify-around items-center mb-4">
                            <div className='text-3xl font-semibold text-secondary mb-4'>Our Growing Community</div>
                            <div className="mb-4">Join thousands who are transforming their learning journey with CiStudy.</div>


                        </div>
                        <div className='flex flex-row w-full justify-between max-w-[720px]  mx-auto'>
                            <div className='items-center flex flex-col '>
                                <div className='rounded-full p-5  inline-block bg-blue-100 '>
                                    <UserIcon size={25} className='text-primary' />
                                </div>
                                <div className='text-4xl pt-4 pb-2 font-medium'>
                                    {totalNumberOfVerifiedAccounts}1000+
                                </div>
                                <div className='text-slate-500 text-lg font-semibold'>
                  Active Accounts
                                </div>
                            </div>

                            <div className='items-center flex flex-col'>
                                <div className='rounded-full p-5  inline-block bg-blue-100 '>
                                    <TrophyIcon size={25} className='text-primary' />
                                </div>
                                <div className='text-4xl pt-4 pb-2 font-medium'>
                                    {totalNumberOfPosts}20K+
                                </div>
                                <div className='text-slate-500 text-lg font-semibold'>
                  Rewardable Posts
                                </div>
                            </div>

                            <div className='items-center flex flex-col '>
                                <div className='rounded-full p-5  inline-block bg-blue-100 '>
                                    <PresentationIcon size={25} className='text-primary' />
                                </div>
                                <div className='text-4xl pt-4 pb-2 font-medium'>
                                    {totalNumberOfAvailableCourses}200+
                                </div>
                                <div className='text-slate-500 text-lg font-semibold'>
                  Diverse Courses
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>

                <div className="mt-10 max-w-[1080px] mx-auto px-16 ">
                    <div className='w-full grid grid-cols-3 gap-16 items-center'>
                        <div className='col-span-2 grid grid-cols-2 gap-16'>
                            
                            <div className='grid grid-cols-2 gap-6'>
                                <div className=''>
                                    <div className='text-primary text-3xl font-bold mb-2'>
                    Enroll
                                    </div>
                                    <div className='font-semibold'>
                    Join many courses
                                    </div>
                                </div>
                                <div className='items-center'>
                                    <div className='rounded-full p-5  inline-block bg-primary  '>
                                        <LogInIcon size={25} className='text-white' />
                                    </div>
                                </div>
                            </div>
                            

                            <div className='grid grid-cols-2 gap-6'>
                                <div className=''>
                                    <div className='text-primary text-3xl font-bold mb-2'>
                    Learn
                                    </div>
                                    <div className='font-semibold'>
                    Learn and access all courses resource
                                    </div>
                                </div>
                                <div className='items-center'>
                                    <div className='rounded-full p-5  inline-block bg-secondary '>
                                        <BookCheckIcon size={25} className='text-primary' />
                                    </div>
                                </div>
                            </div>
                           
                            

                            <div className='grid grid-cols-2 gap-6'>
                                <div >
                                    <div className='text-primary text-3xl font-bold mb-2'>
                    Reward
                                    </div>
                                    <div className='font-semibold'>
                    Receview Starci token for your contribution
                                    </div>
                                </div>
                                <div className='items-center'>
                                    <div className='rounded-full p-5  inline-block bg-yellow-400 '>
                                        <AwardIcon size={25} className='text-primary' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='grid grid-cols-2 gap-6'>
                                <div className=''>
                                    <div className='text-primary text-3xl font-bold mb-2'>
                    Interact
                                    </div>
                                    <div className='font-semibold'>
                    Actively sharing and communicating on course forum
                                    </div>
                                </div>
                                <div className='items-center'>
                                    <div className='rounded-full p-5  inline-block bg-cyan-600 '>
                                        <MessageSquareShareIcon size={25} className='text-primary' />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-span-1 px-4">
                            <div className='text-4xl font-semibold text-primary mb-6'>Easy step to learn and earn.</div>
                            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit </div>
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div className='text-center'>
                        <div className='text-2xl font-bold'>
              Shaping the Future of Decentralized Sharing
                        </div>
                        <div className='text-2xl font-bold'>
              CiStudy Unstoppable Expansion
                        </div>
                    </div>
                    <Spacer y={6} />
                    <div className='grid grid-cols-3'>
                        <div className='grid place-items-center'>
                            <div className='text-xl'>Total Accounts</div>
                            <div className='text-4xl font-bold'>123</div>
                            <div className='text-foreground-400'>in the last 30 days</div>
                        </div>
                        <div className='grid place-items-center'>
                            <div className='text-xl'>Total Courses</div>
                            <div className='text-4xl font-bold'>123</div>
                            <div className='text-foreground-400'>in the last 30 days</div>
                        </div>
                        <div className='grid place-items-center'>
                            <div className='text-xl'>Total Posts</div>
                            <div className='text-4xl font-bold'>123</div>
                            <div className='text-foreground-400'>in the last 30 days</div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-span-2">
                   <div>
                        <div className='text-4xl font-semibold text-primary mb-6 col-span-2'>
                Share To Earn:
                            <div className='mt-3'>Where Sharing Sparks Earnings!</div>
                        </div>
                        <div className='text-xl font-medium  text-slate-600 leading-8'>
                We aim for a vibrant, interactive learning community where
                everyone benefits from active participation.
                        </div>

                    </div>
                   </div> */}
                <Spacer y={6} />
                {/* <DeployedChains/>  */}
            </div>
        </div>
    )
}
