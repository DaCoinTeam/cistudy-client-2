import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { LectureEntity, isErrorResponse } from "@common"
import { Card, CardBody, Image } from "@nextui-org/react"
import { ClockIcon } from "@heroicons/react/24/outline"
import { findOneLecture, getAssetUrl } from "@services"
import {
    LectureItemAction,
    LectureItemState,
    useLectureItemReducer,
} from "./useLectureItemReducer"
import { LectureVideoModal } from "./LectureVideoModal"
import { DeleteLectureButton } from "./DeleteLectureButton"

interface LectureItemProps {
  lecture: LectureEntity;
}

interface LectureItemContextValue {
  state: LectureItemState;
  dispatch: React.Dispatch<LectureItemAction>;
  functions: {
    fetchAndSetLecture: () => Promise<void>;
  };
}

export const LectureItemContext = createContext<LectureItemContextValue | null>(
    null
)

export const LectureItem = (props: LectureItemProps) => {
    const { lectureId } = props.lecture

    const [state, dispatch] = useLectureItemReducer()
    const { lecture } = state

    const fetchAndSetLecture = useCallback(async () => {
        const response = await findOneLecture(
            {
                lectureId,
            },
            {
                lectureId: true,
                lectureVideoId: true,
                title: true,
                thumbnailId: true,
                resources: {
                    resourceId: true,
                    name: true,
                    fileId: true,
                },
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_LECTURE",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [props])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetLecture()
        }
        handleEffect()
    }, [props])

    const LectureItemContextValue: LectureItemContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetLecture,
            },
        }),
        [props, state]
    )

    return (
        <LectureItemContext.Provider value={LectureItemContextValue}>
            <Card shadow="none" className="bg-content1" fullWidth key={lecture?.sectionId}>
                <CardBody>
                    <div className="justify-between flex items-center w-full">
                        <div className="flex gap-4 items-center">
                            <Image
                                className="h-12 aspect-video"
                                alt={lectureId}
                                src={getAssetUrl(lecture?.thumbnailId)}
                                fallbackSrc="https://via.placeholder.com/300x200"
                            />
                            <div>
                                <div className="text-sm"> {lecture?.title} </div>
                                <div className="flex items-center gap-1">
                                    <ClockIcon className="w-3 h-3 text-foreground-500" />
                                    <div className="text-xs text-foreground-500">15 min </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LectureVideoModal />
                            {/* <ResourcesModal /> */}
                            <DeleteLectureButton />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </LectureItemContext.Provider>
    )
}
