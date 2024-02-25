import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { SectionEntity, isErrorResponse } from "@common"
import { findManyLectures } from "@services"
import {
    SectionItemAction,
    SectionItemState,
    useSectionItemReducer,
} from "./useSectionItemReducer"
import { AddLectureItem } from "./AddLectureItem"
import { LectureItem } from "./LectureItem"

interface SectionItemProps {
  section: SectionEntity;
}

interface SectionItemContextValue {
  props: SectionItemProps;
  state: SectionItemState;
  dispatch: React.Dispatch<SectionItemAction>;
  functions: {
    fetchAndSetLectures: () => Promise<void>;
  };
}

export const SectionItemContext = createContext<SectionItemContextValue | null>(
    null
)

export const SectionItem = (props: SectionItemProps) => {
    const { section } = props
    const { sectionId } = section

    const [state, dispatch] = useSectionItemReducer()
    const { lectures } = state

    const fetchAndSetLectures = useCallback(async () => {
        const response = await findManyLectures(
            {
                sectionId,
            },
            {
                lectureId: true,
                lectureVideoId: true,
                title: true,
                thumbnailId: true,
                videoType: true,
                resources: {
                    resourceId: true,
                    name: true,
                    fileId: true,
                }
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_LECTURES",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [props])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetLectures()
        }
        handleEffect()
    }, [props])

    const sectionItemContextValue: SectionItemContextValue = useMemo(
        () => ({
            props,
            state,
            dispatch,
            functions: {
                fetchAndSetLectures,
            },
        }),
        [props, state, dispatch]
    )

    return (
        <SectionItemContext.Provider value={sectionItemContextValue}>
            <>
                {lectures.map((lecture) => (
                    <LectureItem key={lecture.lectureId} lecture={lecture} />
                ))}
                <AddLectureItem key="addLecture"/>
            </>
        </SectionItemContext.Provider>
    )
}
