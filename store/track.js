import { trackService } from '@/_services'
import tracks from '@/pages/tracks'

const initialState = {
  tracks: { items: [] ,notInitialized : true},
  nations: { items: [] },
  authors: { items: [] },
  layoutCategories: {items : [
      {
        text: 'Oval',
        value: 'Oval'
      },
      {
        text: 'Road Course',
        value: 'Road Course'
      },
      {
        text: 'A to B',
        value: 'A to B'
      },
    ]},
  trackTags: {items : [
    {
      text: 'Historic',
      value: 'Historic'
    },
    {
      text: 'Rally',
      value: 'Rally'
    },
    {
      text: 'Drift',
      value: 'Drift'
    },
    {
      text: 'Freeroam',
      value: 'Freeroam'
    },
    {
      text: 'Street Circuit',
      value: 'Street Circuit'
    },
    {
      text: 'Fictional',
      value: 'Fictional'
    },
    {
      text: 'Kart',
      value: 'Kart'
    },
    {
      text: 'Laser Scanned/LiDAR',
      value: 'Laser Scan'
    }
    ]
  }
}

export const state = () => initialState
export const getters = {
  tracks: state => state.tracks.items,
  track: state => (name, year) => state.tracks.items.find(t => t.name.toLowerCase() === name.toLowerCase() && t.year === parseInt(year)),
  getTrackById: state => id => state.tracks.items.find(t => t.id === parseInt(id)),
  loadingTracks: state => state.tracks.fetching || state.tracks.notInitialized,
  nations: state => state.nations.items,
  loadingNations: state => state.nations.fetching,
  authors: state => state.authors.items,
  loadingAuthors: state => state.authors.fetching,
  layoutCategories : state => state.layoutCategories.items,
  trackTags : state => state.trackTags.items,
}

export const actions = {
  getAllTracks ({
    dispatch,
    commit
  }) {
    commit('tracksFetching')
    return new Promise((res, rej) => {
      trackService.getAll()
        .then(tracks => {
          commit('tracksFetched', tracks)
          res(tracks)
          }
        )
        .catch(error => {
          commit('tracksFetchError', error)
          dispatch('alert/error', error, { root: true })
          rej(error)
        })
    })
  },
  async getAllNations ({
    dispatch,
    commit
  }) {
    commit('nationsFetching')
    await trackService.getTracksNations()
      .then(nations => {
        commit('nationsFetched', nations)
      })
      .catch(err => {
        commit('nationsFetchError', err)
        dispatch('alert/error', err, { root: true })
      })
  },
  async getTracksAuthors ({
    dispatch,
    commit
  }) {
    commit('authorsFetching')
    await trackService.getTracksAuthors()
      .then(authors => commit('authorsFetched', authors))
      .catch(err => {
        commit('authorsFetchError', err)
        dispatch('alert/error', err, { root: true })
      })
  },
  async addTrack ({
    dispatch,
    commit
  }, track) {
    return new Promise((res, rej) => {
      commit('trackPushing')
      trackService.addTrack(track)
        .then(track => {
          commit('trackPushed', track)
          dispatch('getAllTracks')
          dispatch('alert/success', track, { root: true })
          res(track)
        })
        .catch(err => {
          commit('trackPushError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  },
  async updateTrack ({
    dispatch,
    commit
  }, track) {
    return new Promise((res, rej) => {
      commit('trackPushing')
      trackService.updateTrack(track)
        .then(track => {
          commit('trackPushed', track)
          dispatch('getAllTracks')
          dispatch('alert/success', track, { root: true })
          res(track)
        })
        .catch(err => {
          commit('trackPushError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  }
}

export const mutations = {
  tracksFetching (state) {
    state.tracks = {
      items: state.tracks.items,
      fetching: true
    }
  },
  tracksFetched (state, tracks) {
    state.tracks = { items: tracks }
  },
  tracksFetchError (state, error) {
    state.tracks = {
      items: [],
      error
    }
  },
  nationsFetching (state) {
    state.nations = {
      items: [],
      fetching: true
    }
  },
  nationsFetched (state, nations) {
    state.nations = { items: nations }
  },
  nationsFetchError (state, error) {
    state.nations = {
      items: [],
      error
    }
  },
  authorsFetching (state) {
    state.authors = {
      items: [],
      fetching: true
    }
  },
  authorsFetched (state, authors) {
    state.authors = { items: authors }
  },
  authorsFetchError (state, error) {
    state.authors = {
      items: [],
      error
    }
  },
  trackPushing (state) {
    delete state.tracks.error
    state.tracks.pushing = true
  },
  trackPushed (state, track) {
    delete state.tracks.pushing
    state.tracks.items.push(track)
  },
  trackPushError (state, error) {
    delete state.tracks.pushing
    state.tracks.error = error
  }
}
