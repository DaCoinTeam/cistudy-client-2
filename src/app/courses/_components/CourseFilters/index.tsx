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
    Image,
} from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { MdCategory } from "react-icons/md"
import { FilterIcon, Hash, ListTree } from "lucide-react"
import { useCallback, useContext, useMemo } from "react"
import {
    CourseFiltersContext,
    CourseFiltersProvider,
} from "./CourseFiltersProvider"

interface CourseFiltersProps {
  className?: string;
}

export const CourseFiltersWrapped = (props: CourseFiltersProps) => {
    const { className } = props

    const { swrs } = useContext(CourseFiltersContext)!
    const { categoriesSwr } = swrs
    const { data } = categoriesSwr

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

    const getCategories = useCallback(() => {
        const categories = {
            level0: [] as Array<CategoryEntity>,
            level1: [] as Array<CategoryEntity>,
            level2: [] as Array<CategoryEntity>,
        }

        const processCategory = (category: CategoryEntity, level: number) => {
            if (!category) return

            if (level === 0) categories.level0.push(category)
            if (level === 1) categories.level1.push(category)
            if (level === 2) categories.level2.push(category)

            if (
                category.categoryParentRelations &&
        category.categoryParentRelations.length
            ) {
                category.categoryParentRelations.forEach((relation) => {
                    if (!relation || !relation.category) return
                    processCategory(relation.category, level + 1)
                })
            }
        }
        if (data) {
            data.forEach((category) => processCategory(category, 0))
            categories.level1 = findNonDuplicatedCategories(categories.level1)
            categories.level2 = findNonDuplicatedCategories(categories.level2)
        }

        return categories
    }, [data])
    const categories = useMemo(getCategories, [getCategories])

    return (
        <Card
            shadow='none'
            className={`${className} border border-divider rounded-medium h-fit`}
        >
            <CardHeader className="p-4">
                <FilterIcon size={20} className="text-primary mr-4" />
                <div className="text-xl font-semibold">Filters</div>
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
                >
                    <AccordionItem
                        key="categories"
                        aria-label="Categories"
                        startContent={
                            <MdCategory size={20} className="text-primary" />
                        }
                        title={
                            <div className='flex gap-3 items-center'>
                                <div>Categories</div>
                                <div className='text-foreground-400'>
                                    {categories.level0.length ?? 0}
                                </div>
                            </div>
                        }
                    >
                        <div className='flex flex-col gap-3'>
                            {categories.level0.map(({ categoryId, name }) => (
                                <div key={categoryId}>
                                    <Checkbox size='sm'>
                                        <div>{name}</div>
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="subcategories"
                        aria-label="Subcategories"
                        startContent={
                            <ListTree size={20} className="text-primary" />
                        }
                        title={
                            <div className='flex gap-3 items-center'>
                                <div>Subcategories</div>
                                <div className='text-foreground-400'>
                                    {categories.level1?.length ?? 0}
                                </div>
                            </div>
                        }
                    >
                        <div className='flex flex-col gap-3'>
                            {categories.level1?.map(({ categoryId, name }) => (
                                <div key={categoryId}>
                                    <Checkbox size='sm'>
                                        <div>{name}</div>
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="topics"
                        aria-label="Topics"
                        startContent={
                            <Hash fontSize={20} className="text-primary" />
                        }
                        title={
                            <div className='flex gap-3 items-center'>
                                <div>Topics</div>
                                <div className='text-foreground-400'>
                                    {categories.level2?.length ?? 0}
                                </div>
                            </div>
                        }
                    >
                        <div className='flex flex-col gap-3'>
                            {categories.level2?.map(({ categoryId, name, imageId }) => (
                                <div key={categoryId}>
                                    <Checkbox size='sm'>
                                        <div className='flex gap-2 items-center'>
                                            <Image
                                                src={getAssetUrl(imageId)}
                                                alt='topic'
                                                height={14}
                                                width={14}
                                            />
                                            <div>{name}</div>
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
            <CourseFiltersWrapped className={className}/>
        </CourseFiltersProvider>
    )
}
