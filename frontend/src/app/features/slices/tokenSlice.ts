import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import {AccessTokenResponse} from "../../../utils/interfaces/spotifyAuthType.ts";

const initialState : Partial<AccessTokenResponse> = {
    access_token: "",
    refresh_token: ""
}

export const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Partial<AccessTokenResponse>>) => {
            state.access_token = action.payload.access_token
            if(action.payload.refresh_token){
                state.refresh_token = action.payload.refresh_token
            }
        },
    },
})

export const { setTokens } = tokenSlice.actions
export default tokenSlice.reducer