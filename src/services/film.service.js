import axios from "axios"
import { storageService } from "./storage.service"

const getFilms = async() => {
    const res = await axios.get('https://swapi.dev/api/films')
    storageService.saveToStorage('films', res.data.results)
    return res.data.results
}

export const filmService = {
    getFilms,
}