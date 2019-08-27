import React, { useEffect, useContext } from 'react'

import AuthContext from 'shared/contexts/auth'

const Callback = props => {
  const [Auth] = useContext(AuthContext)

  useEffect(() => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      Auth.handlerAuthentication()
    } else {
      throw new Error('Invalid callback url!')
    }
  })

  return <h1> Loading ...</h1>
}

export default Callback
