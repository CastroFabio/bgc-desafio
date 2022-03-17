import React, { useState, useContext, Fragment } from 'react'
import { AccountContext } from '../Account/Account';
import { setUserSession } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./SignIn.css";

const loginAPIUrl = "https://lu43u7gbml.execute-api.sa-east-1.amazonaws.com/prod/login";



const SignIn = (props) => {

    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const { authenticate } = useContext(AccountContext)

    const onSubmit = (event) => {
        event.preventDefault();



        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Todos os campos devem ser preenchidos.')
            return;
        }
        setErrorMessage(null)

        authenticate(username, password)
            .then(data => {
                console.log("logado!", data)
                navigate("/email")
                window.location.reload(false);
            })
            .catch(err => {
                console.error("Falhou em logar", err)
            })

        const requestConfig = {
            headers: {
                'x-api-key': 'XJ7L4iWT9i6DjS2CDQpbr1Kd3ZpQsWW81xUGVrcX'
            }
        }
        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginAPIUrl, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token)


        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Perdão... o backend está com problemas!! Tente novamente mais tarde.")
            }
        })
    }

    return (
        <Fragment>
            <div className="signupFrm">
                <form onSubmit={onSubmit} className="form">
                    <h1 className="title">Login</h1>


                    <div className="inputContainer">
                        <input
                            type="text"
                            className="input"
                            placeholder="a"
                            name='username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <label className="label">
                            Username
                        </label>
                    </div>

                    <div className="inputContainer">
                        <input
                            className="input"
                            placeholder="a"
                            type="password"
                            name='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <label className="label" >
                            Password
                        </label>
                    </div>

                    <button className='submitBtn' type='submit' >
                        Login
                    </button>
                    <br />
                    {errorMessage && <p className="">{errorMessage}</p>}
                </form>

            </div>
        </Fragment >
    )

}

export default SignIn