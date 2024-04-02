import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { ENDPOINT_WEBSOCKET } from "@config"
import { AuthTokenType, BaseResponse, getAuthToken, getClientId, saveTokens } from "@common"

export const useSocketClient = () => {
    const [disconnected, setDisconnected] = useState(false)

    const socketRef = useRef<Socket | null>(null)
    const callbackRef = useRef<WsCallback | null>(null)

    const update = (authTokenType: AuthTokenType = AuthTokenType.Access) => {
        if (socketRef.current === null) return
        socketRef.current.auth = {
            token: getAuthToken(authTokenType),
            authTokenType: authTokenType
        }
        socketRef.current.disconnect()
        setDisconnected(true)
    }

    useEffect(() => {
        socketRef.current = io(ENDPOINT_WEBSOCKET, {
            extraHeaders: {
                "Client-Id": getClientId() ?? ""
            },
            auth: {
                token: getAuthToken(),
                authTokenType: AuthTokenType.Access
            }
        })

        socketRef.current.on("connect", () => {
            console.log("connected")
        })

        socketRef.current.onAny((_, response: BaseResponse<unknown>) => {
            const { tokens } = { ...response }
            if (tokens) {
                saveTokens(tokens)
                update()
            }
        })

        socketRef.current.on("exception", ({ callback, status }: WsError) => {
            if (status === WsErrorStatus.Unauthorized && (socketRef.current?.auth as WsAuth).authTokenType === AuthTokenType.Access) {
                callbackRef.current = callback
                update(AuthTokenType.Refresh)
            }
        })

        socketRef.current.on("disconnect", (
            reason, 
            details
        ) => {
            console.log(reason)
            console.log(details)
        })

        socketRef.current.emit("initialize")

        return (() => { socketRef.current?.removeAllListeners() })
    }, [])

    useEffect(() => {
        if (!disconnected) return

        socketRef.current?.connect()
        if (callbackRef.current !== null) {
            const { data, event } = callbackRef.current
            socketRef.current?.emit(event, data)
            callbackRef.current = null
        }
        setDisconnected(false)

    }, [disconnected])

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