import axios from 'axios'

// Aputiedosto API-kutsujen tekemistä varten

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update }
