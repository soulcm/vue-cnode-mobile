import 'es6-promise/auto';
import 'isomorphic-fetch';

const baseOpts = {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    // credentials: 'include',
    mode: 'cors'
}

const isObj = (obj) => {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
}

const isFormData = (obj) => {
    return obj && Object.prototype.toString.call(obj) === '[object FormData]';
}



const fetchApi = (cfg) => {
    let opts = Object.assign({}, baseOpts, cfg);
    const url = opts.url;
    delete opts.url;



    let fetchUrl = '/api'
    if (/^\//.test(url)) {
        fetchUrl += url
    } else {
        fetchUrl += '/' + url
    }

    if (opts.method.toLowerCase() !== 'get' && isObj(opts.body) && opts.headers['Content-Type'].indexOf('application/json') > -1) {
        opts.body = JSON.stringify(opts.body)
    }

    if (opts.method.toLowerCase() === 'get' && isObj(opts.body)) {
        fetchUrl += '?';
        for (let key in opts.body) {
            let value = opts.body[key];

            if (value instanceof Array) {
                value = JSON.stringify(value);
            }
            fetchUrl += key + '=' + value + '&';
        }
        fetchUrl = fetchUrl.slice(0, -1);
        delete opts.body;
    }

    // fetchUrl = 'https://cnodejs.org' + fetchUrl;

    if(process.env.VUE_ENV === 'server') { //服务端fetch需要绝对地址
        fetchUrl = 'https://cnodejs.org' + fetchUrl
    }

    return new Promise((resolve, reject) => {
        fetch(fetchUrl, opts).then((res) => {
            const isSuccess = res.ok || res.status >= 200 && res.status < 300;
            if (isSuccess) {
                const data = res.headers.get('content-type') && res.headers.get('content-type').indexOf('json') >= 0 ? res.json() : res.text();
                resolve(data);
            } else {
                throw res
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

export default fetchApi