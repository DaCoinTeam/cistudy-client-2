import React from "react"
import Review from "./_components/Review"
const Reviews = () => {
    return (
        <>
            <div className='grid grid-cols-2 gap-8'>
                <Review />
                <Review />
            </div>
        </>
    )
}
export default Reviews
