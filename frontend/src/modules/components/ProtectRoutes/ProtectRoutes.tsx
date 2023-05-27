import React from 'react'
import {useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";

interface ProtectedProp {
    children: React.ReactNode
}

const ProtectRoutes = ({children}: ProtectedProp) => {

    const {access_token} = useAppSelector(state => state.tokenSlice)
    const navigate = useNavigate()

    if (access_token === "") {
        navigate("/", {replace: true})
    }

    return <>{children}</>

}

export default ProtectRoutes