import React, { useState, useContext } from 'react'
import { AccountContext } from './Account'


export default function ChangePassword() {

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const { getSession } = useContext(AccountContext)

    const onSubmit = (event) => {
        event.preventDefault()
        getSession()
            .then(({ user }) => {
                user.changePassword(password, newPassword, (err, result) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(result)
                    }
                })
            })

    }

    return (
        <div className="signupFrm">
            <form onSubmit={onSubmit} className="form">
                <h1 className="title">Trocando de senha</h1>



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
                        Senha
                    </label>
                </div>

                <div className="inputContainer">
                    <input
                        className="input"
                        placeholder="a"
                        type="password"
                        name='newPassword'
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                    <label className="label" >
                        Nova Senha
                    </label>
                </div>


                <button className='submitBtn' type='submit' to='./email'>
                    Atualizar senha
                </button>
                <br />
            </form>
        </div>
    )
}
