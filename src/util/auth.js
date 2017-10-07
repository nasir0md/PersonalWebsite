const API_URL = 'http://www.andrewszot.com:3001'
const LOGIN_URL = API_URL + '/sessions/create'

export default {
  api_endpoint: API_URL,
  user: {
    authenticated: false
  },
  login(context, creds, redirect, onLoginFail) {
    context.$http.post(LOGIN_URL, creds).then((data) => {
      var res = data.body;
      localStorage.setItem('id_token', res.id_token);
      localStorage.setItem('access_token', res.access_token);

      this.user.authenticated = true;

      if(redirect) {
        context.$router.push({path: redirect})        
      }
    }).catch(e => {
      onLoginFail();
    });
  },
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    this.user.athenticated = false;
  },
  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },
  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
