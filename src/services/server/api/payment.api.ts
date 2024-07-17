import { ENDPOINT_API } from "@config"
import { authAxios } from "./axios-instances"

const BASE_URL = `${ENDPOINT_API}/payment`

export interface CreateOrderInput {
  data: {
    amount: number;
    isSandbox?: boolean;
  };
}

export interface CreateOrderOutput {
  message: string;
  others: {
    orderId: string
  };
}

export const createOrder = async (
    input: CreateOrderInput
): Promise<CreateOrderOutput> => {
    const { data } = input
    const url = `${BASE_URL}/create-order`

    return await authAxios.post(url, data)
}

export interface CaptureOrderInput {
  data: {
    orderId: string;
    isSandbox?: boolean;
  };
}

export interface CaptureOrderOutput {
  message: string;
  others: {
    amount: number
  };
}

export const captureOrder = async (
    input: CaptureOrderInput
): Promise<CaptureOrderOutput> => {
    const { data } = input
    const url = `${BASE_URL}/capture-order`

    return await authAxios.post(url, data)
}
