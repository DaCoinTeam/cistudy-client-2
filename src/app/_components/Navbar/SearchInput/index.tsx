import { CategoryEntity } from "@common"
import { Autocomplete, AutocompleteItem, Link } from "@nextui-org/react"
import React, { useContext, useMemo } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { RootContext } from "../../../_hooks"
interface SearchInputProps {
  className?: string;
}

export const SearchInput = (props: SearchInputProps) => {
    const { className } = props
    const { formik, swrs, reducer } = useContext(RootContext)!
    const [state, dispatch] = reducer
    const { categoryFilter } = state
    const { topicsSwr } = swrs
    const { data: topics } = topicsSwr

    const onValueChange = (value: string) => {
        formik.setFieldValue("searchValue", value)
    }
    const onSubmit = () => {
        if (categoryFilter?.length > 0) {
            dispatch({ type: "RESET_CATEGORY_FILTER" })
        }

        formik.submitForm()
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") onSubmit()
    }
    const onPressSearchItem = (topicName: string) => {
        onValueChange(topicName)
        onSubmit()
    }
    const findNonDuplicatedTopics = (arr: CategoryEntity[]): CategoryEntity[] => {
        const nameToCategoryMap = new Map<string, CategoryEntity>()

        arr.forEach((category) => {
            if (!nameToCategoryMap.has(category.name)) {
                nameToCategoryMap.set(category.name, category)
            }
        })

        return Array.from(nameToCategoryMap.values())
    }
    const handleSearchRelativeTopic = useMemo(() => {
        if (!formik.values.searchValue) return []
        if (topics && topics?.length !== 0) {
            const result = topics.filter((topic) =>
                topic.name
                    .toLowerCase()
                    .includes(formik.values.searchValue.toLowerCase())
            )
            return findNonDuplicatedTopics(result)
        }
        return []
    }, [formik.values.searchValue])

    return (
        <Autocomplete
            classNames={{
                // inputWrapper: "input-input-wrapper"
                selectorButton: "hidden",
            }}
            value={formik.values.searchValue}
            onInputChange={onValueChange}
            className={`${className}`}
            placeholder='Type to search...'
            labelPlacement='outside'
            label=''
            aria-label='Search Input'
            onKeyDown={onKeyDown}
            onSelectionChange={(value) => {
                if (value) onPressSearchItem(value.toString())
            }}
            startContent={
                <Link color='foreground' as='button' onPress={onSubmit}>
                    <HiMagnifyingGlass height={20} width={20} />
                </Link>
            }
        >
            {handleSearchRelativeTopic?.map((topic: CategoryEntity) => (
                <AutocompleteItem
                    aria-label='Autocomplete Item'
                    key={topic?.name}
                    className='capitalize'
                >
                    {topic.name}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}
