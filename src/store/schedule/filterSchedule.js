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
     async loadSchedule({dispatch, commit}, body) {
       await fetch(`${server}/api/v1/excel`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.map(lesson => ({
          Id: lesson.id,
          Subject: lesson.value,
          StartTime: new Date(lesson.from),
          EndTime: new Date(lesson.to)
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
