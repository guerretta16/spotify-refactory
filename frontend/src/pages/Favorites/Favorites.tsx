import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    useDeleteAlbumFromFavoritesMutation,
    useGetFavoriteAlbumsQuery,
    useLazyGetAlbumByIdQuery
} from "../../app/features/api/LocalApiSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {AlbumList, Modal, Spinner} from "../../modules/components";

const Favorites = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user_token} = useAppSelector(state => state.tokenSlice)

    /*
    *  Get the favorite albums
    * */
    const {
        data: favoriteAlbums,
        isLoading,
    } = useGetFavoriteAlbumsQuery(user_token)

    /*
    *  Delete favorite Album
    * */
    const [
        deleteAlbum,
        {
            isLoading: fetchingDelete
        }
    ] = useDeleteAlbumFromFavoritesMutation()

    /*
    *  Get album by ID
    * */
    const [
        getAlbumById,
        {
            data: albumDetail,
            isFetching: fetchingDetails
        }
    ] = useLazyGetAlbumByIdQuery()

    const notify = (message: string) => toast.success(message, {position: "bottom-right"});

    const onHandleOpenModal = async (id = "") => {
        if (isOpen) {
            setIsOpen(!isOpen)
        } else {
            await getAlbumById([id, user_token])
            setIsOpen(!isOpen)
        }
    }

    const onHandleDeleteAlbum = async (id: string) => {
        await deleteAlbum([id, user_token])
                .unwrap()
                .then(payload => {
                    notify(payload.descriptionMessage)
                })
    }


    if (isLoading || fetchingDetails || fetchingDelete) {
        return <Spinner/>
    }

    return (
            <>
                {isOpen && <Modal detail={albumDetail!} handleModal={onHandleOpenModal}/>}
                <div className="p-2">
                    <h1 className="mx-auto my-10 text-3xl text-center font-bold w-fit p-2">
                        My Favorite Albums 🎧
                    </h1>
                    {
                            favoriteAlbums &&
                            <AlbumList
                                    items={favoriteAlbums}
                                    handleModal={onHandleOpenModal}
                                    onDelete={onHandleDeleteAlbum}
                            />
                    }
                    <ToastContainer/>
                </div>
            </>
    );
};

export default Favorites;
