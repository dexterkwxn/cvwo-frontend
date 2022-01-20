import axios from 'axios';

export const RequestMethod = Object.freeze({
    GET: 'get',
    POST: 'post'
});


export default async function axiosRequest(endpoint, payload = null, method = RequestMethod.GET) {
    return new Promise((resolve) => {
        axios[method.toLowerCase()](endpoint, payload).then(response => {
            resolve(response.data);
        }).catch(error => {
            console.log('axiosRequest endpoint: ', endpoint, error);
        });
    })
}

