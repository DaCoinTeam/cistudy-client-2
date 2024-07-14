import { CourseEntity } from "@common"
import { StarIcon } from "@heroicons/react/24/solid"
import { Image, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "../../../../services/server"
import { useRouter } from "next/navigation"

export const CourseCard = (props: CourseEntity) => {
    const { title, creator, thumbnailId, price, courseId } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const router = useRouter()
    return (
        <div onClick={() => router.push(`/courses/${courseId}`)} className='col-span-12 sm:col-span-7 h-auto max-h-[17.5rem] border border-divider shadow-none rounded-xl hover:cursor-pointer'>
            <div className='w-full h-auto min-h-[10rem] bg-lime-600 rounded-t-xl'>
                {thumbnailId && (
                    <Image
                        alt='course image'
                        width={400}
                        height={200}
                        className='z-0 object-cover rounded-b-none'
                        src={getAssetUrl(thumbnailId)!}
                    />
                )}
            </div>

            <div className=' h-auto min-h-[7rem] p-3 justify-start items-start '>
                <div className='text-sm font-semibold line-clamp-2 pb-1 h-auto min-h-[2.5rem]'>
                    {title}
                </div>
                <div className='flex flex-col'>
                    <div className='flex pb-1 '>
                        <User
                            avatarProps={{
                                src: getAvatarUrl({
                                    avatarId,
                                    avatarUrl,
                                    kind,
                                }),
                                className: "w-7 h-7 ",
                            }}
                            name={username}
                        />
                    </div>

                    <div className='flex  gap-2 w-full justify-between items-end'>
                        <div className='flex items-center'>
                            <StarIcon
                                width={24}
                                height={24}
                                className='text-yellow-500 me-2 p-1 '
                            />
                            <span className='text-sm font-semibold'>5.0</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-sm font-semibold'>{price} STARCI</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
