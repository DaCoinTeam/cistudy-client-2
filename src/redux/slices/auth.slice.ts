import { createSlice } from "@reduxjs/toolkit"
import { UserEntity } from "@common"

export type AuthSlice = {
  profile: UserEntity | null;
};

const initialState: AuthSlice = {
    profile: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setProfile(state, action: { payload: UserEntity | null }) {
            state.profile = action.payload
        },
    },
})

export const { setProfile } = authSlice.actions
export const authReducer = authSlice.reducer
