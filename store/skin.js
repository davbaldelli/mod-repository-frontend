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
  },
  pushingSkin(state){
    delete state.skins.error
    state.skins.pushing = true
  },
  skinPushed(state){
    delete state.skins.pushing
  },
  skinPushingError(state, error){
    delete state.skins.pushing
    state.skins = {
      ...state.skins,
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
  },
  addSkin({dispatch, commit}, skin){
    commit("pushingSkin")
    return new Promise((res, rej) => {
      skinsService.addSkin(skin)
        .then(skin => {
          commit('skinPushed', skin)
          dispatch('alert/success', skin, { root: true })
          res(skin)
        })
        .catch(err => {
          commit('skinPushingError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })

  }
}
