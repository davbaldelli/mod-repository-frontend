import {serverService as skinsService} from "@/_services";

const initialState = {
  skins:{ items: []},
}

export const state = () => initialState

export const getters = {
  skins: state => state.skins.items,
  carSkins: state => carId => state.skins.items.filter(s => s.carId === carId),
  loadingSkins : state => state.skins.fetching,
  skin : state => id => state.skins.items.find(s => s.id === parseInt(id))
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
  getAllSkins ({dispatch, commit}){
    commit('skinsFetching')
    return new Promise((res, rej) => {
      skinsService.getAllSkins()
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
          dispatch('getAllSkins')
          dispatch('alert/success', skin, { root: true })
          res(skin)
        })
        .catch(err => {
          commit('skinPushingError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  },
  updateSkin({dispatch, commit}, skin){
    commit("pushingSkin")
    return new Promise((res, rej) => {
      skinsService.updateSkin(skin)
        .then(skin => {
          commit('skinPushed', skin)
          dispatch('getAllSkins')
          dispatch('alert/success', skin, { root: true })
          res(skin)
        })
        .catch(err => {
          commit('skinPushingError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  },

}
