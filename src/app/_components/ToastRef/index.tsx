"use client"
import React, { forwardRef, useImperativeHandle } from "react"
import toast, { Toaster } from "react-hot-toast"

export enum ToastType {
  Earn = "earn",
  Error = "error",
  Success = "success"
}


export interface NotifyData {
  error?: string;
  earnAmount?: number;
  message?: string;

}
export type NotifyParams = {
  data: NotifyData ;
  type: ToastType.Earn | ToastType.Error | ToastType.Success;
};

export type NotifyFn = (params: NotifyParams) => void;

export interface ToastRefSelectors {
  notify: NotifyFn
}

export const ToastRef = forwardRef<ToastRefSelectors>((_, ref) => {
    const notify = (params: NotifyParams) => {
        let content: JSX.Element
        switch (params.type) {
        case ToastType.Earn:
            content = <div> Earned {params.data.earnAmount} STARCI2 </div>
            toast.success(content)
            break
        case ToastType.Error:
            content = <div> {params.data.error}</div>
            toast.error(content)
            break

        case ToastType.Success:
            content = <div> {params.data.message}</div>
            toast.success(content)
            break
        }
    }

    useImperativeHandle(ref, () => ({
        notify,
    }))

    return <Toaster position='top-right' />

})
