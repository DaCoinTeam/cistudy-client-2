import React, { useContext } from "react"
import { FaCheck } from "react-icons/fa6"
import { CourseDetailsContext } from "../../../../_hooks"

const CourseTarget = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state
    return (
        <>
            <div className='p-5 border border-indigo-600 '>
                <h2 className='my-2 text-2xl font-bold'>What youll learn</h2>
                <div className='grid grid-cols-2 gap-2++ ms-5'>
                    {course?.courseTargets.map((target) =>(
                        <div key={target.courseTargetId} className='my-2'>
                            <FaCheck className='inline-block mr-2' />
                            {target.content}
                        </div>
                    ) )}                    
                </div>
            </div>
        </>
    )
}
export default CourseTarget