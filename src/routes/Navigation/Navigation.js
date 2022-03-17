import React, { useContext, useState, useEffect, Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { getToken } from '../../service/AuthService'
import { AccountContext } from '../../components/Account/Account'

import './Navigation.css'

const Navigation = () => {

    const [status, setStatus] = useState(false)

    const { getSession, logout } = useContext(AccountContext)

    useEffect(() => {
        getSession()
            .then(session => {
                console.log("Session: ", session)
                setStatus(true)
            })
    }, [])


    return (
        <Fragment>
            <div className='navigation'>
                <div className="nav__links-container">

                    {status
                        ?
                        <Fragment>
                            <Link className="nav__link" to='/Settings'>
                                Configurações
                            </Link>
                            <Link className="nav__link" to='/Email'>
                                Email
                            </Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Link className="nav__link" to='/SignUp'>
                                Sign Up
                            </Link>
                            <Link className="nav__link" to='/SignIn'>
                                Sign In
                            </Link>
                            <Link className="nav__link" to='/Settings'>
                                Configurações
                            </Link>
                            <Link className="nav__link" to='/Email'>
                                Email
                            </Link>
                        </Fragment>
                    }
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation;