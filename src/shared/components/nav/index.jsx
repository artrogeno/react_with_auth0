import React, { useContext } from 'react'
import { Nav as NavB, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import AuthContext from 'shared/contexts/auth'

const Nav = () => {
  const [Auth] = useContext(AuthContext)
  return (
    <NavB navbar className="ml-auto">
      <NavItem>
        <NavLink className="nav-link" exact to="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to="/public">
          Public
        </NavLink>
      </NavItem>
      {Auth.isAuthenticated() && (
        <NavItem>
          <NavLink className="nav-link" to="/private">
            Private
          </NavLink>
        </NavItem>
      )}
      {Auth.isAuthenticated() && Auth.useHasScope(['read:courses']) && (
        <NavItem>
          <NavLink className="nav-link" to="/courses">
            Courses
          </NavLink>
        </NavItem>
      )}
    </NavB>
  )
}

export default Nav
