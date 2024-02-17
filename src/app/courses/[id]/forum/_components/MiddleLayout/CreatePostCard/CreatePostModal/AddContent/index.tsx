import React, { useContext } from "react"
import {
    Card,
    CardFooter,
    Tabs,
    Tab,
    Textarea,
    Link,
    Image,
    Badge,
    Spacer,
    CardBody,
    Button,
    CardHeader,
} from "@nextui-org/react"
import {
    VariableIcon,
    PhotoIcon,
    VideoCameraIcon,
    LinkIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline"
import { ContentType, Key, PostContentEntity } from "@common"
import { FileDropzone } from "../../../../../../../../_shared"
import { ContentSelected, useAddContentReducer } from "./useAddContentReducer"
import { v4 as uuidv4 } from "uuid"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { FormikContext } from "../FormikProviders"

export const AddContent = () => {
    const [state, dispatch] = useAddContentReducer()
    const { contentSelected, text, code, link, images, videos } = state
    const formik = useContext(FormikContext)!

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

    const items = [
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
        },
        {
            key: "link",
            icon: <LinkIcon className="w-6 h-6" />,
            content: <div />,
        },
        {
            key: "image",
            icon: <PhotoIcon className="w-6 h-6" />,
            content: (
                <div>
                    <FileDropzone onDrop={onImageDrop} />
                    <Spacer y={6} />
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
        },
        {
            key: "video",
            icon: <VideoCameraIcon className="w-6 h-6" />,
            content: (
                <div>
                    <FileDropzone onDrop={onVideoDrop} />,<Link></Link>
                </div>
            ),
        },
    ]

    const onSelectionChange = (key: Key) =>
        dispatch({
            type: "SET_CONTENT_SELECTED",
            payload: key as ContentSelected,
        })

    const onPress = () => {
        const contentSelectedToContent: Record<
      ContentSelected,
      Partial<PostContentEntity>
    > = {
        [ContentSelected.Text]: {
            content: text,
            contentType: ContentType.Text,
        },
        [ContentSelected.Code]: {
            content: code,
            contentType: ContentType.Code,
        },
        [ContentSelected.Link]: {
            content: text,
            contentType: ContentType.Text,
        },
        [ContentSelected.Videos]: {
            content: code,
            contentType: ContentType.Code,
        },
        [ContentSelected.Images]: {
            content: text,
            contentType: ContentType.Text,
        },
    }

        const content = contentSelectedToContent[contentSelected]
        const contents = formik.values.contents
        formik.setFieldValue("contents", [...contents, content])
    }

    return (
        <Card className="bg-content2 w-full" shadow="none">
            <CardBody className="w-full p-6">
                <div className="w-full">
                    <Tabs
                        selectedKey={contentSelected}
                        onSelectionChange={onSelectionChange}
                        fullWidth
                        aria-label="Options"
                        color="primary"
                        variant="light"
                    >
                        {items.map((item) => (
                            <Tab key={item.key} title={item.icon}>
                                {item.content}
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </CardBody>
            <CardFooter className="p-6 pt-0">
                <Button fullWidth color="primary" onPress={onPress}>
                    {" "}
          Add{" "}
                </Button>
            </CardFooter>
        </Card>
    )
}
