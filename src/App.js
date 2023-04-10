
import {useEffect, useState} from 'react';
import './App.css';
import Toc from './cmps/Toc';
import FilmDetails from './cmps/FilmDetails';
import { filmService } from './services/film.service';


function App() {

  const [films, setFilms] = useState(null)
  const [currFilm, setCurrFilm] = useState(null)

  useEffect(()=>{
      getFilms()
  },[])

  const getFilms = async() => {
    const films = await filmService.getFilms()
    console.log(films);
    setFilms(films)
  }
  
  return (
    <div className="app">
      <Toc films={films} setCurrFilm={setCurrFilm}/>
      <FilmDetails currFilm={currFilm} />
    </div>
  );
}

export default App;
