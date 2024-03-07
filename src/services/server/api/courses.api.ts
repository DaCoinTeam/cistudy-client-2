import { endpointConfig } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${endpointConfig().api}/courses`

export const createCourse = async (
): Promise<{
    courseId: string;
}> => {
    const url = `${BASE_URL}/create-course`
    return await authAxios.post(url)
}

export const updateCourse = async (
    input: {
        data: {
            courseId: string;
            title?: string;
            description?: string;
            price?: number;
            thumbnailIndex?: number;
            previewVideoIndex?: number;
            targets?: Array<string>;
        };
        files?: Array<File>;
    },
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

export const createCourseTarget = async (
    input: {
        data: {
            courseId: string;
            content: string;
        };
    },
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-course-target`

    return await authAxios.post(url, data)
}

export const updateCourseTarget = async (
    input: {
        data: {
            courseTargetId: string;
            content: string;
        };
        signal?: AbortSignal;
    },
): Promise<string> => {
    const { data, signal } = input
    const url = `${BASE_URL}/update-course-target`

    return await authAxios.put(url, data, {
        signal,
    })
}

export const deleteCourseTarget = async (
    input: {
        data: {
            courseTargetId: string;
        };
    },
): Promise<string> => {
    const { data } = input
    const { courseTargetId } = data
    const url = `${BASE_URL}/delete-course-target/${courseTargetId}`

    return await authAxios.delete(url)
}

export const createLecture = async (
    input: {
        data: {
            sectionId: string;
            title: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-lecture`

    return await authAxios.post(url, data,)
}

export const updateLecture = async (
    input: {
        data: {
            lectureId: string;
            title?: string;
            thumbnailIndex?: number;
            lectureVideoIndex?: number;
        };
        files?: Array<File>;
    }
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

export const deleteLecture = async (
    input: {
        data: {
            lectureId: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const { lectureId } = data
    const url = `${BASE_URL}/delete-lecture/${lectureId}`

    return await authAxios.delete(url)
}

export const createResources = async (
    input: {
        data: {
            lectureId: string;
        };
        files: Array<File>;
    },
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

export const createSection = async (
    input: {
        data: {
            courseId: string;
            title?: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/create-section`

    return await authAxios.post(url, data)
}

export const updateSection = async (
    input: {
        data: {
            sectionId: string;
            title?: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const url = `${BASE_URL}/update-section`

    return await authAxios.put(url, data)
}

export const deleteSection = async (
    input: {
        data: {
            sectionId: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const { sectionId } = data
    const url = `${BASE_URL}/delete-section/${sectionId}`

    return await authAxios.delete(url)
}

export const deleteResource = async (
    input: {
        data: {
            resourceId: string;
        };
    }
): Promise<string> => {
    const { data } = input
    const { resourceId } = data
    const url = `${BASE_URL}/delete-resource/${resourceId}`

    return await authAxios.delete(url)
}
