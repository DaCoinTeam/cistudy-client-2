import { RootContext } from "../../../_hooks"
import { useContext } from "react"
import { Stars } from "../../../_shared"
import { Avatar } from "@nextui-org/react"
import { getAvatarUrl } from "@services"

export const BestInstrutors = () => {
    const { swrs } = useContext(RootContext)!
    const { highlightSwr } = { ...swrs }
    const { data } = { ...highlightSwr }
    const { highRatedInstructors } = { ...data }
    return (
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
                {highRatedInstructors?.map(
                    ({
                        accountId,
                        avatarId,
                        avatarUrl,
                        kind,
                        username,
                        accountRatings,
                    }) => (
                        <div key={accountId} className='flex flex-col items-center'>
                            <Avatar
                                name='avatar'
                                className='w-20 h-20'
                                src={getAvatarUrl({
                                    avatarId,
                                    avatarUrl,
                                    kind,
                                })}
                            />
                            <div className='mb-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2'>
                                {username}
                            </div>

                            <div className='font-light text-gray-500 text-sm dark:text-gray-400'>
                Senior Web Developer
                            </div>
                            <Stars
                                readonly
                                initialValue={accountRatings?.overallAccountRating}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
