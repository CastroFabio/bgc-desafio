import React, { useEffect, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom';
import SignIn from '../../components/SignIn/SignIn';
import { AccountContext } from '../../components/Account/Account';

const ProtectedRoutes = () => {

    const { getSession } = useContext(AccountContext)

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        getSession().then(() => {
            setLoggedIn(true)
        })
    }, [])

    return (
        <div>
            {loggedIn ? <Outlet /> : <SignIn />}
        </div>
    )
}

export default ProtectedRoutes