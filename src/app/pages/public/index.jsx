import React, { useState, useEffect } from 'react'

import Axios from 'shared/services/axios'

const Public = () => {
  const [message, setMessage] = useState('')
  const [load, setLoad] = useState(false)

  const getPublicApi = async () => {
    try {
      const { data } = await Axios.get('public')
      setMessage(data.message)
    } catch (error) {
      setMessage(JSON.stringify(error.message))
    }
    setLoad(true)
  }

  useEffect(() => {
    if (!load) {
      getPublicApi()
    }
  }, [load])

  return (
    <>
      <br />
      <p>{message}</p>
    </>
  )
}

export default Public
