import React, { useState } from 'react'
import UserPool from '../SignIn/UserPool'

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [middleName, setMiddleName] = useState("")

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err)
            }
            console.log(data)
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                <label htmlFor="name">name</label>
                <input name='name' value={name} onChange={(event) => setName(event.target.value)} />
                <label htmlFor="middleName">Middle Name</label>
                <input name='middleName' value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
                <label htmlFor="password">Password</label>
                <input name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp