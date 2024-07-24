import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"
import { SectionContentType } from "@common"

const BASE_URL = `${ENDPOINT_API}/courses`

export interface CreateCourseOutput {
    message: string;
    others: {
      courseId: string;
    }
}

export const createCourse = async (): Promise<CreateCourseOutput> => {
    const url = `${BASE_URL}/create-course`
    return await authAxios.post(url)
}

export interface EnrollCourseInput {
  data: {
    courseId: string;
    numberOfQueries?: number;
    queryInterval?: number;
  };
}

export interface EnrollCourseOutput {
  message: string;
  others: {
    enrolledInfoId: string;
  };
}

export const enrollCourse = async (
    input: EnrollCourseInput
): Promise<EnrollCourseOutput> => {
    const { data } = input
    const url = `${BASE_URL}/enroll-course`

    return await authAxios.patch(url, data)
}

export interface UpdateCourseInput {
  data: {
    courseId: string;
    title?: string;
    description?: string;
    price?: number;
    discountPrice?: number;
    enableDiscount?: boolean;
    thumbnailIndex?: number;
    previewVideoIndex?: number;
    targets?: Array<string>;
    receivedWalletAddress?: string;
    categoryIds?: Array<string>;
  };
  files?: Array<File>;
  signal?: AbortSignal;
}

export const updateCourse = async (
    input: UpdateCourseInput
): Promise<string> => {
    const { data, files, signal } = input

    const url = `${BASE_URL}/update-course`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.put(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        signal,
    })
}

export interface CheckCumulativeAmountInput {
  data: {
    creatorWalletAddress: string;
    price: string;
  };
}

export interface CheckCumulativeAmountOutput {
  message: string;
  others: {
    enough: boolean;
    cummulativeAmount: string;
    differentAmounts: string;
  };
}

export const checkCumulativeAmount = async (
    input: CheckCumulativeAmountInput
): Promise<CheckCumulativeAmountOutput> => {
    const { data } = input
    const url = `${BASE_URL}/check-cumulative-amount`

    return await authAxios.patch(url, data)
}

export interface CreateCourseTargetInput {
  data: {
    courseId: string;
    content: string;
  };
}

export const createCourseTarget = async (
    input: CreateCourseTargetInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-course-target`

    return await authAxios.post(url, data)
}

export interface UpdateCourseTargetInput {
  data: {
    courseTargetId: string;
    content: string;
  };
  signal?: AbortSignal;
}

export const updateCourseTarget = async (
    input: UpdateCourseTargetInput
): Promise<string> => {
    const { data, signal } = input
    const url = `${BASE_URL}/update-course-target`

    return await authAxios.put(url, data, {
        signal,
    })
}

export interface DeleteCourseTargetInput {
  data: {
    courseTargetId: string;
  };
}

export const deleteCourseTarget = async (
    input: DeleteCourseTargetInput
): Promise<string> => {
    const { data } = input
    const { courseTargetId } = data
    const url = `${BASE_URL}/delete-course-target/${courseTargetId}`

    return await authAxios.delete(url)
}

export interface CreateLessonInput {
  data: {
    sectionId: string;
    title: string;
  };
}

export const createLesson = async (
    input: CreateLessonInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-lesson`

    return await authAxios.post(url, data)
}

export interface UpdateLessonInput {
  data: {
    lessonId: string;
    title?: string;
    description?: string;
    thumbnailIndex?: number;
    lessonVideoIndex?: number;
  };
  files?: Array<File>;
}

export const updateLesson = async (
    input: UpdateLessonInput
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-lesson`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.put(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface DeleteLessonInput {
  data: {
    lessonId: string;
  };
}

export const deleteLesson = async (
    input: DeleteLessonInput
): Promise<string> => {
    const { data } = input
    const { lessonId } = data
    const url = `${BASE_URL}/delete-lesson/${lessonId}`

    return await authAxios.delete(url)
}

export interface CreateResourcesInput {
  data: {
    lessonId: string;
  };
  files: Array<File>;
}

export const createResources = async (
    input: CreateResourcesInput
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/create-resources`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.post(url, formData)
}

