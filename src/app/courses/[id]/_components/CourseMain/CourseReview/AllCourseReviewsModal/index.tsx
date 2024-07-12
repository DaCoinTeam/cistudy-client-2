import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { CourseReviewsContext } from "../CourseReviewProvider"
import { CourseReviewEntity } from "@common"
import { CourseReviewItem } from "../CourseReviewItem"
import { CourseRatingChart } from "../CourseRatingChart"
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
                className=' text-blue-500 text-base hover:cursor-pointer '
            >
        Read all reviews
            </div>
            <Modal size='4xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Reviews</ModalHeader>
                            <ModalBody>
                                <CourseRatingChart />
                                <Spacer y={4}/>
                                <div className="grid grid-cols-2 gap-2">
                                    {getReviews()?.map((item) => {
                                        return (
                                            <div key={item.courseReviewId}>
                                                <CourseReviewItem review={item} />
                                            </div>
                                        )
                                    })}
                                </div>
                               
                            </ModalBody>
                            <ModalFooter>
                                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                                </Button>
                                <Button color='primary' onPress={onClose}>
                  Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
