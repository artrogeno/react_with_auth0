import React, { useState, useEffect, useContext } from 'react'

import Axios from 'shared/services/axios'
import AuthContext from 'shared/contexts/auth'

const Private = () => {
  const [Auth] = useContext(AuthContext)
  const [message, setMessage] = useState('')
  const [load, setLoad] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPrivateApi = async () => {
    try {
      const { data } = await Axios.get('private', {
        headers: { Authorization: `Bearer ${Auth.getAccessToken()}` }
      })
      setMessage(data.message)
    } catch (error) {
      setMessage(JSON.stringify(error.message))
    }
    setLoad(true)
  }

  useEffect(() => {
    if (!load) {
      getPrivateApi()
    }
  }, [getPrivateApi, load])

  return (
    <>
      <br />
      <p>{message}</p>
    </>
  )
}

export default Private
