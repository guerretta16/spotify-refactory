// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IAlbum, IAlbumId, ResponseMessage, UserToken} from "../../../utils/interfaces/spotifyAuthType.ts";

export const localApiSlice = createApi({
    reducerPath: 'localApiSlice',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/'}),
    tagTypes: ['Album'],
    endpoints: (builder) => ({
        loginSpotifyUser: builder.query<UserToken, string>({
            query: access_token => ({
                url: 'register',
                method: 'GET',
                headers: {
                    'Spotify-Token': access_token
                },
            }),
        }),
        getFavoriteAlbums: builder.query<IAlbum[] | [], string>({
            query: (user_token) => ({
                url: 'favorite-album',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user_token}`
                }
            }),
            transformResponse(response: ResponseMessage<IAlbum>) {

                if (response) {
                    return response.data!.map((item: IAlbum) => {
                        return {
                            ...item,
                            external_urls: JSON.parse(String(item.external_urls)),
                            images: JSON.parse(String(item.images)),
                            artists: JSON.parse(String(item.artists))
                        }
                    })
                } else {
                    return [];
                }
            },
            providesTags: ['Album']
        }),
        getFavoriteAlbumsID: builder.query<IAlbumId[] | [], string>({
            query: (user_token) => ({
                url: 'favorite-album-ids',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user_token}`
                }
            }),
            transformResponse(response: ResponseMessage<IAlbumId>) {
                if(response){
                    return response.data as IAlbumId[]
                }
                return [];
            },
            providesTags: ['Album']
        }),
        getAlbumById: builder.query<IAlbum, [string, string]>({
            query: ([id_album, user_token]) => ({
                url: `album/${id_album}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user_token}`
                }
            }),
            transformResponse(response: ResponseMessage<IAlbum>) {

                const data = response.data![0] as IAlbum;

                return {
                    ...data,
                    external_urls: JSON.parse(String(data.external_urls)),
                    images: JSON.parse(String(data.images)),
                    artists: JSON.parse(String(data.artists)),
                }
            },
            providesTags: ['Album']
        }),
        addAlbumToFavorites: builder.mutation<ResponseMessage<null>, [IAlbum, string]>({
            query: ([album, user_token]) => ({
                url: 'favorite-album',
                method: 'POST',
                body: album,
                headers: {
                    'Authorization': `Bearer ${user_token}`,
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ['Album'],
        }),
        deleteAlbumFromFavorites: builder.mutation<ResponseMessage<null>, [string, string]>({
            query: ([id_album, user_token]) => ({
                url: `favorite-album/${id_album}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user_token}`
                }
            }),
            invalidatesTags: ['Album']
        })
    })
})

export const {
    useLazyLoginSpotifyUserQuery,
    useAddAlbumToFavoritesMutation,
    useGetFavoriteAlbumsIDQuery,
    useGetFavoriteAlbumsQuery,
    useDeleteAlbumFromFavoritesMutation,
    useLazyGetAlbumByIdQuery
} = localApiSlice