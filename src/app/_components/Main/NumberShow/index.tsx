import {
    PresentationIcon,
    TrophyIcon,
    UserIcon
} from "lucide-react"
import { useContext } from "react"
import { RootContext } from "../../../_hooks"
export const NumberShow = () => {
    const { swrs } = useContext(RootContext)!
    const { highlightSwr } = { ...swrs }
    const { data } = { ...highlightSwr }
    const {
        totalNumberOfAvailableCourses,
        totalNumberOfPosts,
        totalNumberOfVerifiedAccounts
    } = { ...data }
    return (
        <div className='flex justify-center bg-primary mx-auto  max-w-[1600px] dark:bg-opacity-80 mb-20 py-12 px-6 z-10'>
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
    )
}