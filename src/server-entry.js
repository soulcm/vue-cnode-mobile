import 'es6-promise/auto'
import { topicList } from './apis/publicApi';
import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
    const s = isDev && Date.now()

    // set router's location
    router.push(context.url)

    return new Promise((resolve, reject) => {
        store.dispatch('GET_TOPIC_LIST', {
            page: 1,
            limit: 20,
            tab: 'all',
            mdrender: false
        }).then((res) => {
            context.initialState = store.state
            resolve(app)
        }).catch((err) => {
            console.log(err)
            resolve(app)
        })
    })
}
