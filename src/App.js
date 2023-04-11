
import { useEffect, useState } from 'react';
import './App.css';
import Toc from './cmps/Toc';
import FilmDetails from './cmps/FilmDetails';
import { filmService } from './services/film.service';
import { storageService } from './services/storage.service';
import MenuIcon from '@mui/icons-material/Menu';


function App() {

  const [films, setFilms] = useState(null)
  const [currFilm, setCurrFilm] = useState(null)
  const [poster, setPoster] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getFilms()
  }, [])

  useEffect(() => {
    if(currFilm?.title) getPoster(currFilm?.title)
  }, [currFilm])

  const getFilms = async () => {
    const films = storageService.loadFromStorage('films') || await filmService.getFilms()
    console.log(films);
    setFilms(films)
    setCurrFilm(films[0])
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
    // document.querySelector('body').setAttribute('style', ` background-image: url(${poster}); box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.75); background-size:100%;min-height: 190vh;background-repeat: no-repeat;`)
    setPoster(poster)
  }

  return (
    <div className="app">
      <div className="gradient"></div>
      {poster && <img className='film-poster' src={poster} alt="" />}
      {isOpen && <div className="menu-overlay" onClick={()=>setIsOpen(!isOpen)}></div>}
      <div className="table">
        <div className='hamburger-btn' onClick={()=>setIsOpen(!isOpen)}><MenuIcon/></div>
        <Toc films={films} setCurrFilm={setCurrFilm} currFilm={currFilm} isOpen={isOpen} setIsOpen={setIsOpen} />
        <FilmDetails currFilm={currFilm} setFavorite={setFavorite} />
      </div>
    </div>
  );
}

export default App;
