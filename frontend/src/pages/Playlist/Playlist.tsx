import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAppSelector} from "../../app/hooks.ts";
import {useGetRecommendedAlbumsQuery} from "../../app/features/api/spotifyApiSlice.ts";
import {Spinner} from "../../modules/components";


const Playlist = () => {

    //get the data for access_token and refresh_token
    const { access_token, refresh_token} = useAppSelector(state => state.tokenSlice)

    //get the data of the recommended tracks
    const {
        data: albums,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetRecommendedAlbumsQuery(access_token!)

    if(isLoading){
        return <Spinner/>
    }
    else if(isError){
        ///
    }

    return (
            <div className="p-2">
                <h1 className="mx-auto my-10 text-3xl text-center font-bold w-fit p-2">
                    Recommended Tracks For You... 🎧
                </h1>
                {
                    isSuccess && JSON.stringify(albums)
                }
                <ToastContainer/>
            </div>
    );
};

export default Playlist;
