/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://192.168.1.230:3000'

registerPlugins(app)

app.use(axios).mount('#app')
