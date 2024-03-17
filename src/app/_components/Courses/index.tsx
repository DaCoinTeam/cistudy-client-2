"use client"
import { Spacer } from "@nextui-org/react"
import { Carousel } from "./Carousel"
export interface CourseInterface {
    id?: number,
    title?: string
    thumbnail?: string
    price?: string,
    authorImg?: string,
    authorName?: string,
    rating?: number,
    level?: string
}
const FeatureCourse : CourseInterface[] = [
    {
        id: 1,
        title: "The Complete Node.js Developer Course (3rd Edition)",
        authorName: "Rob Percival",
        authorImg: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        thumbnail: "https://picsum.photos/600/350?v=2",
        rating: 4.7,
        price: "$19.99",
        level: "Beginner"
    },
    {
        id: 2,
        title: "Python for Data Science and Machine Learning Bootcamp",
        authorName: "Andrew Mead",
        authorImg: "https://media.istockphoto.com/id/637234116/photo/doing-it-for-the-love-of-success.webp?b=1&s=170667a&w=0&k=20&c=14j_L7gtAKo0AFgL4sCzizmq9gMw_pGK6Ygm9LTP_jE=",
        thumbnail: "https://picsum.photos/600/350?v=1",
        rating: 4.7,
        price: "$19.99",
        level: "Beginner"


    },
    {
        id: 3,
        title: "The Complete Node.js Developer Course (3rd Edition)",
        authorName: "Andrew Mead",
        authorImg: "https://i.f1g.fr/media/figaro/1200x630_crop/2018/11/13/XVM3363ae9c-e760-11e8-8167-68cd158b0a7b.jpg",
        thumbnail: "https://picsum.photos/600/350?v=3",
        rating: 4.7,
        price: "$19.99",
        level: "Beginner"


    },
    {
        id: 4,
        title: "Learn Python Programming Masterclass",
        authorName: "Rob Percival",
        authorImg: "https://i.f1g.fr/media/figaro/1200x630_crop/2018/11/13/XVM3363ae9c-e760-11e8-8167-68cd158b0a7b.jpg",
        thumbnail: "https://picsum.photos/600/350?v=4",
        rating: 4.7,
        price: "$19.99",
        level: "Beginner"


    },
    {
        id: 5,
        title: "Mastering Data Structures & Algorithms using C and C++",
        authorName: "Andrew Mead",
        authorImg: "https://imagenes.elpais.com/resizer/jYDAG45eAnlMeKueWVQdHE5m72E=/1960x1470/filters:focal(2440x670:2450x680)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/TDQ43DGCMRDW5FARHNXEI665CI.jpeg",
        thumbnail: "https://picsum.photos/600/350?v=5",
        rating: 4.7,
        price: "$19.99",
        level: "Advanced"


    },
    {
        id: 6,
        title: "django - The Python Web Developer Bootcamp",
        authorName: "Andrew Mea",
        authorImg: "https://i.pinimg.com/236x/f1/23/57/f123573cd8d3fb97d575af346e8c7d71.jpg",
        thumbnail: "https://picsum.photos/600/350?v=6",
        rating: 4.7,
        price: "$19.99",
        level: "Advanced"


    },
]
export const Courses = () => {

    return (
        <div>
            <div className="ms-8 text-2xl font-extrabold "> Featured Courses</div>
            <Spacer y={4} />
            <Carousel  courses={FeatureCourse} />
            <Spacer y={8} />
            <div className="ms-8 text-2xl font-extrabold "> High Rating Courses</div>
            <Spacer y={4} />
            <Carousel  courses={FeatureCourse} />
        </div>
    )
}