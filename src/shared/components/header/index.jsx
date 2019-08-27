import React, { useContext } from 'react'
import { Navbar, NavbarBrand, Button } from 'reactstrap'

import AuthContext from 'shared/contexts/auth'
import Nav from '../nav'
import IconAuth0 from 'assets/img/icon/auth0-logo.png'

const Header = () => {
  const [Auth] = useContext(AuthContext)

  return (
    <Navbar color="white" dark expand="md" className="shadow-sm fixed-top nav-bar-main">
      <NavbarBrand tag="img" src={IconAuth0} className="img-logo" />
      <Nav />
      <Button size="sm" outline color="light" onClick={() => (Auth.isAuthenticated() ? Auth.logout() : Auth.login())}>
        {Auth.isAuthenticated() ? 'Log out' : 'Log in'}
      </Button>
    </Navbar>
  )
}

export default Header
