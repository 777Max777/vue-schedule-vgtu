import firebase from 'firebase/app'

export default {
  actions: {
    async getUsers({dispatch, commit}) {
      try {
        console.log('I\'m here')
        const users = (await firebase.database().ref(`/users`).once('value')).val()
        console.log('authed user - ', users);
        return users ? Object.keys(users).map(key => ({...users[key].info, id: key})) : null;
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
