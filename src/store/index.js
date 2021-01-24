import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import user from './user.js'
import group from './group.js'
import uploadSchedule from './schedule/uploadSchedule.js'
import initSchedule from './schedule/initSchedule.js'
import filterSchedule from './schedule/filterSchedule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, user, uploadSchedule, initSchedule, filterSchedule, group
  }
})
