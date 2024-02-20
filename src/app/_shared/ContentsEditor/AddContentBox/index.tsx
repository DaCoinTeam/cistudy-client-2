import React, { useContext } from "react"
import {
    Card,
    CardFooter,
    Tabs,
    Tab,
    Textarea,
    Image,
    Badge,
    Spacer,
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
import { FileDropzone } from "../../FileDropzone"
import { useAddContentBoxReducer } from "./useAddContentBoxReducer"
import { v4 as uuidv4 } from "uuid"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { ContentsEditorContext } from "../ContentsEditorProviders"
import { PostContent } from "../useContentsEditorReducer"

export const AddContentBox = () => {
    const [state, dispatch] = useAddContentBoxReducer()
    const { contentSelected, text, code, link, images, videos } = state

    const { state: contentsEditorState, dispatch: contentsEditorDispatch } =
    useContext(ContentsEditorContext)!

    const onImageDrop = (files: Array<File>) =>
        dispatch({
            type: "SET_IMAGES",
            payload: [...images, ...files],
        })

    const onVideoDrop = (files: Array<File>) =>
        dispatch({
            type: "SET_VIDEOS",
            payload: files,
        })

    const onTextChange = (value: string) =>
        dispatch({
            type: "SET_TEXT",
            payload: value,
        })

    const onCodeChange = (value: string) =>
        dispatch({
            type: "SET_CODE",
            payload: value,
        })

    // const onLinkChange = (value: string) =>
    //     dispatch({
    //         type: "SET_LINK",
    //         payload: value,
    //     })

    const items: Array<Item> = [
        {
            key: "text",
            icon: <VariableIcon className="w-6 h-6" />,
            content: (
                <Textarea
                    fullWidth
                    classNames={{
                        inputWrapper: "!bg-content1",
                    }}
                    value={text}
                    onValueChange={onTextChange}
                />
            ),
            data: {
                text,
                contentType: ContentType.Text,
            },
        },
        {
            key: "code",
            icon: <CodeBracketIcon className="w-6 h-6" />,
            content: (
                <Textarea
                    fullWidth
                    classNames={{
                        inputWrapper: "!bg-content1",
                        input: "font-mono",
                    }}
                    value={code}
                    onValueChange={onCodeChange}
                />
            ),
            data: {
                text: code,
                contentType: ContentType.Code,
            },
        },
        {
            key: "link",
            icon: <LinkIcon className="w-6 h-6" />,
            content: <div />,
            data: {
                text: link,
                contentType: ContentType.Link,
            },
        },
        {
            key: "images",
            icon: <PhotoIcon className="w-6 h-6" />,
            content: (
                <div>
                    <FileDropzone onDrop={onImageDrop} />
                    {images.length ? <Spacer y={4} /> : null}

                    <div className="grid grid-cols-4 gap-2 items-center">
                        {images.map((image, index) => (
                            <Badge
                                isOneChar
                                key={`${uuidv4()}-${index}`}
                                as="button"
                                content={<XMarkIcon className="w-3 h-3" />}
                                shape="circle"
                                color="danger"
                                onClick={() => {
                                    images.splice(index, 1)
                                    dispatch({
                                        type: "SET_IMAGES",
                                        payload: images,
                                    })
                                }}
                            >
                                <Image
                                    className="span-col-1 aspect-video"
                                    alt="image"
                                    src={URL.createObjectURL(image)}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>
            ),
            data: {
                postContentMedias: images,
                contentType: ContentType.Images,
            },
        },
        {
            key: "videos",
            icon: <VideoCameraIcon className="w-6 h-6" />,
            content: <FileDropzone onDrop={onVideoDrop} />,
            data: {
                postContentMedias: videos,
                contentType: ContentType.Videos,
            },
        },
    ]

    const onSelectionChange = (key: Key) =>
        dispatch({
            type: "SET_CONTENT_SELECTED",
            payload: key as ContentType,
        })

    const onPress = () => {
        const content: PostContent = (
      items.find((item) => item.key === contentSelected) as Item
        ).data

        contentsEditorDispatch({
            type: "APPEND_POST_CONTENT",
            payload: content,
        })
        dispatch({
            type: "RESET",
        })
    }

    console.log(contentsEditorState)

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
                <Button fullWidth onPress={onPress}>
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
  data: PostContent;
}
