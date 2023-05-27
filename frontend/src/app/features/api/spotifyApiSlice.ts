// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAlbum, IApi, IItem, ISearchedAlbum} from "../../../utils/interfaces/spotifyAuthType.ts";

export const spotifyApiSlice = createApi({
    reducerPath: 'spotifyApiSlice',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.spotify.com/v1/'}),
    endpoints: (builder) => ({
        getRecommendedAlbums: builder.query<IAlbum[], string>({
            query: access_token => ({
                url: 'me/top/tracks',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                params: {
                    'limit': 40
                }
            }),
            transformResponse(
                response: IApi
            ) {
                return response.items.map((item: IItem) => {
                    return item.album
                })
            }
        }),
        getSearchedAlbums: builder.query<IAlbum[], [string, string]>({
            query: ([access_token, query]) => ({
                url: !query ? 'me/top/tracks' : `search`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                params: !query ? {
                        'limit': 40
                    } :
                    {
                        'type': 'album',
                        'q': query,
                        'limit': 40
                    }
            }),
            transformResponse(
                response: ISearchedAlbum | IApi,
            ) {

                if ('items' in response) {
                    return response.items.map((item: IItem) => {
                        return item.album
                    }) as IAlbum[]
                }

                if ('items' in response.albums) {
                    return response.albums.items.map((item: IAlbum) => {
                        return item
                    }) as IAlbum[]
                }

                return []
            }
        }),

    })
})

export const {
    useGetRecommendedAlbumsQuery,
    useLazyGetSearchedAlbumsQuery
} = spotifyApiSlice