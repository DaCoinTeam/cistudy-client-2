"use client"

import { useContext, useState } from "react"
import { RootContext } from "../../../_hooks"
import { CategoryEntity } from "@common"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { usePathname, useRouter } from "next/navigation"
import { Link } from "@nextui-org/react"

export const Categories = () => {
    const router = useRouter()
    const path = usePathname()
    const { swrs, reducer } = useContext(RootContext)!
    const [,dispatch] = reducer
    const { categoriesSwr } = swrs
    const { data } = categoriesSwr
    const [hoveredCategory, setHoveredCategory] = useState<CategoryEntity | null>(null)
    const [hoveredSubCategory, setHoveredSubCategory] = useState<CategoryEntity | null>(
        null
    )
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    const handleCategoriesClick = (category: CategoryEntity) => {
        if (path !== "/courses") {
            router.push("/courses")
        }
        dispatch({ type: "SET_CATEGORY_FILTER", payload: [category] })

    }
    const handleCoursesPress = () => {
        dispatch({type: "RESET_CATEGORY_FILTER"})
        router.push("/courses")
    }
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative h-full flex items-center '
        >
            <Link className="font-medium text-base leading-8 text-gray-700 hover:text-primary cursor-pointer" onPress={handleCoursesPress}>Courses</Link>
            {isHovered && (
                <div className='absolute z-10 top-16 -left-12 min-h-[26rem] bg-white shadow-2xl rounded-lg'>
                    <div className="flex">
                        <div className=' space-y-4 p-4  w-[15rem] border-r-1 border-gray-200'>
                            <div className="font-semibold text-lg">Categories</div>

                            {data?.map((category) => (
                                <Link
                                    key={category.categoryId}
                                    className='flex justify-between cursor-pointer'
                                    onMouseEnter={() => {
                                        setHoveredCategory(category)
                                        setHoveredSubCategory(null)
                                    }}    
                                    onPress={() => handleCategoriesClick(category)}
                                >
                                    <div className="text-sm"> {category.name}</div>
                                    <div>
                                        <ChevronRightIcon className='w-5 h-5 ms-4' />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="flex h-full  min-h-[26rem]">
                            <div className="border-r-1 border-gray-200 ">
                                {hoveredCategory && (
                                    <div className='space-y-4 p-4 w-[15rem] h-full'>
                                        <div className="font-semibold text-lg">Subcategories</div>

                                        {hoveredCategory?.categoryParentRelations?.map(subCategory => (
                                            <Link key={subCategory.category.categoryId}
                                                className='flex justify-between cursor-pointer'
                                                onMouseEnter={() => setHoveredSubCategory(subCategory.category)} 
                                                onPress={() => handleCategoriesClick(subCategory.category)}
                                            >   
                                                <div className="text-sm">{subCategory.category.name}</div>
                                                <div>
                                                    <ChevronRightIcon className='w-5 h-5 ms-4' />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                        
                                )}
                            </div>
                            <div>
                                {hoveredSubCategory && (
                                    <div className='space-y-4 p-4 w-[13rem] '>
                                        <div className="font-semibold text-lg">Topics</div>
                                        {hoveredSubCategory?.categoryParentRelations?.map(topic => (
                                            <Link key={topic.category.categoryId}
                                                className='flex justify-between cursor-pointer'
                                                onPress={() => handleCategoriesClick(topic.category)}
                                            >
                                                <h4 className="text-sm">{topic.category.name}</h4>
            
                                            </Link>
                                        ))}
                                    </div>
                                        
                                )}
                            </div>
                                        
                        </div>
                                    
                                   
                    </div>
                </div>
            )}
        </div>
    )
}