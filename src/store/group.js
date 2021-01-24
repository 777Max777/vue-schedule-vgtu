import server from "../utils/utilsConstants"

export default {
  state: {
    groups: []
  },
  mutations: {
    setGroups(state, data) {
      state.groups = data
    }
  },
  actions: {
    async getAllGroups({dispatch, commit}) {
      await fetch(`${server}/api/v1/excel`, {method: "GET"})
        .then(response => response.json())
        .then(data => commit('setGroups', data))
    }
  },
  getters: {
    groups: s => s.groups
  }
}
