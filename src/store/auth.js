import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        console.log("uid user = ", uid)
        await firebase.database().ref(`/users/${uid}/info`).set({
          isAdmin: false,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async getName({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const user = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        return user ? user.name : null;
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
