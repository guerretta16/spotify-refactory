import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import {Tokens} from "../../../utils/interfaces/spotifyAuthType.ts";

const initialState : Tokens = {
    access_token: "",
    refresh_token: "",
    user_token: ""
}

export const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Partial<Tokens>>) => {
            state.access_token = action.payload.access_token!
            if(action.payload.refresh_token){
                state.refresh_token = action.payload.refresh_token
            }
            if(action.payload.user_token){
                state.user_token = action.payload.user_token
            }
        },
        removeTokens: state => {
           state.user_token = ""
           state.refresh_token = ""
           state.access_token = ""
        }
    },
})

export const { setTokens, removeTokens } = tokenSlice.actions
export default tokenSlice.reducer