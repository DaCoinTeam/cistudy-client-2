import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"
import { MediaType, SectionContentType } from "@common"

const BASE_URL = `${ENDPOINT_API}/courses`

export interface CreateCourseOutput {
  message: string;
  others: {
    courseId: string;
  };
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

export interface UpdateCourseOutput {
  message: string
}

export const updateCourse = async (
    input: UpdateCourseInput
): Promise<UpdateCourseOutput> => {
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
    isTrial?: boolean;
  };
  files?: Array<File>;
}

export interface UpdateLessonOutput {
  message: string
}

export const updateLesson = async (
    input: UpdateLessonInput
): Promise<UpdateLessonOutput> => {
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

export interface DeleteSectionContentInput {
  data: {
    sectionContentId: string;
  };
}

export const deleteSectionContent = async (
    input: DeleteSectionContentInput
): Promise<string> => {
    const { data } = input
    const { sectionContentId } = data
    const url = `${BASE_URL}/delete-section-content/${sectionContentId}`

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

export interface UpdateSectionOutput {
  message: string;
}

export const updateSection = async (
    input: UpdateSectionInput
): Promise<UpdateSectionOutput> => {
    const { data } = input
    const url = `${BASE_URL}/update-section`

    return await authAxios.put(url, data)
}

export interface DeleteSectionInput {
  data: {
    sectionId: string;
  };
}

export interface DeleteSectionOutput {
  message: string;
}

export const deleteSection = async (
    input: DeleteSectionInput
): Promise<DeleteSectionOutput> => {
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

export interface CreateCourseReviewOutput {
  message: string;
}

export const createCourseReview = async (
    input: CreateCourseReviewInput
): Promise<CreateCourseReviewOutput> => {
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
  };
}

export interface FinishQuizAttemptOutput {
  message: string;
  others: {
    receivedPercent : number
    isPassed: boolean
    timeTaken: number
    receivedPoints : number
    totalPoints : number
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

export interface UpdateResourceInput {
  data: {
    resourceId: string;
    title?: string;
    description?: string;
  };
  files?: Array<File>;
}

export interface UpdateResourceOutput {
  message: string;
}

export const updateResource = async (
    input: UpdateResourceInput
): Promise<UpdateResourceOutput> => {
    const { data, files } = input

    const url = `${BASE_URL}/update-resource`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.patch(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export interface DeleteResourceAttachmentInput {
  data: {
    resourceAttachmentId: string;
  };
}

export interface DeleteResourceAttachmentOutput {
  message: string;
}

export const deleteResourceAttachment = async (
    input: DeleteResourceAttachmentInput
): Promise<DeleteResourceAttachmentOutput> => {
    const { data } = input
    const { resourceAttachmentId } = data
    const url = `${BASE_URL}/delete-resource-attachment/${resourceAttachmentId}`

    return await authAxios.delete(url)
}

export interface PublishCourseInput {
  data: {
    courseId: string;
  };
}

export interface PublishCourseOutput {
  message: string;
}

export const publishCourse = async (
    input: PublishCourseInput
): Promise<PublishCourseOutput> => {
    const { data } = input
    const url = `${BASE_URL}/publish-course`
    return await authAxios.patch(url, data)
}

export interface CreateQuizQuestionInput {
  data: {
    quizId: string
  }
}

export interface CreateQuizQuestionOutput {
  message: string
}

export const createQuizQuestion = async (
    input: CreateQuizQuestionInput
): Promise<CreateQuizQuestionOutput> => {
    const {data} = input
    const url = `${BASE_URL}/create-quiz-question`
    return await authAxios.post(url, data)
}

export interface UpdateQuizQuestionMediaInputData {
      mediaIndex: number
      mediaType: MediaType
}

export interface UpdateQuizQuestionInput {
  data: {
    quizQuestionId: string,
    question?: string,
    swapPosition?: number,
    questionMedia?: UpdateQuizQuestionMediaInputData,
    deleteMedia?: boolean,
    point?: number
  }
  files?: Array<File>;
}

export interface UpdateQuizQuestionOutput {
  message: string
}

export const updateQuizQuestion = async (
    input: UpdateQuizQuestionInput
): Promise<UpdateQuizQuestionOutput> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-quiz-question`
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))
    if (files) {
        for (const file of files) {
            formData.append("files", file)
        }
    }

    return await authAxios.patch(url, formData)
}

export interface DeleteQuizQuestionInput {
  data: {
    quizQuestionId: string,
  }
}

export interface DeleteQuizQuestionOutput {
  message: string
}

export const deleteQuizQuestion = async (
    input: DeleteQuizQuestionInput
): Promise<DeleteQuizQuestionOutput> => {
    const {data} = input
    const url = `${BASE_URL}/delete-quiz-question/${data.quizQuestionId}`
    return await authAxios.delete(url)
}

export interface CreateQuizQuestionAnswerInput {
  data: {
    quizQuestionId: string
  }
}

export interface CreateQuizQuestionAnswerOutput {
  message: string
}

export const createQuizQuestionAnswer = async (
    input: CreateQuizQuestionAnswerInput
): Promise<CreateQuizQuestionAnswerOutput> => {
    const {data} = input
    const url = `${BASE_URL}/create-quiz-question-answer`
    return await authAxios.post(url, data)
}

export interface DeleteQuizQuestionAnswerInput {
  data: {
    quizQuestionAnswerId: string
  }
}

export interface DeleteQuizQuestionAnswerOutput {
  message: string
}

export const deleteQuizQuestionAnswer = async (
    input: DeleteQuizQuestionAnswerInput
): Promise<DeleteQuizQuestionAnswerOutput> => {
    const {data} = input
    const url = `${BASE_URL}/delete-quiz-question-answer/${data.quizQuestionAnswerId}`
    return await authAxios.delete(url)
}

export interface UpdateQuizInput {
  data: {
      quizId: string
      timeLimit?: number
      passingPercent?: number
      title?: string
      description?: string
  }
}

export interface UpdateQuizOutput {
  message: string
}

export const updateQuiz = async (
    input: UpdateQuizInput
): Promise<UpdateQuizOutput> => {
    const {data} = input
    const url = `${BASE_URL}/update-quiz`
    return await authAxios.put(url, data)
}

export interface UpdateQuizQuestionAnswerInput {
  data: {
      quizQuestionAnswerId: string,
      isCorrect?: boolean,
      content?: string,
      lastAnswer?: boolean,
      swapPosition?: number
  }
}

export interface UpdateQuizQuestionAnswerOutput {
  message: string
}

export const updateQuizQuestionAnswer = async (
    input: UpdateQuizQuestionAnswerInput
): Promise<UpdateQuizQuestionAnswerOutput> => {
    const {data} = input
    const url = `${BASE_URL}/update-quiz-question-answer`
    return await authAxios.patch(url, data)
}


export interface UpdateQuizAttemptInput {
  data: {
    quizAttemptId: string
    currentQuestionPosition?: number
    quizId: string
  }
}

export interface UpdateQuizAttemptOutput {
  message: string
}

export const updateQuizAttempt = async (
    input: UpdateQuizAttemptInput
): Promise<UpdateQuizAttemptOutput> => {
    const {data} = input
    const url = `${BASE_URL}/update-quiz-attempt`
    return await authAxios.patch(url, data)
}

export interface UpdateQuizAttemptAnswersInput {
  data: {
      quizAttemptId: string
      quizQuestionId: string
      quizQuestionAnswerIds: Array<string>
      quizId: string
  }
}

export interface UpdateQuizAttemptAnswersOutput {
  message: string
}

export const updateQuizAttemptAnswers = async (
    input: UpdateQuizAttemptAnswersInput
): Promise<UpdateQuizAttemptAnswersOutput> => {
    const {data} = input
    const url = `${BASE_URL}/update-quiz-attempt-answers`
    return await authAxios.patch(url, data)
}

export interface MarkAsCompletedResourceInput {
  data: {
      resourceId: string
  }
}

export interface MarkAsCompletedResourceOutput {
  message: string
}

export const markAsCompletedResource = async (
    input: MarkAsCompletedResourceInput
): Promise<MarkAsCompletedResourceOutput> => {
    const {data} = input
    const url = `${BASE_URL}/mark-as-completed-resource`
    return await authAxios.patch(url, data)
}

export interface UpdateLessonProgressInput {
  data: {
    lessonId: string
    completePercent?: number
    completeFirstWatch?: boolean
  }
}

export interface UpdateLessonProgressOutput {
  message: string
}

export const updateLessonProgress = async (
    input: UpdateLessonProgressInput
): Promise<UpdateLessonProgressOutput> => {
    const {data} = input
    const url = `${BASE_URL}/update-lesson-progress`
    return await authAxios.put(url, data)
}

export interface CreateCourseCertificateInput {
  data: {
    courseId: string
  }
}

export interface CreateCourseCertificateOutput {
  message: string
}

export const createCourseCertificate = async (
    input: CreateCourseCertificateInput
): Promise<CreateCourseCertificateOutput> => {
    const {data} = input
    const url = `${BASE_URL}/create-course-certificate`
    return await authAxios.post(url, data)
}

export interface DeleteCourseInput {
  data: {
    courseId: string
  }
}

export interface DeleteCourseOutput {
  message: string
}

export const deleteCourse = async (
    input: DeleteCourseInput
): Promise<DeleteCourseOutput> => {
    const {courseId} = input.data
    const url = `${BASE_URL}/delete-course/${courseId}`
    return await authAxios.delete(url)
}