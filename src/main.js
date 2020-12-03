import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import tooltipDirective from './directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyCo31zyn9WdekM_cMtIp4w7uHa38FeyIUk",
    authDomain: "vue-schedule-vgtu.firebaseapp.com",
    databaseURL: "https://vue-schedule-vgtu.firebaseio.com",
    projectId: "vue-schedule-vgtu",
    storageBucket: "vue-schedule-vgtu.appspot.com",
    messagingSenderId: "473979700930",
    appId: "1:473979700930:web:c9aff53f06ff25a9175d5b",
    measurementId: "G-N9EZ6YJ8PK"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
