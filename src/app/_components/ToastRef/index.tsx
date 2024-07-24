"use client"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "@nextui-org/react"
import React, { forwardRef, useImperativeHandle } from "react"
import toast, { Toaster } from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"

export enum ToastType {
  Earn = "earn",
  Error = "error",
  Success = "success",
}

export interface NotifyData {
  error?: string;
  earnAmount?: number;
  message?: string;
}
export type NotifyParams = {
  data: NotifyData;
  type: ToastType.Earn | ToastType.Error | ToastType.Success;
};

export type NotifyFn = (params: NotifyParams) => void;

export interface ToastRefSelectors {
  notify: NotifyFn;
}

export const DURATION = 15_000

export const ToastRef = forwardRef<ToastRefSelectors>((_, ref) => {
    const notify = (params: NotifyParams) => {
        let content: string
        const id = uuidv4()
        switch (params.type) {
        case ToastType.Earn: {
            content = `Earned ${params.data.earnAmount} STARCI`
            toast.success(
                <div className="flex gap-2 items-center">
                    <div className="text-sm">{content}</div>
                    <Link as="button" onPress={() => toast.dismiss(id)}>
                        <XMarkIcon className="w-5 h-5" />
                    </Link>
                </div>,
                {
                    id,
                    duration: DURATION,
                }
            )
            break
        }

        case ToastType.Error: {
            content = params.data.error ?? ""
            toast.error(
                <div className="flex gap-2 items-center">
                    <div className="text-sm">{content}</div>
                    <Link as="button" onPress={() => toast.dismiss(id)}>
                        <XMarkIcon className="w-5 h-5" />
                    </Link>
                </div>,
                {
                    id,
                    duration: DURATION,
                }
            )
            break
        }
        case ToastType.Success: {
            content = params.data.message ?? ""
            toast.success(
                <div className="flex gap-2 items-center">
                    <div className="text-sm">{content}</div>
                    <Link as="button" onPress={() => toast.dismiss(id)}>
                        <XMarkIcon className="w-5 h-5" />
                    </Link>
                </div>,
                {
                    id,
                    duration: DURATION,
                }
            )
            break
        }
        }
    }

    useImperativeHandle(ref, () => ({
        notify,
    }))

    return <Toaster position="bottom-right" />
})
