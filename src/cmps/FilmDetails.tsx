import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { film } from "../modules/film.module";

type filmDetailsProps = {
  currFilm: film | null;
  setFavorite: Function;
};

export default function FilmDetails({
  currFilm,
  setFavorite,
}: filmDetailsProps) {
  return (
    <div className="film-details">
      {currFilm && (
        <div className="left">
          <div className="top">
            <h2 className="film-title">{currFilm?.title}</h2>
            <div
              className="favorite"
              onClick={() => setFavorite(currFilm?.episode_id)}
            >
              {currFilm?.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </div>
          </div>
          <div className="film-desc">{currFilm?.opening_crawl}</div>
          <div className="info">
            <div className="director">Directed by: {currFilm?.director}</div>
            <div className="release">Released at: {currFilm?.release_date}</div>
          </div>
        </div>
      )}
    </div>
  );
}
