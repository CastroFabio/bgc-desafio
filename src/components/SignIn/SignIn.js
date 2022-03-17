import React, { useState } from 'react'
import { setUserSession } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import UserPool from '../SignIn/UserPool'
import axios from 'axios';

import "./SignIn.scss";

const loginAPIUrl = "https://lu43u7gbml.execute-api.sa-east-1.amazonaws.com/prod/login";



const SignIn = (props) => {

    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Todos os campos devem ser preenchidos.')
            return;
        }
        setErrorMessage(null)

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
            setErrorMessage('entrou')

            navigate("/email")
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Perdão... o backend está com problemas!! Tente novamente mais tarde.")
            }
        })


        /* UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err)
            }
            console.log(data)
        }) */
    }

    return (
        <div>
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
                        <label
                            for=""
                            className="label"
                        >
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
                        <label
                            for=""
                            className="label"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        className='submitBtn'
                        type='submit'
                    >
                        Login
                    </button>
                    {errorMessage && <p className="">{errorMessage}</p>}
                </form>

            </div>
        </div >
    )

}

export default SignIn