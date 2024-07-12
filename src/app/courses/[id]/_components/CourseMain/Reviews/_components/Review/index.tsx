import { Avatar, Card, CardBody, Spacer } from "@nextui-org/react"
import { Stars } from "../../../../../../../_shared"
const itemClasses = {
    indicator: "text-medium",
    content: "text-small px-2 ",
    trigger: "!py-3",
    base: "border border-divider gap-2 bg-slate-50 dark:bg-content1",
}
type ReviewProps = {
  review: {
    reviewId: string;
    title: string;
    content: string;
    rating: number;
    date: string;
    account: {
      accountId: string;
      firstName: string;
      lastName: string;
      avatarId: string;
    };
  };
};
const Review = ({ review }: ReviewProps) => {
    return (
        <Card className='p-2' shadow='none' classNames={itemClasses}>
            <CardBody>
                <div className='flex justify-between'>
                    <div>
                        <Avatar className='w-12 h-12' src={review.account.avatarId} />
                    </div>
                    <div>
                        <div className=' text-xs text-gray-500 dark:text-gray-400 flex justify-end'>
                            <time dateTime='2017-03-03 19:00'>{review.date}</time>
                        </div>
                        <Spacer y={1} />

                        <div className='flex items-center mb-1 space-x-1 rtl:space-x-reverse'>
                            <Stars initialValue={review.rating} readonly />
                        </div>
                    </div>
                </div>
                <Spacer y={2} />

                <div className='font-bold dark:text-white items-center'>
                    <p>
                        {review.account.firstName} {review.account.lastName}
                    </p>
                </div>
                <Spacer y={1} />

                <Spacer y={2} />

                <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
                    {review.title}
                </h3>
                <p className='mb-2 text-sm  text-gray-900 dark:text-gray-400'>
                    {review.content}
                </p>
                <a
                    href='#'
                    className='block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
          Read more
                </a>
            </CardBody>
            {/* <aside>
                <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
          19 people found this helpful
                </p>
                <div className='flex items-center mt-3'>
                    <a
                        href='#'
                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                    >
            Helpful
                    </a>
                    <a
                        href='#'
                        className='ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600'
                    >
            Report abuse
                    </a>
                </div>
            </aside> */}
        </Card>
    )
}
export default Review
