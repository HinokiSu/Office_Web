import { createApp } from 'vue'
import App from './App.vue'
/* 导入 fortawesome 核心 */
import { library } from '@fortawesome/fontawesome-svg-core'

// 导入fontAwesome图标样式
import { 
  faSearch, faLightbulb, faChartLine, 
  faCartShopping, faDesktop, faGaugeSimple, 
  faServer 
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* 在标签中不需要加前缀fa- */

library.add(
  faSearch, faLightbulb, faChartLine, 
  faCartShopping, faDesktop, faGaugeSimple, 
  faServer
  )

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
