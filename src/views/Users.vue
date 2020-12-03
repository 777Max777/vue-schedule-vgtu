<template>
  <div>
    <div class="page-title">
      <h3>Пользователи</h3>
    </div>

    <Loader v-if="loading" />

    <section v-else>
      <UsersTable :users="users" />
    </section>
  </div>
</template>

<script>
import UsersTable from '../components/UsersTable'
export default {
  name: 'users',
  data: () => ({
    loading: true,
    users: []
  }),
  async mounted() {
    const us = await this.$store.dispatch('getUsers')
    console.log(us)
    this.users = us
    this.loading = false
  },
  components: {
    UsersTable
  }
}
</script>
