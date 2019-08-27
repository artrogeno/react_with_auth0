import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Container, Spinner } from 'reactstrap'

import Header from 'shared/components/header'
import Home from 'app/pages/home'
import Callback from 'app/pages/callback'
import Profile from 'app/pages/profile'
import Public from 'app/pages/public'
import Private from 'app/pages/private'
import Courses from 'app/pages/courses'
import Auth from 'shared/services/auth'
import SecureRoute from 'shared/components/secure_route'
import AuthContext from 'shared/contexts/auth'

const App = props => {
  const auth = useState(new Auth(props.history))
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false)

  const initialize = () => {
    const [Auth] = auth
    Auth.renewToken(() => setTokenRenewalComplete(true))
  }

  useEffect(() => {
    initialize()
  }, [])

  if (!tokenRenewalComplete) {
    return (
      <div className="loading d-flex align-items-center justify-content-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
      </div>
    )
  }

  return (
    <AuthContext.Provider value={auth}>
      <Header {...props} />
      <Container fluid className="main-app">
        <Route path="/" exact component={Home} />
        <Route path="/callback" exact render={() => <Callback {...props} />} />
        <Route path="/public" exact component={Public} />
        <SecureRoute path="/profile" component={Profile} />
        <SecureRoute path="/private" component={Private} />
        <SecureRoute path="/courses" component={Courses} scopes={['read:courses']} />
      </Container>
    </AuthContext.Provider>
  )
}

export default App
