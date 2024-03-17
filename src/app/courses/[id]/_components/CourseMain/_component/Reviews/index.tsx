import React from "react"
import Review from "./_components/Review"
const Reviews = () => {
    const ReviewData = [
        {
            reviewId: "rID1",
            title: "Great Course!",
            content: "I really enjoyed this course. It was very informative and the instructor was great!",
            rating: 5,
            date: "2022-04-22",
            user: {
                userId: "uID1",
                firstName: "John",
                lastName: "Doe",
                avatarId: "https://cdn.aglty.io/boys-town/quotes/ryan_20230915120925.jpg"
            }
        },
        {
            reviewId: "rID2",
            title: "Learned a lot from this course!",
            content: "Marx is a great instructor and I learned a lot from this course. I would definitely recommend it to anyone who wants to learn React Native!",
            rating: 4,
            date: "2022-04-22",
            user: {
                userId: "uID2",
                firstName: "Marx",
                lastName: "Bierber",
                avatarId: "https://cdn.aglty.io/boys-town/quotes/ryan_20230915120925.jpg"
            }
        },
    ]
    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                {ReviewData.map((review) => (
                    <Review key={review.reviewId} review={review} />
                ))}
                {/* <Review />
                <Review /> */}
            </div>
        </>
    )
}
export default Reviews
