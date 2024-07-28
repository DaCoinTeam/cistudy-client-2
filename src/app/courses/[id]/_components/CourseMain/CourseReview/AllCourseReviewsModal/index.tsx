import { CourseReviewEntity } from "@common"
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spacer,
    useDisclosure
} from "@nextui-org/react"
import { useContext } from "react"
import { CourseRatingChart } from "./CourseRatingChart"
import { CourseReviewItem } from "../CourseReviewItem"
import { CourseReviewsContext } from "../CourseReviewProvider"
import { PlusIcon } from "lucide-react"
export const AllCourseReviewsModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { swrs } = useContext(CourseReviewsContext)!
    const { courseReviewsSwr } = swrs
    const { data } = courseReviewsSwr

    const getReviews = () => {
        if (!data) return []
        const reviewsReturn: Array<CourseReviewEntity> = []
        data.forEach((element) => {
            if (!element) return
            const { results } = element
            reviewsReturn.push(...results)
        })
        return reviewsReturn
    }
    return (
        <>
            <div
                onClick={onOpen}
                className=' text-primary hover:cursor-pointer flex items-center'
            >
                <PlusIcon width={24} height={24} strokeWidth={3}/>
                <div className=" text-base font-semibold ms-2">
                Read All Reviews
                </div>
            </div>
            <Modal scrollBehavior="outside" size='4xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <>
                        <ModalHeader className='flex flex-col gap-1 font-bold'>Reviews</ModalHeader>
                        <ModalBody className="mb-4">
                            <CourseRatingChart />
                            <Spacer y={4}/>
                            <div className="space-y-4">
                                {getReviews()?.map((item) => {
                                    return (
                                        <div key={item.courseReviewId}>
                                            <CourseReviewItem review={item} />
                                        </div>
                                    )
                                })}
                            </div>
                               
                        </ModalBody>
                            
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}
