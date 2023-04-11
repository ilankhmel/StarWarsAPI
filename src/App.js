
import { useEffect, useState } from 'react';
import './App.css';
import Toc from './cmps/Toc';
import FilmDetails from './cmps/FilmDetails';
import { filmService } from './services/film.service';
import { storageService } from './services/storage.service';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';



function App() {

  const [films, setFilms] = useState(null)
  const [currFilm, setCurrFilm] = useState(null)
  const [poster, setPoster] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const params = useParams()

  useEffect(() => {
    getFilms()
  }, [])

  useEffect(() => {
    if (films) {
      const film = films.find(f => f.episode_id == params?.id)
      film ? setCurrFilm(film) : setCurrFilm(films[0])
    }
  }, [params?.id, films])

  useEffect(() => {
    getPoster(currFilm?.title)
  }, [currFilm])

  const getFilms = async () => {
    const films = storageService.loadFromStorage('films') || await filmService.getFilms()
    setFilms(films)
  }

  const setFavorite = (id) => {
    const updatedFilms = films.map(film => {
      if (film.episode_id === id) {
        film.favorite ? film.favorite = false : film.favorite = true
      }
      return film
    })

    setFilms(updatedFilms)

    storageService.saveToStorage('films', updatedFilms)

  }

  const getPoster = async (title) => {
    const poster = await filmService.getFilmsPoster(title)
    setPoster(poster)
  }

  return (
    <div className="app">
      {films ?
        <>
          <div className="gradient"></div>
          {poster && <img className='film-poster' src={poster} alt="" />}
          {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(!isOpen)}></div>}
          <div className="table">
            <div className='hamburger-btn' onClick={() => setIsOpen(!isOpen)}><MenuIcon /></div>
            <Toc films={films} currFilm={currFilm} isOpen={isOpen} setIsOpen={setIsOpen} />
            <FilmDetails currFilm={currFilm} setFavorite={setFavorite} />
          </div>
        </>
        :
        <Box className="spinner" sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
    </div>
  );
}

export default App;
