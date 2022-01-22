import axios from 'axios';

export const RequestMethod = Object.freeze({
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
});


export default async function axiosRequest(endpoint, payload = null, method = RequestMethod.GET) {
    axios.defaults.baseURL = 'http://localhost:10000';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return new Promise((resolve) => {
        axios[method.toLowerCase()](endpoint, payload).then(response => {
            resolve(response.data);
        }).catch(error => {
            console.log('axiosRequest endpoint: ', endpoint, error);
        });
    })
}

