import auth0 from 'auth0-js'

const REDIRECT_ON_LOGIN = 'redirect_on_login'

export default class Auth {
  constructor(history) {
    this.history = history
    this.userProfile = null
    this.requestedScopes = 'openid profile email read:courses'
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_OAUTH0_DOMAIN,
      clientID: process.env.REACT_APP_OAUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_OAUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_OAUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: this.requestedScopes
    })
  }

  login() {
    localStorage.setItem(REDIRECT_ON_LOGIN, JSON.stringify(this.history.location))
    this.auth0.authorize()
  }

  handlerAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) === 'undefined'
            ? '/'
            : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN))
        this.history.push(redirectLocation)
      } else if (err) {
        this.history.push('/')
        // eslint-disable-next-line no-alert
        alert(`Error: ${err.error}. Check the console for further datail.`)
        // eslint-disable-next-line no-console
        console.log(err)
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN)
    })
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    const scopes = authResult.scope || this.requestedScopes || ''

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('scopes', JSON.stringify(scopes))
    this.scheduleTokenRenewal()
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('scopes')
    this.userProfile = null
    this.auth0.logout({
      clientID: process.env.REACT_APP_OAUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_OAUTH0_LOGOUT
    })
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No access token found!')
    }
    return accessToken
  }

  getProfile(cb) {
    if (this.userProfile) return cb(this.userProfile)
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile
      cb(profile, err)
    })
  }

  useHasScope(scopes) {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes') || '').split(' ')
    return scopes.every(scope => grantedScopes.includes(scope))
  }

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) console.log(`Error: ${err.error} - ${err.error_description}.`)
      else this.setSession(result)
      if (cb) cb(err, result)
    })
  }

  scheduleTokenRenewal() {
    const dalay = this.expiresAt - Date.now()
    if (dalay > 0) setTimeout(() => this.renewToken(), dalay)
  }
}
