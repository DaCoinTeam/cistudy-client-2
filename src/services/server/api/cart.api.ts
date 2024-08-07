import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}/cart`

export interface AddToCartInput {
    data: {
        courseId: string
    }
}


export interface AddToCartInput {
    data: {
        courseId: string
    }
}
export interface AddToCartOutput {
    message: string;
    others: {
      orderId: string
    };
  }

export const addToCart = async (input: AddToCartInput): Promise<AddToCartOutput> => {
    const { data } = input
    const url = `${BASE_URL}/add-to-cart`
    return await authAxios.post(url, data)
}

export interface DeleteFromCartInput {
    data: {
        cartCourseIds: Array<string>
    }
}

export interface DeleteFromCartOutput {
    message: string;
    others: {
      orderId: string
    };
  }
export const deleteFromCart = async (
    input: DeleteFromCartInput
): Promise<DeleteFromCartOutput> => {
    const { data } = input
    const url = `${BASE_URL}/delete-from-cart`
    return await authAxios.post(url, data)
}

export interface CheckOutInput {
    data: {
        cartCourseIds: Array<string>
    }
}

export interface CheckOutOutput {
    message: string;
  }
export const checkOut = async (
    input: CheckOutInput
): Promise<CheckOutOutput> => {
    const { data } = input
    const url = `${BASE_URL}/checkout`
    return await authAxios.post(url, data)
}
