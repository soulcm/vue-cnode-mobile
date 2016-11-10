// require('isomorphic-fetch');

const baseOpts = {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: 'omit'
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


    return fetch(fetchUrl, opts).then((res) => {
        if (res.status !== 200) {
            return;
        }
        return res.json();
    }).catch((err) => {
        console.log('Fetch Error : %S', err);
    })
}

export default fetchApi