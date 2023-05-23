// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Album} from "../../../utils/interfaces/spotifyAuthType.ts";

export const spotifyApiSlice = createApi({
    reducerPath: 'spotifyApiSlice',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.spotify.com/v1/'}),
    endpoints: (builder) => ({
        getRecommendedAlbums: builder.query<Partial<Album>, string>({
            query: access_token => ({
                url: 'me/top/tracks',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
        })
    })
})

export const { useGetRecommendedAlbumsQuery } = spotifyApiSlice