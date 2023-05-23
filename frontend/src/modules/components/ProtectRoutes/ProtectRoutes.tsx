import React from 'react'

interface ProtectedProp {
    children: React.ReactNode
}

const ProtectRoutes = ({children}: ProtectedProp) => {

    return <>{children}</>

}

export default ProtectRoutes