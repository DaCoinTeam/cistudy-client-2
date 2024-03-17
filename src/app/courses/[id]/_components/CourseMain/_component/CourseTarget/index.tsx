import React, { useContext } from "react"
import { FaCheck } from "react-icons/fa6"
import { CourseDetailsContext } from "../../../../_hooks"

const CourseTarget = () => {
    // const { swrs } = useContext(CourseDetailsContext)!
    // const { courseSwr } = swrs
    // const { data: course } = courseSwr
    const course={
        title:"React Native: Advanced Concepts",
        description:"Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!",
        rating:4.5,
        creator:"Stephen Grider",
        creatorImg:"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        previewImg:"https://edgecoursebd.com/wp-content/uploads/2022/04/274886969_1014478982810346_4519317107199743625_n.jpg",
        level:"Intermediate",
        students:423554,
        courseTargets: [
            {
                courseTargetId: "tg1",
                content: "Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!",
                createdAt: new Date(),
                updatedAt: new Date(),
                position: 1,
            },
            {
                courseTargetId: "tg2",
                content: "Understand the latest Navigation options for new React Native apps",
                createdAt: new Date(),
                updatedAt: new Date(),
                position: 1,
            },
            {
                courseTargetId: "tg3",
                content: "Understand styling in React Native",
                createdAt: new Date(),
                updatedAt: new Date(),
                position: 1,
            },
        ]

    }
    return (
        <>
            <div className='p-5 border border-primary rounded-xl bg-content1		'>
                <h2 className='my-2 text-2xl font-bold'>What youll learn</h2>
                <div className='grid grid-cols-2 gap-y-2 gap-x-5 ms-5'>
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