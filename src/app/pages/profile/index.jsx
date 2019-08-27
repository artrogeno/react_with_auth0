import React, { useState, useEffect, useContext } from 'react'

import AuthContext from 'shared/contexts/auth'

const Profile = () => {
  const [Auth] = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  const loadUserProfile = () => {
    Auth.getProfile((profile, error) => {
      setProfile(profile)
      setError(error)
    })
  }

  useEffect(() => {
    loadUserProfile()
  })
  return (
    <>
      {!profile ? (
        <h1>{error}</h1>
      ) : (
        <>
          <h1>Profile</h1>
          <p>{profile.nickname}</p>
          <img
            style={{ maxHeight: 50, maxWidth: 50 }}
            className="img-fluid rounded-circle"
            src={profile.picture}
            alt="profile pic"
          />
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
      )}
    </>
  )
}

export default Profile
