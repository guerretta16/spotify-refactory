import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom"
import {LoginButton, Spinner} from "../../modules/components"
import Lottie from "lottie-react";
import musicAnimation from "../../assets/lottie/music.json"
import {useGetAccessTokenQuery} from "../../app/features/api/authSlice.ts";
import {useLazyLoginSpotifyUserQuery} from "../../app/features/api/LocalApiSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {setTokens} from "../../app/features/slices/tokenSlice.ts";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const {
        data: responseToken,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAccessTokenQuery([{code: code!}, "authorization_code"], {skip: !code});

    const [
        getUserToken,
        {
            data: userResponse,
            isSuccess: successLocal,
            isLoading: loadingLocal
        }
    ] = useLazyLoginSpotifyUserQuery()

    const style = {
        height: 400,
    };

    useEffect(() => {
        if (isSuccess) {
            getUserToken(responseToken.access_token)
        }
    }, [isSuccess, responseToken])

    useEffect(() => {
        if (successLocal) {
            dispatch(setTokens({
                access_token: responseToken!.access_token,
                refresh_token: responseToken!.refresh_token,
                user_token: userResponse!.token
            }))
            navigate("playlist", {
                replace: true
            })
        }
    }, [successLocal])

    if (isLoading || loadingLocal) {
        return <Spinner/>
    } else if (isError) {
        return <div>{error.toString()}</div>
    }

    return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-10/12 flex justify-center items-center gap-10 flex-wrap md:w-10/12 md:gap-20 ">
                    <Lottie animationData={musicAnimation} loop style={style}/>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold border-b-2 w-fit mx-auto mb-10 py-2">
                            SPOTIFY API ESE+
                        </h1>
                        <LoginButton/>
                    </div>
                </div>
            </div>
    );
};

export default Login;
