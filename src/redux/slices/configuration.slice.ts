import { createSlice } from "@reduxjs/toolkit"

export type ConfigurationSlice = {
  darkMode: boolean;
};

const initialState: ConfigurationSlice = {
    darkMode: false,
}

export const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        setDarkMode(state, action : { payload: boolean }) {
            const value = action.payload
            state.darkMode = value
        },
    },
})

export const { setDarkMode } = configurationSlice.actions
export const configurationReducer = configurationSlice.reducer
