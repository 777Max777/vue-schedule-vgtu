<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Имя</th>
      <th>Админ</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(user, idx) of users" :key="user.id">
      <td>{{ idx + 1 }}</td>
      <td>{{user.name}}</td>
      <td>
        <div class="input-field col s1">
          <select>
            <option 
              v-for='o of adminOptions'
              :key='o.value'
              :selected='user.isAdmin == o.selected'
            >{{o.tittle}}</option>
          </select>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: () => ({
    adminOptions: [{
      value: 'true',
      selected: true,
      tittle: 'Да'
    },{
      value: 'false',
      selected: false,
      tittle: 'Нет'
    }]
  }),
  props: {
    users: {
      required: true,
      type: Array
    }
  },
  mounted: () => {
    var isAdmin = document.querySelectorAll('select')

    M.FormSelect.init(isAdmin, this.adminOptions);
  }
}
</script>>
