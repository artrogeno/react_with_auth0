import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthContext from 'shared/contexts/auth'

const SecureRoute = ({ component: Component, scopes, ...rest }) => {
  const [Auth] = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (!Auth.isAuthenticated()) return Auth.login()
        if (scopes.length > 0 && !Auth.useHasScope(['read:courses'])) {
          return <h1>Unauthorized - You need the following scope(s) to view this page: {scopes.join(',')}.</h1>
        }
        return <Component {...props} />
      }}
    />
  )
}

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.array
}

SecureRoute.defaultProps = {
  scopes: []
}

export default SecureRoute
