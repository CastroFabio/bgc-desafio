import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './routes/Navigation/Navigation';
import EmailForm from './components/EmailForm/EmailForm';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import { getUser, getToken, setUserSession, resetUserSession } from './service/AuthService';
import axios from 'axios';
import { Account } from './components/Account/Account';
import Status from './components/Account/Status';


const verifyTokenAPIURL = "https://lu43u7gbml.execute-api.sa-east-1.amazonaws.com/prod/verify"

function App() {

  const [isAuthenticating, setAuthenticating] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'XJ7L4iWT9i6DjS2CDQpbr1Kd3ZpQsWW81xUGVrcX'
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token)
      setAuthenticating(false)
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false)
    })
  }, [])

  const token = getToken()
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <Account>
        <Status />
        <Routes>
          <Route path='/' element={<Navigation />} >
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/Email' element={<EmailForm />} />
          </Route>
        </Routes>
      </Account>

      {/* <Logo /> */}

      {/* <EmailHistory /> */}

    </div>
  );
}

export default App;
