export default {
  actions: {
    uploadFile({dispatch, commit}, file) {
      try {
        console.log('I\'m here', file)
        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          throw({code: 'incorrect_file_type'})
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
