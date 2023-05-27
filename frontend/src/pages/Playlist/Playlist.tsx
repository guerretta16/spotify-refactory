import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useGetRecommendedAlbumsQuery, useLazyGetSearchedAlbumsQuery} from "../../app/features/api/spotifyApiSlice.ts";
import {useLazyGetAccessTokenQuery} from "../../app/features/api/authSlice.ts";
import {AlbumList, Spinner, TopInput} from "../../modules/components";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {setTokens} from "../../app/features/slices/tokenSlice.ts";
import {useAddAlbumToFavoritesMutation, useGetFavoriteAlbumsIDQuery} from "../../app/features/api/LocalApiSlice.ts";
import {IAlbum, IAlbumId} from "../../utils/interfaces/spotifyAuthType.ts";

const Playlist = () => {

    const dispatch = useAppDispatch();
    const {user_token} = useAppSelector(state => state.tokenSlice);

    //trigger to refresh access_token
    const [
        getAccessTokenFromRefresh
    ] = useLazyGetAccessTokenQuery();

    //get the data for access_token and refresh_token
    const {
        access_token,
        refresh_token
    } = useAppSelector(state => state.tokenSlice)

    //get the data of the recommended tracks
    const {
        data: albums,
        isLoading,
        isError,
        error
    } = useGetRecommendedAlbumsQuery(access_token!)

    //hook for Add to Favorites
    const [
        addToFavorite,
        {
            isLoading: loadingPost,
        }
    ] = useAddAlbumToFavoritesMutation()

    //hook for search albums
    const [
        searchAlbums,
        {
            data: searchedAlbumList,
            isError: searchError,
        }
    ] = useLazyGetSearchedAlbumsQuery()

    const {
        data: albumIds
    } = useGetFavoriteAlbumsIDQuery(user_token!)

    const onAddFavorites = async (item: IAlbum) => {
        await addToFavorite([item, user_token])
                .unwrap()
                .then(payload => {
                    notify(payload.descriptionMessage)
                })
    }

    const onHandleChange = async (query: string) => {
        await searchAlbums([access_token, query]).unwrap()
                .then()
                .catch(err => {
                    console.log(err)
                })
    }

    const notify = (message: string) => toast.success(message, {position: "top-right"})

    const itemsToList = () => {
        const uniqueArray: IAlbum[] = [];
        if (searchedAlbumList && albumIds) {
            for (const album of searchedAlbumList) {
                const albumId = album.id;
                const idFound = albumIds.some((idItem: IAlbumId) => idItem.id === albumId)
                !idFound && uniqueArray.push(album)
            }
        } else if (albums && albumIds) {
            for (const album of albums) {
                const albumId = album.id;
                const idFound = albumIds.some((idItem: IAlbumId) => idItem.id === albumId)
                !idFound && uniqueArray.push(album)
            }
        }
        return uniqueArray
    }

    useEffect(() => {
        if (isError || searchError) {
            getAccessTokenFromRefresh([{refresh_token}, "refresh_token"])
                    .unwrap()
                    .then(payload => {
                        dispatch(setTokens({access_token: payload.access_token}))
                    })
            console.log(error)
        }
    }, [isError, refresh_token, searchError])

    if (isLoading || loadingPost) {
        return <Spinner/>
    }

    return (
            <div className="p-2">
                <h1 className="mx-auto my-10 text-3xl text-center font-bold w-fit p-2">
                    Recommended Albums For You... 🎧
                </h1>
                <TopInput onHandleChange={onHandleChange}/>
                {
                    searchedAlbumList
                            ?
                            <AlbumList
                                    items={itemsToList()}
                                    onAddFavorites={onAddFavorites}
                            /> :
                            albums ?
                                    <AlbumList
                                            items={itemsToList()}
                                            onAddFavorites={onAddFavorites}
                                    /> : null

                }
                <ToastContainer/>
            </div>
    );
};

export default Playlist;
