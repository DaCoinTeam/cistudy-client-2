import { createSlice } from "@reduxjs/toolkit"
import { UserEntity } from "@services"

export type AuthSlice = {
  user: UserEntity | null;
}

const initialState: AuthSlice = {
    user: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: { payload: UserEntity | null }) {
            state.user = action.payload
        },
    },
})

export const { setUser } = authSlice.actions
export const authReducer = authSlice.reducer
