import { serverService } from '@/_services/server.service'
import { carService } from '@/_services'

const initialState = {
  servers : {items : []}
}

export const state = () => initialState

export const getters = {
  loadingServers: state => state.servers.fetching,
  servers: state => state.servers.items,
  getById: state => (id) => state.servers.items.find(server => server.id === parseInt(id))
}

export const mutations = {
  serversFetching (state){
    state.servers = {
      items: state.servers.items,
      fetching: true
    }
  },
  serversFetched(state, servers){
    state.servers = { items: servers}
  },
  serversFetchingError (state, error) {
    state.servers = {
      items: [],
      error
    }
  },
  serverPushing (state) {
    delete state.servers.error
    state.servers.pushing = true
  },
  serverPushed (state) {
    delete state.servers.pushing
  },
  serverPushError (state, error) {
    delete state.servers.pushing
    state.servers = {
      items: state.servers.items,
      error
    }
  },
}

export const actions = {
  async getAll({dispatch, commit}) {
    commit('serversFetching')
    await serverService.getAll()
      .then(servers => {
        commit('serversFetched', servers)
      })
      .catch(error => {
        commit('serversFetchingError', error)
        dispatch('alert/error', error, {root : true})
      })
  },
  async updateServer ({
    dispatch,
    commit
  }, server) {
    return new Promise((res, rej) => {
      commit('serverPushing')
      serverService.updateServer(server)
        .then(server => {
          commit('serverPushed')
          dispatch('getAll')
          dispatch('alert/success', server, { root: true })
          res(server)
        })
        .catch(err => {
          commit('serverPushError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  },
}
