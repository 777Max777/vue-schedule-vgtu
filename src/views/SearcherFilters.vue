<template>
  <div>
    <div class="input-field col s3">
      <select id="direction">
        <option value="" disabled selected>Выберите направление</option>
        <option
          v-for="o of directions"
          :key="o.value"
          :value="o.value"
        >{{o.name}}</option>
      </select>
      <label>Направление</label>
    </div>
    <div class="input-field col s3">
      <select id="group">
        <option value="" disabled selected>Выберите группу</option>
        <option
          v-for="o of groups"
          :key="o.value"
          :value="o.value"
        >{{o.name}}</option>
      </select>
      <label>Группа</label>
    </div>
    <div class="col s1">
      <span class="flow-text">
        <a class="waves-effect waves-light btn">
          <i class="material-icons right">search</i>
          Найти
        </a>
      </span>
    </div>
    <div class="col s2 push-s4" v-show='this.$store.getters.info.isAdmin'>
        <span class="flow-text">
          <a class="waves-effect waves-light btn">
            <i class="material-icons right">cloud_upload</i>
            Загрузить
          </a>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    directions: [{
      value: '1',
      name: 'Информатика и вычислительная техника'
    },{
      value: '2',
      name: 'Информационные системы и технологии'
    },{
      value: '3',
      name: 'Информационная безопасность'
    },{
      value: '4',
      name: 'Компьютерная безопасность'
    }],
    groups: [{
      value: '1',
      name: 'бАМ'
    },{
      value: '2',
      name: 'бВМ'
    },{
      value: '3',
      name: 'бАП'
    },{
      value: '4',
      name: 'бКБ'
    }]
  }),
  mounted: () => {
    var direction = document.getElementById('direction')
    var group = document.getElementById('group')

    M.FormSelect.init(direction, this.directions);
    M.FormSelect.init(group, this.groups);
  }
}
</script>

