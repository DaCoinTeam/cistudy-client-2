import { Button, Card, User } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { CourseReviewEntity } from "../../../../../../../common/types"
import { formatNouns, parseDateToString } from "../../../../../../../common/utils"
import { Stars } from "../../../../../../_shared"
import { HandThumbUpIcon } from "@heroicons/react/24/outline"
import { HandThumbDownIcon } from "@heroicons/react/24/solid"
interface ReviewItemProps {
  review: CourseReviewEntity;
}
export const CourseReviewItem = ({ review }: ReviewItemProps) => {
    const { content, rating, account, updatedAt } = review
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = account

    return (
        <Card  shadow="none" className="border border-divider rounded-lg p-4 ">
            <div className="flex items-center mb-2">
                <User classNames={{
                    name: "text-sm"
                }} avatarProps={{
                    src: getAvatarUrl({
                        avatarUrl: avatarUrl,
                        avatarId: avatarId,
                        kind: kind
                    })
                }} name={username}  description={formatNouns(numberOfFollowers, "follower")}/>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <div className="pb-2">
                    <Stars initialValue={rating} readonly />
                </div>
                <div className="ms-5 text-base font-medium text-gray-900 dark:text-white">Thinking to buy another one!</div>
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><div className="flex">Reviewed on<p className="ms-1">{parseDateToString(updatedAt)}</p></div></footer>
            <p className="text-gray-800 dark:text-gray-300 mb-5">{content}</p>
            <aside>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                <div className="flex items-center mt-3">
                    <Button variant="light" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        <HandThumbUpIcon className="h-5 w-5"/>
                Helpful
                    </Button>
                    <Button variant="light"  className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group ms-5">
                        <HandThumbDownIcon className="h-5 w-5"/>
                Not helpful
                    </Button>
                    {/* <Button size="sm" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</Button> */}
                    <div  className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Reply</div>
                </div>
            </aside>
        </Card>

    // <Card classNameName='p-2' shadow='none' classNameNames={itemClasses}>
    //     <CardBody>
    //         <div classNameName='flex justify-between'>
    //             <div>
    //                 <Avatar
    //                     classNameName='w-12 h-12'
    //                     src={getAvatarUrl({
    //                         avatarId,
    //                         avatarUrl,
    //                         kind,
    //                     })}
    //                 />
    //             </div>
    //             <div>
    //                 <div classNameName=' text-xs font-semibold text-gray-500 dark:text-gray-400 flex justify-end'>
    //                     <time dateTime='2017-03-03 19:00'>
    //                         {parseISODateString(updatedAt)}
    //                     </time>
    //                 </div>
    //                 <Spacer y={1} />

    //                 <div classNameName='flex items-center mb-1 space-x-1 rtl:space-x-reverse'>
    //                     <Stars initialValue={rating} readonly />
    //                 </div>
    //             </div>
    //         </div>
    //         <Spacer y={2} />

    //         <div classNameName='font-bold dark:text-white items-center'>
    //             <p>{username}</p>
    //         </div>
    //         <Spacer y={1} />

    //         <Spacer y={2} />
    //         <p classNameName='mb-2 text-sm font-semibold  text-gray-900 dark:text-gray-400'>
    //             {content}
    //         </p>
    //     </CardBody>
    //     {/* <aside>
    //         <p classNameName='mt-1 text-xs text-gray-500 dark:text-gray-400'>
    //   19 people found this helpful
    //         </p>
    //         <div classNameName='flex items-center mt-3'>
    //             <a
    //                 href='#'
    //                 classNameName='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
    //             >
    //     Helpful
    //             </a>
    //             <a
    //                 href='#'
    //                 classNameName='ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600'
    //             >
    //     Report abuse
    //             </a>
    //         </div>
    //     </aside> */}
    // </Card>
    )
}
