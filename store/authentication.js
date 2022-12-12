import { userService } from '@/_services'
import {rolesRules} from '@/_helpers/roles-rules'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? {
    status: { loggedIn: true },
    user
  }
  : {
    status: { loggedIn: false},
    user: { username: 'base' }
  }

export const state = () => initialState

export const getters = {
  loggedIn: state => {
    return state.status.loggedIn
  },
  isAdmin: (state) => {
    return rolesRules.isAdmin(state.user.role)
  },
  isPremium : (state) => {
    return rolesRules.isPremium(state.user.role)
  },
  isFsrAdmin : (state) => {
    return rolesRules.isFsrAdmin(state.user.role)
  },
  token: state => {
    return state.user.token
  },
  user: state => {
    return state.user
  }
}
export const actions = {
  login ({
    dispatch,
    commit
  }, {
    username,
    password
  }) {
    return new Promise((res, rej) => {
      commit('loginRequest', { username })
      userService.login(username, password)
        .then(
          user => {
            commit('loginSuccess', user)
            res(user)
          }
        ).catch(
        error => {
          commit('loginFailure')
          dispatch('alert/error', error, { root: true })
          rej(error)
        }
      )
    })

  },
  logout ({ commit }) {
    userService.logout()
    commit('logout')
  }
}

export const mutations = {
  loginRequest (state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  loginSuccess (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure (state) {
    state.status = { loggedIn : false}
    state.user = {}
  },
  logout (state) {
    state.status = { loggedIn : false}
    state.user = {}
  }
}

