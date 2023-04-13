import axios from "axios"
import { storageService } from "./storage.service"

const getFilms = async() => {
    const res = await axios.get('https://swapi.dev/api/films')
    storageService.saveToStorage('films', res.data.results)
    return res.data.results
}

const getFilmsPoster = async(title:String) => {
    const res = await axios.get(`
    https://api.themoviedb.org/3/search/movie?api_key=9583e0ee2a79ccc1c85f6f5b47465f60&language=en-US&query=star wars ${title}&page=1&include_adult=false`)
    // return res.data.Poster
    return `https://image.tmdb.org/t/p/original/${res.data?.results[0]?.backdrop_path}`
}

export const filmService = {
    getFilms,
    getFilmsPoster
}