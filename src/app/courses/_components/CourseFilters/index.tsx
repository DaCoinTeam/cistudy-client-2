"use client"
import { CategoryEntity } from "@common"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Divider,
    Link,
} from "@nextui-org/react"
import { FilterIcon, Hash, ListTree } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { MdCategory } from "react-icons/md"
import { RootContext } from "../../../_hooks"
import { CourseFiltersProvider } from "./CourseFiltersProvider"

interface CourseFiltersProps {
  className?: string;
}

export const CourseFiltersWrapped = (props: CourseFiltersProps) => {
    const { className } = props

    const { swrs, reducer } = useContext(RootContext)!
    const { categoriesSwr, topicsSwr } = swrs
    const { data } = categoriesSwr
    const { data: topicData } = topicsSwr
    const [state, dispatch] = reducer
    const { categoryFilter } = state
    const [currentCategory, setCurrentCategory] = useState<CategoryEntity | null>(
        null
    )
    const findNonDuplicatedCategories = (
        arr: CategoryEntity[]
    ): CategoryEntity[] => {
        const nameToCategoryMap = new Map<string, CategoryEntity>()

        arr.forEach((category) => {
            if (!nameToCategoryMap.has(category.name)) {
                nameToCategoryMap.set(category.name, category)
            }
        })

        return Array.from(nameToCategoryMap.values())
    }

    const [categoryLevel0, setCategoryLevel0] = useState<CategoryEntity[]>([])
    const [categoryLevel1, setCategoryLevel1] = useState<CategoryEntity[]>([])
    const [categoryLevel2, setCategoryLevel2] = useState<CategoryEntity[]>([])
    const [removeCategory, setRemoveCategory] = useState<boolean>(false)
    const initValue = (data: Array<CategoryEntity>) => {
        let level0: Array<CategoryEntity> = []
        let level1: Array<CategoryEntity> = []
        let level2: Array<CategoryEntity> = []

        if (data && data.length > 0) {
            level0 = data;
            (level1 = [
                ...findNonDuplicatedCategories(
                    data?.flatMap((category) =>
                        category?.categoryParentRelations?.map(
                            (subCategory) => subCategory.category
                        )
                    ) || []
                ),
            ]),
            (level2 = [...findNonDuplicatedCategories(topicData || [])])
        }
        setCategoryLevel0(level0)
        setCategoryLevel1(level1)
        setCategoryLevel2(level2)
    }
    useEffect(() => {
        initValue(data!)
    }, [data?.length])

    const handleCategory = ({ remove }: { remove: boolean }) => {
        const subCategories: Array<CategoryEntity> = []
        const topics: Array<CategoryEntity> = []

        const processCategories = () => {
            categoryFilter.flatMap((category) => {
                if (
                    category.level == 0 &&
          category.categoryParentRelations.length > 0
                ) {
                    category.categoryParentRelations.flatMap((subCategory) =>
                        subCategories.push(subCategory.category)
                    )
                }
            })

            subCategories.map((category) =>
                category.categoryParentRelations.map((topic) =>
                    topics.push(topic.category)
                )
            )
            setCategoryLevel1(subCategories)
            setCategoryLevel2(topics)
        }

        if (remove) {
            if (categoryFilter.length == 0) {
                initValue(data!)
            } else {
                processCategories()
            }
        } else {
            processCategories()
        }
    }
    const handleSubCategory = ({ remove }: { remove: boolean }) => {
        const topics: Array<CategoryEntity> = []
        const processSubCategories = () => {
            categoryFilter.flatMap((category) => {
                if (
                    category.level == 1 &&
          category.categoryParentRelations.length > 0
                ) {
                    category.categoryParentRelations.flatMap((top) =>
                        topics.push(top.category)
                    )
                }
            })
        }
        if (remove) {
            if (!(categoryFilter.find((c) => c.level == 1))) {
                categoryFilter.map((category) => {
                    category?.categoryParentRelations?.map((subCategory) =>
                        subCategory?.category?.categoryParentRelations.map((topic) =>
                            topics.push(topic.category)
                        )
                    )
                })
            } else {
                processSubCategories()
            }
        } else {
            processSubCategories()
        } 
        setCategoryLevel2(topics)
           
    }


    const handleCheckCategory = (category: CategoryEntity) => {
        setCurrentCategory(category)
        if (categoryFilter.find((c) => c === category)) {
            const categoryIds: Array<CategoryEntity> = []
            categoryIds.push(category)
            category?.categoryParentRelations?.map(
                (category) => {
                    categoryIds.push(category.category)
                    category?.category?.categoryParentRelations?.map(
                        (category) => categoryIds.push(category.category)
                    )
                }
            )
            dispatch({ type: "REMOVE_CATEGORY_FILTER", payload: categoryIds })
            setRemoveCategory(true)
        } else {
            dispatch({ type: "ADD_CATEGORY_FILTER", payload: category })
            setRemoveCategory(false)
        }
    }
    useEffect(() => {
        if (removeCategory){
            if (currentCategory?.level == 0) handleCategory({ remove: true })
            else if (currentCategory?.level == 1) handleSubCategory({ remove: true })
        } else {
            if (currentCategory?.level == 0) handleCategory({ remove: false })
            else if (currentCategory?.level == 1) handleSubCategory({ remove: false })
        }
     
    }, [categoryFilter])
    return (
        
        <Card
            shadow='none'
            className={`${className} border border-divider rounded-medium h-fit w-[280px]`}
        >
            <CardHeader className='p-4'>
                <FilterIcon size={20} className='text-primary mr-4' />
                <div className='text-xl font-semibold'>Filters</div>
            </CardHeader>
            <Divider />
            <CardBody className='p-0'>
                <Accordion
                    selectionMode='multiple'
                    className='!px-0'
                    itemClasses={{
                        base: "!shadow-none gap-4 px-4",
                        title: "!text-base",
                        content: "pt-2 pb-4",
                    }}
                    defaultExpandedKeys={["categories"]}
                >
                    <AccordionItem
                        key='categories'
                        aria-label='Categories'
                        startContent={<MdCategory size={20} className='text-primary' />}
                        title={
                            <div className='flex gap-3 items-center'>
                                <div>Categories</div>
                                <div className='text-foreground-400'>
                                    {categoryLevel0.length ?? 0}
                                </div>
                            </div>
                        }
                    >
                        <div className='flex flex-col gap-3'>
                            {categoryLevel0.map((category) => (
                                <Link key={category.categoryId}>
                                    <Checkbox
                                        size='sm'
                                        isSelected={categoryFilter.includes(category)}
                                        onValueChange={() => handleCheckCategory(category)}
                                    >
                                        <div>{category.name}</div>
                                    </Checkbox>
                                </Link>
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key='subcategories'
                        aria-label='Subcategories'
                        startContent={<ListTree size={20} className='text-primary' />}
                        title={
                            <div className='flex gap-3 items-center'>
                                <div>Subcategories</div>
                                <div className='text-foreground-400'>
                                    {categoryLevel1?.length ?? 0}
                                </div>
                            </div>
                        }
                    >
                        <div className='flex flex-col gap-3'>
                            {categoryLevel1?.map((category) => (
                                <Link key={category.categoryId}>
                                    <Checkbox
                                        size='sm'
                                        isSelected={categoryFilter.includes(category)}
                                        onValueChange={() => handleCheckCategory(category)}
                                    >
                                        <div>{category.name}</div>
                                    </Checkbox>
                                </Link>
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key='topics'
                        aria-label='Topics'
                        startContent={<Hash fontSize={20} className='text-primary' />}
                        title={
                            <div className='flex gap-3 items-center'>
                                <div>Topics</div>
                                <div className='text-foreground-400'>
                                    {categoryLevel2?.length ?? 0}
                                </div>
                            </div>
                        }
                    >
                        <div className='flex flex-col gap-3'>
                            {categoryLevel2?.map((category) => (
                                <div key={category.categoryId}>
                                    <Checkbox
                                        size='sm'
                                        isSelected={categoryFilter.includes(category)}
                                        onValueChange={() => handleCheckCategory(category)}
                                    >
                                        <div className='flex gap-2 items-center'>
                                            {/* <Image
                                                    src={getAssetUrl(imageId)}
                                                    alt='topic'
                                                    height={14}
                                                    width={14}
                                                /> */}
                                            <div>{category.name}</div>
                                        </div>
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>


    )
}

export const CourseFilters = (props: CourseFiltersProps) => {
    const { className } = props
    return (
        <CourseFiltersProvider>
            <CourseFiltersWrapped className={className} />
        </CourseFiltersProvider>
    )
}
