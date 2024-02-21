import React, { useContext } from "react"
import {
    Card,
    CardFooter,
    Tabs,
    Tab,
    CardBody,
    Button,
} from "@nextui-org/react"
import {
    VariableIcon,
    PhotoIcon,
    VideoCameraIcon,
    LinkIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline"
import { ContentType, Key } from "@common"
import { FormikProviders } from "./FormikProviders"
import { TextTab } from "./TextTab"
import { CodeTab } from "./CodeTab"
import { ImagesTab } from "./ImagesTab"
import { AddContentBoxContext, AddContentBoxsProviders } from "./AddContentBoxProviders"

export const WrappedAddContentBox = () => {

    const { state, dispatch } = useContext(AddContentBoxContext)!
    const { contentSelected } = state 

    const items: Array<Item> = [
        {
            key: "text",
            icon: <VariableIcon className="w-6 h-6" />,
            content: <TextTab />,
        },
        {
            key: "code",
            icon: <CodeBracketIcon className="w-6 h-6" />,
            content: <CodeTab />,
        },
        {
            key: "link",
            icon: <LinkIcon className="w-6 h-6" />,
            content: <div />,
        },
        {
            key: "images",
            icon: <PhotoIcon className="w-6 h-6" />,
            content: <ImagesTab />,
        },
        {
            key: "videos",
            icon: <VideoCameraIcon className="w-6 h-6" />,
            content: <div />,
        },
    ]

    const onSelectionChange = (key: Key) => {
        dispatch({
            type: "SET_CONTENT_TYPE",
            payload: key as ContentType
        })
    }

    return (
        <Card className="bg-content2 w-full" shadow="none">
            <CardBody className="w-full p-4">
                <div className="w-full">
                    <Tabs
                        selectedKey={contentSelected}
                        onSelectionChange={onSelectionChange}
                        fullWidth
                        aria-label="Options"
                        variant="light"
                        classNames={{
                            cursor: "bg-content3 shadow-none",
                            panel: "!px-0 !pb-0",
                        }}
                    >
                        {items.map((item) => (
                            <Tab key={item.key} title={item.icon}>
                                {item.content}
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </CardBody>
            <CardFooter className="p-4 pt-0">
                <Button fullWidth type="submit">
          Add
                </Button>
            </CardFooter>
        </Card>
    )
}

interface Item {
  key: string;
  icon: React.JSX.Element;
  content: React.JSX.Element;
}

export const AddContentBox = () => (
    <AddContentBoxsProviders>
        <FormikProviders>
            <WrappedAddContentBox />
        </FormikProviders>
    </AddContentBoxsProviders>
)
