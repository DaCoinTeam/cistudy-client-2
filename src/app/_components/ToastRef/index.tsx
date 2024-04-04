"use client"
import React, { forwardRef, useImperativeHandle } from "react"

import { ToastContainer, toast } from "react-toastify"
import "./ReactToastify.css"

export enum ToastType {
  Earn = "earn",
}

export interface EarnNotifyData {
  earnAmount: number;
}

export type NotifyParams = {
  data: EarnNotifyData;
  type: ToastType.Earn;
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
        }
        toast(content)
    }

    useImperativeHandle(ref, () => ({
        notify,
    }))

    return <ToastContainer  />
})
