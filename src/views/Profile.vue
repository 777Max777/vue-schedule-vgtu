<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input
            id="description"
            type="text"
            ref="name"
            v-model='name'
        >
        <label for="description">Имя</label>
        <span
              class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data: () => ({
    name: ""
  }),
  methods: {
    focusInput() {
      this.$refs.name.focus();
    }
  },
  async mounted() {
    this.name = await this.$store.dispatch('getName')
    this.focusInput()
  }
}
</script>
