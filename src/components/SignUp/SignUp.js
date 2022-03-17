import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserPool from '../SignIn/UserPool';
import axios from 'axios';

import "./SignUp.css";

const registerUrl = "https://lu43u7gbml.execute-api.sa-east-1.amazonaws.com/prod/register";



const SignUp = () => {

    let navigate = useNavigate();
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault();

        if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
            setMessage('Todos os campos devem ser preenchidos.')
            return;
        }
        setMessage(null)


        UserPool.signUp(username, password, [], null, (err, data) => {
            if (err) {
                console.error(err)
            }
            console.log(data)
        })


        const requestConfig = {
            headers: {
                'x-api-key': 'XJ7L4iWT9i6DjS2CDQpbr1Kd3ZpQsWW81xUGVrcX'
            }
        }
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }
        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage("Sucesso no cadastro.")
            navigate("/email")
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message)
            } else {
                setMessage("Perdão... o backend está com problemas!! Tente novamente mais tarde.")
            }
        })

    }

    return (
        <div>
            <div className="signupFrm">
                <form onSubmit={onSubmit} className="form">
                    <h1 className="title">Cadastro</h1>

                    <div className="inputContainer">
                        <input
                            type="text"
                            className="input"
                            placeholder="a"
                            name='name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label className="label" >
                            Name
                        </label>
                    </div>

                    <div className="inputContainer">
                        <input
                            type="text"
                            className="input"
                            placeholder="a"
                            name='username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <label className="label" >
                            Username
                        </label>
                    </div>

                    <div className="inputContainer">
                        <input
                            type="email"
                            className="input"
                            placeholder="a"
                            name='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}

                        />
                        <label className="label" >
                            Email
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


                    <button className='submitBtn' type='submit'>
                        Sign Up
                    </button>
                    <br />
                    {message && <span className="message">{message}</span>}
                </form>
            </div>
        </div >
    )
}

export default SignUp