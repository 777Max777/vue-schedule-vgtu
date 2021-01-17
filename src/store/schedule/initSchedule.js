import server from "../../utils/utilsConstants"

export default {
  state: {
    directions: [],
    groups: []
  },
  mutations: {
    setDirections(state, data) {
      state.directions = data
    },
    setGroups(state, data) {
      state.groups = data
    }
  },
  actions: {
    async loadDirections({dispatch, commit}) {
      fetch(`${server}/api/v1/directions`, {method: "GET"})
      .then(response => response.json)
      .then(data => {
        commit('setDirections', data)
      })
      .catch(err => console.error(err))
    },
    async loadGroups({dispatch, commit}) {
      fetch(`${server}/api/v1/groups`, {method: "GET"})
      .then(response => response.json)
      .then(data => {
        commit('setGroups', data)
      })
      .catch(err => console.error(err))
    },
    async loadGroupsByDirection({dispatch, commit}, id) {
      fetch(`${server}/api/v1/setGroups/${id}`, {method: "GET"})
      .then(response => response.json)
      .then(data => {
        commit('setGroups', data)
      })
      .catch(err => console.error(err))
    }
  },
  getters: {
    directions: s => s.directions,
    groups: s => s.groups
  }
}
