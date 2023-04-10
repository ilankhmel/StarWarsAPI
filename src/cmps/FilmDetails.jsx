import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function FilmDetails({ currFilm, setFavorite }) {
    return (
        <>
            {
                currFilm &&
                <div className='film-details'>

                    <div className="left">
                        <h2 className="film-title">{currFilm?.title}</h2>
                        <div className="film-desc">{currFilm?.opening_crawl}</div>
                    </div>
                    <div className="favorite" onClick={() => setFavorite(currFilm?.episode_id)}>{currFilm?.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>

                </div>
            }
        </>
    )
}
