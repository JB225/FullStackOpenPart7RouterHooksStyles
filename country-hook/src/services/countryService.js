import axios from "axios";

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountry = async (name) => {
    const response = await axios.get(`${baseURL}/name/${name}`)
    return response.data
}

export { getCountry }