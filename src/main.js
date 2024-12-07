// STYLES
import '@/scss/app.scss';

// JS
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {Quasar} from 'quasar'



// create and mount app
createApp(App)
    .use(router)
    .use(Quasar, {
        plugins: {
            Notify
        },
    })
    .mount('#app')
