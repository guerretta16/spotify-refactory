// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AccessTokenResponse, RequiredToken} from "../../../utils/interfaces/spotifyAuthType.ts";
import {getTokenParams} from "../../../utils/params/paramsAccessToken.ts";

export const authSlice = createApi({
    reducerPath: 'authSlice',
    baseQuery: fetchBaseQuery({baseUrl: 'https://accounts.spotify.com/api/'}),
    endpoints: (builder) => ({
        getAccessToken: builder.query<AccessTokenResponse, [Partial<RequiredToken>, string]>({
            query: ([code, tokenType]) => ({
                url: "token",
                method: "POST",
                params: getTokenParams(code, tokenType),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }),
            keepUnusedDataFor: 3700
        })
    }),
})

export const {useGetAccessTokenQuery, useLazyGetAccessTokenQuery} = authSlice