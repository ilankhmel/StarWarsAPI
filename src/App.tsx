import { useEffect, useState } from "react";
import Toc from "./cmps/Toc";
import FilmDetails from "./cmps/FilmDetails";
import { filmService } from "./services/film.service";
import { storageService } from "./services/storage.service";
import MenuIcon from "@mui/icons-material/Menu";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { film } from "./modules/film.module";
import axios from "axios";

type films = film[];

function App() {
  const [films, setFilms] = useState<films | null>(null);
  const [currFilm, setCurrFilm] = useState<film | null>(null);
  const [poster, setPoster] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const params = useParams();

  useEffect(() => {
    getFilms();
  }, []);

  useEffect(() => {
    if (films) {
      const film = films.find((f) => f?.episode_id.toString() === params?.id);
      film ? setCurrFilm(film) : setCurrFilm(films[0]);
    }
  }, [params?.id, films]);

  useEffect(() => {
    if (currFilm) getPoster(currFilm?.title);
  }, [currFilm]);

  const getFilms = async () => {
    try {
      const films =
        storageService.loadFromStorage("films") ||
        (await filmService.getFilms());
      setFilms(films);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(err?.message);
      }
    }
  };

  const setFavorite = (id: Number) => {
    const updatedFilms = films!.map((film) => {
      if (film.episode_id === id) {
        film.favorite ? (film.favorite = false) : (film.favorite = true);
      }
      return film;
    });

    setFilms(updatedFilms);

    storageService.saveToStorage("films", updatedFilms);
  };

  const getPoster = async (title: String) => {
    try {
      const poster = await filmService.getFilmsPoster(title);
      if (poster) setPoster(poster);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      {films ? (
        <>
          <div className="gradient"></div>
          {poster && <img className="film-poster" src={poster} alt="" />}
          {isOpen && (
            <div
              className="menu-overlay"
              onClick={() => setIsOpen(!isOpen)}
            ></div>
          )}
          <div className="table">
            <div className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon />
            </div>
            <Toc
              films={films}
              currFilm={currFilm}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <FilmDetails currFilm={currFilm} setFavorite={setFavorite} />
          </div>
        </>
      ) : (
        <>
          {!error && (
            <Box className="loader" sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}

          {error && <div className="error">Error: {error}</div>}
        </>
      )}
    </div>
  );
}

export default App;
