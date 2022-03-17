import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { getToken } from '../../service/AuthService'

import './Navigation.css'

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <div className="nav__links-container">
                    <Link className="nav__link" to='/SignUp'>
                        Sign Up
                    </Link>
                    <Link className="nav__link" to='/SignIn'>
                        Sign In
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;