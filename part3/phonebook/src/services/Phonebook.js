import axios from 'axios';
const baseURL = '/api/persons';

const getAll = () =>{
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const create = newObj =>{
    const request = axios.post(baseURL, newObj);
    return request.then(response => response.data);
};

const update = (id, newObj) =>{
    const request = axios.put(`${baseURL}/${id}`, newObj)
    return request.then(response => response.data)
}

const remove = id => axios.delete(`${baseURL}/${id}`);

export default {getAll, create, remove, update};
