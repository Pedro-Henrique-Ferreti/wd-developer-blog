export const state = () => ({
  token: null,
});

export const getters = {
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return state.token !== null;
  },
};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  authenticateUser(context, authData) {
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbApiKey;
    
    if (authData.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbApiKey
    }

    return this.$axios.$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }
    )
    .then(result => {
      context.commit('setToken', result.idToken);
      localStorage.setItem('token', result.idToken);
      localStorage.setItem('tokenExpiration', new Date().getTime() + result.expiresIn * 1000);
      context.dispatch('setLogoutTimer', result.expiresIn * 1000);
    })
    .catch(error => {
      console.log(error);
    });
  },
  setLogoutTimer(context, duration) {
    setTimeout(() => context.commit('clearToken'), duration);
  },
  initAuth(context) {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('tokenExpiration');

    if (new Date().getTime() > +expirationDate || !token) {
      return 
    }

    context.dispatch('setLogoutTimer', +expirationDate - new Date().getTime());

    context.commit('setToken', token);
  }
}