export interface CreateSectionInput {
  data: {
    courseId: string;
    title?: string;
  };
}

export const createSection = async (
    input: CreateSectionInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-section`

    return await authAxios.post(url, data)
}

export interface CreateSectionContentInput {
  data: {
    sectionId: string;
    type: SectionContentType;
  };
}

export interface CreateSectionContentOutput {
  message: string;
} 

export const createSectionContent = async (
    input: CreateSectionContentInput
): Promise<CreateSectionContentOutput> => {
    const { data } = input
    const url = `${BASE_URL}/create-section-content`

    return await authAxios.post(url, data)
}

export interface UpdateSectionInput {
  data: {
    sectionId: string;
    title?: string;
  };
}

export const updateSection = async (
    input: UpdateSectionInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/update-section`

    return await authAxios.put(url, data)
}

export interface DeleteSectionInput {
  data: {
    sectionId: string;
  };
}

export const deleteSection = async (
    input: DeleteSectionInput
): Promise<string> => {
    const { data } = input
    const { sectionId } = data
    const url = `${BASE_URL}/delete-section/${sectionId}`

    return await authAxios.delete(url)
}

export interface DeleteResourceInput {
  data: {
    resourceId: string;
  };
}

export const deleteResource = async (
    input: DeleteResourceInput
): Promise<string> => {
    const { data } = input
    const { resourceId } = data
    const url = `${BASE_URL}/delete-resource/${resourceId}`

    return await authAxios.delete(url)
}

export interface CreateCourseReviewInput {
  data: {
    courseId: string;
    content: string;
    rating: number;
  };
}
export const createCourseReview = async (
    input: CreateCourseReviewInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-course-review`
    return await authAxios.post(url, data)
}

export interface UpdateCourseReviewInput {
  data: {
    courseReviewId: string;
    content: string;
    rating: number;
  };
}
export const updateCourseReview = async (
    input: UpdateCourseReviewInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/update-course-review`
    return await authAxios.patch(url, data)
}
export interface DeleteCourseReviewInput {
  courseReviewId: string;
}

export const deleteCourseReview = async (
    courseReviewId: DeleteCourseReviewInput
): Promise<string> => {
    const url = `${BASE_URL}/delete-course-review/${courseReviewId}`
    return await authAxios.delete(url)
}

export interface CreateQuizAttemptInput {
  data: {
    quizId: string;
  };
}

export interface CreateQuizAttemptOutput {
  message: string;
  others: {
    quizAttemptId: string;
  };
}

export const createQuizAttempt = async (
    input: CreateQuizAttemptInput
): Promise<CreateQuizAttemptOutput> => {
    const { data } = input
    const url = `${BASE_URL}/create-quiz-attempt`
    return await authAxios.post(url, data)
}

export interface FinishQuizAttemptInput {
  data: {
    quizAttemptId: string;
    quizQuestionAnswerIds: string[];
    timeTaken: number;
  };
}

export interface FinishQuizAttemptOutput {
  message: string;
  others: {
    score: number;
  };
}

export const finishQuizAttempt = async (
    input: FinishQuizAttemptInput
): Promise<FinishQuizAttemptOutput> => {
    const { data } = input
    const url = `${BASE_URL}/finish-quiz-attempt`
    return await authAxios.post(url, data)
}

export interface MarkContentCompleteInput {
  data: {
    sectionContentId: string;
  };
}

export interface MarkContentCompleteOutput {
  message: string;
}

export const markContentComplete = async (
    input: MarkContentCompleteInput
): Promise<MarkContentCompleteOutput> => {
    const { data } = input
    const url = `${BASE_URL}/mark-content-complete`
    return await authAxios.post(url, data)
}