import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

import AuthContext from 'shared/contexts/auth'

const Home = () => {
  const [Auth] = useContext(AuthContext)

  return (
    <div>
      <h1>Home</h1>
      {Auth.isAuthenticated() ? (
        <Link className="btn btn-outline-secondary" to="/profile">
          View Profile
        </Link>
      ) : (
        <Button outline color="secondary" onClick={() => Auth.login()}>
          Log in
        </Button>
      )}
    </div>
  )
}

export default Home
