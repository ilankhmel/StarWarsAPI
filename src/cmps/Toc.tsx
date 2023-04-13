import React from "react";
import { useNavigate } from "react-router-dom";
import { film } from "../modules/film.module";

type tocProps = {
  films: film[];
  currFilm: film | null;
  isOpen: Boolean;
  setIsOpen: Function;
};

export default function Toc({ films, currFilm, isOpen, setIsOpen }: tocProps) {
  const navigate = useNavigate();

  return (
    <div
      className={isOpen && window.innerWidth ? "open toc" : "toc"}
      onClick={() => setIsOpen(false)}
    >
      {films?.map((film) => (
        <div
          key={film?.episode_id.toString()}
          className={currFilm === film ? "selected film-title" : "film-title"}
          onClick={() => navigate(`/${film?.episode_id}`)}
        >
          {film?.title}
        </div>
      ))}
    </div>
  );
}
