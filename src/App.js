
import {useEffect, useState} from 'react';
import './App.css';
import Toc from './cmps/Toc';
import FilmDetails from './cmps/FilmDetails';
import { filmService } from './services/film.service';
import { storageService } from './services/storage.service';


function App() {

  const [films, setFilms] = useState(null)
  const [currFilm, setCurrFilm] = useState(null)

  useEffect(()=>{
      getFilms()
  },[])

  const getFilms = async() => {
    const films = storageService.loadFromStorage('films') || await filmService.getFilms()
    console.log(films);
    setFilms(films)
  }

  const setFavorite = (id) => {
      const updatedFilms = films.map(film => {
        if(film.episode_id === id){
          film.favorite ? film.favorite = false : film.favorite = true
        }
        return film
      })

      setFilms(updatedFilms)

      storageService.saveToStorage('films', updatedFilms)
      
  }
  
  return (
    <div className="app">
      <Toc films={films} setCurrFilm={setCurrFilm} currFilm={currFilm}/>
      <FilmDetails currFilm={currFilm} setFavorite={setFavorite} />
    </div>
  );
}

export default App;
