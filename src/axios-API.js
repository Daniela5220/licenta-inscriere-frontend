import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_AGSIS,
    headers: {'content-type': 'application/json;charset=UTF-8',}
});

/**
 * atunci cand utilizatorul primeste codul de eroare 401 pentru o metoda anume (unauthorized) va aparea un alert cu metoda la care utilizatorul nu are acces
 */
instance.interceptors.response.use(res => res, function (error) {

    console.log(error.response);

    if(error.response === 401) {
        alert("Nu aveti acces la metoda: " + error.response.config.url);
    }
    return Promise.reject(error);
});

export default instance;
