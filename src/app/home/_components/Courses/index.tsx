"use client"
import { Carousel } from "./Carousel"
export interface CourseInterface {
    id?: number,
    title?: string
    thumbnail?: string
    price?: string,
    authorImg?: string,
    authorName?: string,
    rating?: number,
}
const FeatureCourse : CourseInterface[] = [
    {
        id: 1,
        title: "The Complete Node.js Developer Course (3rd Edition)",
        authorName: "Andrew Mead, Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=2",
        rating: 4.7,
        price: "$19.99",
    },
    {
        id: 2,
        title: "Python for Data Science and Machine Learning Bootcamp",
        authorName: "Andrew Mead, Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=1",
        rating: 4.7,
        price: "$19.99",

    },
    {
        id: 3,
        title: "The Complete Node.js Developer Course (3rd Edition)",
        authorName: "Andrew Mead, Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=3",
        rating: 4.7,
        price: "$19.99",

    },
    {
        id: 4,
        title: "Learn Python Programming Masterclass",
        authorName: "Andrew Mead, Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=4",
        rating: 4.7,
        price: "$19.99",

    },
    {
        id: 5,
        title: "Mastering Data Structures & Algorithms using C and C++",
        authorName: "Andrew Mead, Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=5",
        rating: 4.7,
        price: "$19.99",

    },
    {
        id: 6,
        title: "django - The Python Web Developer Bootcamp",
        authorName: "Andrew Mead, Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=6",
        rating: 4.7,
        price: "$19.99",

    },
]
export const Courses = () => {
    return (
        <div>
            <Carousel  courses={FeatureCourse} />
        </div>
    )
}