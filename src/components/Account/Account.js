import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../SignIn/UserPool';
import { useNavigate } from 'react-router-dom';

const AccountContext = createContext();

const Account = (props) => {


    let navigate = useNavigate()
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser()
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject()
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    const results = {}

                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute
                                        results[Name] = Value
                                    }
                                    resolve(results)
                                }
                            })
                        })
                        resolve({ user, ...session, ...attributes })
                    }
                })
            } else {
                reject()
            }
        })
    }

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool
            })

            const authDetails = new AuthenticationDetails({
                Username,
                Password
            })

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSucess: ", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data)
                    resolve(data)
                }
            })
        })
    }

    const logout = () => {
        const user = Pool.getCurrentUser()
        if (user) {
            user.signOut()
            navigate('/')
            window.location.reload(false);
        }
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export { Account, AccountContext }