import React, { createContext, useCallback, useMemo } from "react"
import { ErrorResponse, LectureEntity, SectionEntity } from "@common"
import { findManyLectures } from "@services"
import { AddLectureItem } from "./AddLectureItem"
import { LectureItem } from "./LectureItem"
import useSWR, { SWRConfig, SWRResponse } from "swr"

interface SectionItemProps {
  section: SectionEntity;
}

interface SectionItemContextValue {
  props: SectionItemProps;
  swrs: {
    lecturesSwr: SWRResponse<Array<LectureEntity>, ErrorResponse>;
  };
}

export const SectionItemContext = createContext<SectionItemContextValue | null>(
    null
)

const WrappedSectionItem = (props: SectionItemProps) => {
    const { section } = props
    const { sectionId } = section

    const fetchLectures = useCallback(async () => {
        return await findManyLectures(
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
                },
            }
        )
    }, [props])

    const lecturesSwr = useSWR("FETCH_LECTURES", fetchLectures)

    const sectionItemContextValue: SectionItemContextValue = useMemo(
        () => ({
            props,
            swrs: {
                lecturesSwr,
            },
        }),
        [props, lecturesSwr]
    )

    return (
        <SectionItemContext.Provider value={sectionItemContextValue}>
            <>
                {lecturesSwr.data?.map((lecture) => (
                    <LectureItem key={lecture.lectureId} lecture={lecture} />
                ))}
                <AddLectureItem key="addLecture" />
            </>
        </SectionItemContext.Provider>
    )
}

export const SectionItem = (props: SectionItemProps) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedSectionItem {...props} />
    </SWRConfig>
)
