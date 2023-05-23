import {Navigate, useSearchParams} from "react-router-dom"
import {LoginButton, Spinner} from "../../modules/components"
import Lottie from "lottie-react";
import musicAnimation from "../../assets/lottie/music.json"
import {useGetAccessTokenQuery} from "../../app/features/api/authSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {setTokens} from "../../app/features/slices/tokenSlice.ts";

const Login = () => {

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

    const style = {
        height: 400,
    };

    if (isLoading) {
        return <Spinner/>
    } else if (isError) {
        return <div>{error.toString()}</div>
    } else if (isSuccess) {
        dispatch(setTokens(responseToken))
        return <Navigate to="playlist"/>
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
