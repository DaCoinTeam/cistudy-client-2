"use client"
import React, { forwardRef, useImperativeHandle } from "react"
import toast, { Toaster } from "react-hot-toast";

export enum ToastType {
  Earn = "earn",
  Error = "error"
}


export interface NotifyData {
  error?: string;
  earnAmount?: number;

}
export type NotifyParams = {
  data: NotifyData ;
  type: ToastType.Earn | ToastType.Error;
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
            break;
        case ToastType.Error:
              content = <div> {params.data.error}</div>
            toast.error(content)
            break;
        }
    }

    useImperativeHandle(ref, () => ({
        notify,
    }))

    return <Toaster position='top-right' />

})
