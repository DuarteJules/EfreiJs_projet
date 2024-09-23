import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      jwt: ''
    }
  },
  mutations: {
    setJwt (state, jwt) {
      state.jwt = jwt
    }
  },
  getters: {
    getJwt (state) {
      return state.jwt
    }
  }
})

export default store;
