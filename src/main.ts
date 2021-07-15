import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// adicionar o axios

createApp(App).use(store).use(router).mount('#app')
