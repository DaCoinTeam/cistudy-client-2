import React, { createContext, useCallback, useMemo } from "react"
import { ErrorResponse, LessonEntity, SectionEntity } from "@common"
import { findManyLessons } from "@services"

import useSWR, { SWRConfig, SWRResponse } from "swr"
import { LessonItem } from "./LessonItem"
import { AddLessonItem } from "./AddLessonItem"

interface SectionItemProps {
  section: SectionEntity;
}

interface SectionItemContextValue {
  props: SectionItemProps;
  swrs: {
    lessonsSwr: SWRResponse<Array<LessonEntity>, ErrorResponse>;
  };
}

export const SectionItemContext = createContext<SectionItemContextValue | null>(
    null
)

const WrappedSectionItem = (props: SectionItemProps) => {
    const { section } = props
    const { sectionId } = section

    const fetchLessons = useCallback(async () => {
        return await findManyLessons(
            {
                params: {
                    sectionId,
                }
            },
            {
                lessonId: true,
                lessonVideoId: true,
                title: true,
                description: true,
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

    const lessonsSwr = useSWR("LESSONS", fetchLessons)

    const sectionItemContextValue: SectionItemContextValue = useMemo(
        () => ({
            props,
            swrs: {
                lessonsSwr,
            },
        }),
        [props, lessonsSwr]
    )
    const handleSortLesson = (lessons: Array<LessonEntity>) => {
        if (!lessons) return []
        return lessons.sort((prev: LessonEntity, next: LessonEntity) => {
            return new Date(prev.createdAt).getTime() - new Date(next.createdAt).getTime()
        })
    }
    const {data} = lessonsSwr

    return (
        <SectionItemContext.Provider value={sectionItemContextValue}>
            <>
                {data && handleSortLesson(data)?.map((lesson) => (
                    <LessonItem key={lesson.lessonId} lesson={lesson} />
                ))}
                <AddLessonItem key="addLesson" />
            </>
        </SectionItemContext.Provider>
    )
}

export const SectionItem = (props: SectionItemProps) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedSectionItem {...props} />
    </SWRConfig>
)
