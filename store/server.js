import { serverService } from '@/_services/server.service'

const initialState = {
  servers : {items : []}
}

export const state = () => initialState

export const getters = {
  loadingServers: state => state.servers.fetching,
  servers: state => state.servers.items,
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
  }
}
