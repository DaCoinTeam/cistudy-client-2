import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { ENDPOINT_WEBSOCKET } from "@config"
import { AuthTokenType, BaseResponse, getAuthToken, getClientId, saveTokens } from "@common"

export const useSocketClient = () => {
    const [disconnected, setDisconnected] = useState(false)
    const [socket, setSocket] = useState<Socket | null>(null)

    const callbackRef = useRef<WsCallback | null>(null)

    const update = (authTokenType: AuthTokenType = AuthTokenType.Access) => {
        if (socket === null) return
        socket.auth = {
            token: getAuthToken(authTokenType),
            authTokenType: authTokenType
        }
        socket.disconnect()
        setSocket(socket)
        setDisconnected(true)
    }

    useEffect(() => {
        const socket = io(ENDPOINT_WEBSOCKET, {
            extraHeaders: {
                "Client-Id": getClientId() ?? ""
            },
            auth: {
                token: getAuthToken(),
                authTokenType: AuthTokenType.Access
            }
        })

        socket.on("connect", () => {
            console.log("connected")
        })

        socket.onAny((_, response: BaseResponse<unknown>) => {
            console.log("called")
            const { tokens } = { ...response }
            if (tokens) {
                saveTokens(tokens)
                update()
            }
        })

        socket.on("exception", ({ callback, status }: WsError) => {
            if (status === WsErrorStatus.Unauthorized && (socket?.auth as WsAuth).authTokenType === AuthTokenType.Access) {
                callbackRef.current = callback
                update(AuthTokenType.Refresh)
            }
        })

        socket.on("disconnect", (
            reason, 
            details
        ) => {
            console.log(reason)
            console.log(details)
        })

        socket.emit("initialize")

        setSocket(socket)

        return (() => { socket?.removeAllListeners() })
    }, [])

    useEffect(() => {
        if (!disconnected) return

        socket?.connect()
        if (callbackRef.current !== null) {
            const { data, event } = callbackRef.current
            socket?.emit(event, data)
            callbackRef.current = null
        }
        setDisconnected(false)
        setSocket(socket)
    }, [disconnected])

    return socket
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