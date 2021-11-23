import { createApp } from 'vue'
import App from './App.vue'

/* 导入 fortawesome 核心 */
import { library } from '@fortawesome/fontawesome-svg-core'

import { faGithub, faTwitter, faWeibo, faWeixin 
} from '@fortawesome/free-brands-svg-icons'

import {
  faSearch,
  faLightbulb,
  faChartLine,
  faCartShopping,
  faDesktop,
  faGaugeSimple,
  faServer,
  faCode,
  faImages,
  faPalette,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'

import { faCalendarDays, faComments} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// @ts-ignore , 导入brands类别的icon，会报错，由于ts无法识别IconDefinitionOrPack
library.add( faWeibo,
  faWeixin,
  faGithub,
  faTwitter,
  faSearch,
  faLightbulb,
  faChartLine,
  faCartShopping,
  faDesktop,
  faGaugeSimple,
  faServer,
  faCode,
  faImages,
  faPalette,
  faCalendarDays,
  faComments,
  faChevronUp
)


const app = createApp(App)
app.component('fa', FontAwesomeIcon)
app.mount('#app')
