import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { ENDPOINT_WEBSOCKET } from "@config"
import { onInitialize } from "@services"
import { getClientId, AuthTokenType, BaseResponse, saveTokens, getAuthToken } from "@common"

export const useSocketClient = () => {
    const [ connected, setConnected ] = useState(true)

    const socketRef = useRef<Socket|null>(null)
    const hasMountedRef = useRef(false)
    const callbackRef = useRef<WsCallback|null>(null)

    useEffect(() => {
        if (!hasMountedRef.current) {
            socketRef.current = io(ENDPOINT_WEBSOCKET, {
                extraHeaders: {
                    "Client-Id": getClientId() ?? "",
                },
                auth: {
                    token: getAuthToken(),
                    authTokenType: AuthTokenType.Access
                },
            })
        } else {
            if (connected) return
            socketRef.current?.connect()
        }

        const updateSocket = (authTokenType: AuthTokenType = AuthTokenType.Access) => {
            (socketRef.current as Socket).auth = {
                token: getAuthToken(authTokenType),
                authTokenType: authTokenType
            }
            socketRef.current?.disconnect()
            setConnected(false)
        }

        socketRef.current?.onAny((_, { tokens }: BaseResponse<unknown>) => {
            if (tokens) {
                saveTokens(tokens)
                updateSocket()
            }
        })

        socketRef.current?.on("connect", () => {
        })

        socketRef.current?.on("exception", ({ callback, status }: WsError) => {
            if (status === WsErrorStatus.Unauthorized && (socketRef.current?.auth as WsAuth).authTokenType === AuthTokenType.Access) {
                console.log(callback, status)
                callbackRef.current = callback
                updateSocket(AuthTokenType.Refresh)
            }
        })

        socketRef.current?.on("disconnect", (reason, details) => {
            console.log(reason)
            console.log(details)
        })

        socketRef.current?.on("initialize", onInitialize)

        if (callbackRef.current !== null) {
            const { event, data } = callbackRef.current
            console.log(event, data)
            socketRef.current?.emit(event, data)
            callbackRef.current = null
        }

        if (!hasMountedRef.current) {
            socketRef.current?.emit("initialize")
            hasMountedRef.current = true
        } else {
            setConnected(true)
        }

    }, [connected])

    return socketRef.current
}

export interface WsCallback {
    event: string,
    data: unknown
}

export interface WsError {
    callback: WsCallback,
    status: WsErrorStatus
}

export interface WsAuth {
    token: string,
    authTokenType: AuthTokenType
}

export enum WsErrorStatus {
    Unauthorized = 0
}