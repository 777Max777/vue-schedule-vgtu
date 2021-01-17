import server from "../../utils/utilsConstants"

export default {
  state: {
    lessons: []
  },
  mutations: {
    setLessons(state, data) {
      state.lessons = data
    }
  },
  actions: {
    async loadScheduleByDestination({dispatch, commit}, direction) {
      await fetch(`${server}/api/v1/excel`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          direction: direction
        })})
      .then(response => response.json())
      .then(data => {
        data.map(lesson => ({
          ...lesson,
          StartTime: new Date(lesson.StartTime),
          EndTime: new Date(lesson.EndTime)
        }))
        commit('setLessons', data)
      })
      .catch(err => console.error(err))
    },
     async loadScheduleByGroup({dispatch, commit}, group) {
       await fetch(`${server}/api/v1/excel`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          group: group
        })})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.map(lesson => ({
          ...lesson,
          StartTime: new Date(lesson.StartTime),
          EndTime: new Date(lesson.EndTime)
        }))
        commit('setLessons', data)
      })
      .catch(err => console.error(err))
    }
  },
  getters: {
    lessons: s => s.lessons
  }
}
