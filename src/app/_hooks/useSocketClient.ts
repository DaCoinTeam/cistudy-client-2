import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { ENDPOINT_WEBSOCKET } from "@config"
import { onInitialize } from "@services"
import { getClientId, AuthTokenType, BaseResponse, saveTokens, getAuthToken } from "@common"

export const useSocketClient = () => {
    const [ callback, setCallback ] = useState<WsCallback | null>(null)
    const [ connected, setConnected ] = useState(true)

    const socketRef = useRef<Socket|null>(null)
    const hasMountedRef = useRef(false)

    const initializeSocket = () => {
        const socket = io(ENDPOINT_WEBSOCKET, {
            extraHeaders: {
                "Client-Id": getClientId() ?? "",
            },
            auth: {
                token: getAuthToken(),
                authTokenType: AuthTokenType.Access
            },
        })
        if (socket.disconnected) {
            socket.connect()
        }
        return socket
    }

    useEffect(() => {
        const _socket = initializeSocket()
        socketRef.current = _socket

        if (callback !== null) {
            setCallback(null)
            const { event, data } = callback
            _socket.emit(event, data)
        }

        const updateSocket = (authTokenType: AuthTokenType = AuthTokenType.Access) => {
            _socket.auth = {
                token: getAuthToken(authTokenType),
                authTokenType: authTokenType
            }
            _socket.disconnect()
            setConnected(false)
        }

        _socket.onAny((_, { tokens }: BaseResponse<unknown>) => {
            if (tokens) {
                saveTokens(tokens)
                updateSocket()
            }
        })

        _socket.on("connect", () => {
        })

        _socket.on("exception", ({ callback, status }: WsError) => {
            if (status === WsErrorStatus.Unauthorized && (_socket.auth as WsAuth).authTokenType === AuthTokenType.Access) {
                setCallback(callback)
                updateSocket(AuthTokenType.Refresh)
            }
        })

        _socket.on("disconnect", (reason, details) => {
            console.log(reason)
            console.log(details)
        })

        _socket.on("initialize", onInitialize)

        if (!hasMountedRef.current) {
            _socket.emit("initialize")
            hasMountedRef.current = true
        } 

        return (() => {
            _socket.disconnect()
            socketRef.current == null
        })
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