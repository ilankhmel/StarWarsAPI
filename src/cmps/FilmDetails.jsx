import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { filmService } from '../services/film.service';

export default function FilmDetails({ currFilm, setFavorite }) {


    return (
        <>
            {
                //bc3082c6
                currFilm &&
                <div className='film-details'>

                    <div className="left">
                        <div className="top">
                            <h2 className="film-title">{currFilm?.title}</h2>
                            <div className="favorite" onClick={() => setFavorite(currFilm?.episode_id)}>{currFilm?.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
                        </div>
                        <div className="film-desc">{currFilm?.opening_crawl}</div>
                        {/* {poster && <img className='film-poster' src={poster} alt="" />} */}
                        <div className="info">
                            <div className="director">Directed by: {currFilm?.director}</div>
                            <div className="release">Released at: {currFilm?.release_date}</div>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
