const axios = require('axios')
const apiUrl = 'http://localhost:8080/api/'

export default {
    getHeader() {
        let token = window.localStorage.getItem('token')
        if (!token) {
            return {}
        }
        return {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
        }
    },
    get(url) {
        return axios.get(
            apiUrl + url,
            { headers: this.getHeader()}
        )
    },
    post(url, data) {
        return axios.post(
            apiUrl + url,
            data,
            { headers: this.getHeader()}
        )
    }
}
