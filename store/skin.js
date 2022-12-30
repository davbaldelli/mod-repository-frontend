import {serverService as skinsService} from "@/_services";

const initialState = {
  skins:{ items: []},
}

export const state = () => initialState

export const getters = {
  skins: state => state.skins.items,
  loadingSkins : state => state.skins.fetching
}

export const mutations = {
  skinsFetching (state) {
    state.skins = {
      items: [],
      fetching: true
    }
  },
  skinsFetched(state, skins){
    state.skins = {items : skins}
  },
  skinsFetchError(state, error){
    state.tracks = {
      items : [],
      error
    }
  }
}

export const actions = {
  getCarSkins ({dispatch, commit}, carId){
    commit('skinsFetching')
    return new Promise((res, rej) => {
      skinsService.getCarSkins(carId)
        .then(skins => {
          commit('skinsFetched', skins)
          res(skins)
        })
        .catch(error => {
          commit('skinsFetchError', error)
          dispatch('alert/error', error, { root: true })
          rej(error)
        })
    })
  }
}
