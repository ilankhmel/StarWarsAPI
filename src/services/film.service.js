import axios from "axios"

const getFilms = async() => {
    const res = await axios.get('https://swapi.dev/api/films')
    return res.data.results
}

export const filmService = {
    getFilms,
}