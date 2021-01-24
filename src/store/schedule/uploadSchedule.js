import server from "../../utils/utilsConstants"

export default {
  actions: {
    async uploadFile({dispatch, commit}, file) {
      try {
        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          throw({code: 'incorrect_file_type'})
        }
        let formData = new FormData();
        formData.append("file", file);
        await fetch(`${server}/api/v1/excel/parse`, {method: "POST", body: formData});
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
