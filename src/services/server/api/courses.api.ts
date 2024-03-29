import { API_ENDPOINT } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${API_ENDPOINT}/courses`

export interface CreateCourseOutput {
  courseId: string;
}

export const createCourse = async (): Promise<CreateCourseOutput> => {
    const url = `${BASE_URL}/create-course`
    return await authAxios.post(url)
}

export interface EnrollCourseInput {
  data: {
    courseId: string;
    transactionHash: string;
  };
}

export interface EnrollCourseOutput {
  enrolledInfoId: string;
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
    categoryId?: string;
    subcategoryIds?: Array<string>;
    topicIds?: Array<string>;
  };
  files?: Array<File>;
}

export const updateCourse = async (
    input: UpdateCourseInput
): Promise<string> => {
    const { data, files } = input

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
    })
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

export interface CreateLectureInput {
  data: {
    sectionId: string;
    title: string;
  };
}

export const createLecture = async (
    input: CreateLectureInput
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-lecture`

    return await authAxios.post(url, data)
}

export interface UpdateLectureInput {
  data: {
    lectureId: string;
    title?: string;
    description?: string;
    thumbnailIndex?: number;
    lectureVideoIndex?: number;
  };
  files?: Array<File>;
}

export const updateLecture = async (
    input: UpdateLectureInput
): Promise<string> => {
    const { data, files } = input
    const url = `${BASE_URL}/update-lecture`
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

export interface DeleteLectureInput {
  data: {
    lectureId: string;
  };
}

export const deleteLecture = async (
    input: DeleteLectureInput
): Promise<string> => {
    const { data } = input
    const { lectureId } = data
    const url = `${BASE_URL}/delete-lecture/${lectureId}`

    return await authAxios.delete(url)
}

export interface CreateResourcesInput {
  data: {
    lectureId: string;
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

