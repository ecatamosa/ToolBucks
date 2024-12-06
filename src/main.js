// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives,

  theme: {
    defaultTheme: 'dark', // Set the default theme to dark
    themes: {
      dark: {
        primary: '#BB86FC',
        secondary: '#03DAC6',
        // Define other dark theme colors as needed
      },
      light: {
        primary: '#1976D2',
        // Define other light theme colors as needed
      },
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
