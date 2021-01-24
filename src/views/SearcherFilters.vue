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
      <select id="group" @change='onChangeGroupHandler'>
        <option value="" disabled selected>Выберите группу</option>
        <option
          v-for="o of this.$store.getters.groups"
          :key="o.id"
          :value="o.name"
        >{{o.name}}</option>
      </select>
      <label>Группа</label>
    </div>
    <div class="col s1">
      <span class="flow-text">
        <a class="waves-effect waves-light btn" @click='onSendFilterData'>
          <i class="material-icons right">search</i>
          Найти
        </a>
      </span>
    </div>
    <div class="col s2 push-s4" v-show='this.$store.getters.info.isAdmin'>
        <span class="flow-text">
          <input id="upload" style="display:none" type="file" @change='fileHandler'/>
          <a class="waves-effect waves-light btn" @click.prevent='onUploadFile'>
            <i class="material-icons right">cloud_upload</i>
            Загрузить
          </a>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searcher-filters',
  data: () => {
    return {
    choosenGroup: "",
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
    groups: []
  }},
  methods: {
    onChangeGroupHandler: function(event) {
      this.choosenGroup = event.target.value
    },
    onSendFilterData: function() {
      this.$emit('add-item', this.choosenGroup)
    },
    onUploadFile() {
      document.getElementById('upload').click()
    },
    async loadGroups(){
      let group = document.getElementById('group')
      await this.$store.dispatch('getAllGroups')
      M.FormSelect.init(group, this.$store.getters.groups);
    },
    async fileHandler() {
      await this.$store.dispatch('uploadFile', document.getElementById("upload").files[0])
      this.$emit('remove-item')
      await this.loadGroups()
      M.toast({html: 'Загрузка расписания выполнена'})
    }
  },
  mounted: async function() {
    let direction = document.getElementById('direction')
    M.FormSelect.init(direction, this.directions);
    await this.loadGroups()
  }
}
</script>

