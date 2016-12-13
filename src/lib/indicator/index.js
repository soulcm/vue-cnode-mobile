import Vue from 'vue';

// import Indicator from './src/indicator';
const Indicator = Vue.extend(require('./src/indicator.vue'));

let instance;
let timer;

export default {
    open(options = {}) {
        if (!instance) {
            instance = new Indicator({
                el: document.createElement('div')
            });
        }
        if (instance.show) {
            return
        }
        instance.text = typeof options === 'string' ? options : options.text || '';
        document.body.appendChild(instance.$el);
        if (timer) {
            clearTimeout(timer);
        }

        instance.show = true;
    },

    close() {
        if (instance) {
            instance.show = false;
            // timer = setTimeout(() => {
            //     if (instance.$el) {
            //         instance.$el.style.display = 'none';
            //     }
            // }, 400);
        }
    }
}

