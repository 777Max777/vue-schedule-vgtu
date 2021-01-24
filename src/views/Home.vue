
<template>
  <div id="app">
    <div id="container">
      <div class="row">
        <SearcherFilters @add-item='addData' @remove-item='removeData'/>
      </div>
      <div class="row">
        <div class="col s12">
          <ejs-schedule id="Schedule" 
            :height='height'
            :locale="locale"
            :eventSettings="eventSettings"
            :timeScale='timeScale'
            :actionComplete='actionComplete'
          >
            <e-views>
              <e-view option="Day"></e-view>
              <e-view option="Week"></e-view>
              <e-view option="WorkWeek"></e-view>
              <e-view option="Month"></e-view>
            </e-views>
          </ejs-schedule>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Internationalization, L10n, loadCldr } from "@syncfusion/ej2-base";
import {
  SchedulePlugin,
  Day,
  Week,
  WorkWeek,
  Month
} from "@syncfusion/ej2-vue-schedule";
import * as localeText from "../locale/locale.json";
import * as gregorian from "../locale/ca-gregorian.json";
import * as numbers from "../locale/numbers.json";
import * as timeZoneNames from "../locale/timeZoneNames.json";
import SearcherFilters from "./SearcherFilters.vue"


Vue.use(SchedulePlugin);
L10n.load(localeText);
loadCldr(gregorian, numbers, timeZoneNames);

 let instance = new Internationalization();
  var majorTemplateVue = Vue.component('demo', {
        template: '<div>{{majorSlotTemplate(data.date)}}</div>',
        data() {
            return {
                data: {}
            };
        },
        methods: {
            majorSlotTemplate: function (date) {
                return instance.formatDate(date, { skeleton: 'hm' });
            }
        }
    });
   var minorTemplateVue = Vue.component('demo', {
        template: '<div style="text-align: right; margin-right: 15px">{{minorSlotTemplate(data.date)}}</div>',
        data() {
            return {
                data: {},
                minorSlotTemplate: function (date) {
                return instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
            }
        };
      }
    });

export default {
  data() {
    return {
      height: "85vh",
      locale: "ru",
      loadedDates: undefined,
      group: '',
      majorSlotTemplate: function (e) {
          return { template: majorTemplateVue }
      },
      minorSlotTemplate: function (e) {
         return { template: minorTemplateVue }
      },
      timeScale: {
        enable: true,
        interval: 60,
        slotCount: 6
      },
      eventSettings: {
        allowAdding: true,
        dataSource: []
      }      
    };
  },
  methods: {
    async arrangeLoadAppointments() {
      let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
      if (scheduleObj.activeView.renderDates.length > 0) {
        let array = scheduleObj.activeView.renderDates
        let firstDay = array[0]
        let lastDay = array[array.length-1]
        if (this.loadedDates) {
          let months = this.loadedDates.months
          let tempDate
          if (!months.includes(firstDay.getMonth())) {
              months.push(firstDay.getMonth())
              tempDate = firstDay
          }
          if (!months.includes(lastDay.getMonth())) {
            months.push(lastDay.getMonth())
            tempDate = lastDay
          }
          if (tempDate) {
            let startDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
            let endDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0);
            this.loadedDates = {
              ...this.loadedDates,
              months,
              from: startDate.getTime(),
              to: endDate.getTime()
            }
            await this.$store.dispatch('loadSchedule', this.loadedDates);
            let initDataSchedule = this.$store.getters.lessons
            console.log('Lessons: {}', initDataSchedule)
            this.eventSettings = {
              dataSource: this.eventSettings.dataSource.concat(initDataSchedule)
            }
            console.log(this.eventSettings.dataSource)
          }
        }
      }
    },
    removeData() {
      this.eventSettings = {
        dataSource: []
      }
      
    },
    async addData(value) {
      console.log(value)
      this.group = value
      this.loadedDates = {
        ...this.loadedDates,
        group: value,
        months: []
      }
      this.arrangeLoadAppointments()
    },
    async actionComplete(event) {
      if (event.requestType == 'dateNavigate' 
          || event.requestType == 'viewNavigate') {
            this.arrangeLoadAppointments()
        }
      }
  },
  mounted: async function () {
    let scheduleObj = document.getElementById('Schedule').ej2_instances[0];
    scheduleObj.timeScale.majorSlotTemplate = this.majorSlotTemplate;
    scheduleObj.timeScale.minorSlotTemplate = this.minorSlotTemplate;
    scheduleObj.dataBind();
    
    let array = scheduleObj.activeView.renderDates
    if (array.length > 0) {
      let firstDay = array[0]
      let lastDay = array[array.length-1]
      if (!this.loadedDates) {
        let months = []
        let startDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1);
        let endDate = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 0);
        
        months.push(firstDay.getMonth())
        if (startDate.getMonth() !== endDate.getMonth()) {
          months.push(lastDay.getMonth())
        }
        this.loadedDates = {
              months,
              from: startDate.getTime(),
              to: endDate.getTime()
        }
        await this.$store.dispatch('loadSchedule', this.loadedDates);
        let initDataSchedule = this.$store.getters.lessons
        console.log('Lessons: {}', initDataSchedule)
      }
      console.log(this.loadedDates)
    }
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month]
  },
  components: {
    SearcherFilters
  }
};
</script>
<style lang="scss">
  @import "~@syncfusion/ej2-vue-schedule/styles/material.css";
  @import "~@syncfusion/ej2-base/styles/material.css";
  @import "~@syncfusion/ej2-buttons/styles/material.css";
  @import "~@syncfusion/ej2-calendars/styles/material.css";
  @import "~@syncfusion/ej2-dropdowns/styles/material.css";
  @import "~@syncfusion/ej2-inputs/styles/material.css";
  @import "~@syncfusion/ej2-navigations/styles/material.css";
  @import "~@syncfusion/ej2-popups/styles/material.css";

  .e-schedule .e-vertical-view .e-time-cells-wrap table td {
    padding: 0px 5px;
  }
</style>
