import React from 'react'

export default function FilmDetails({ currFilm }) {
    return (
        <div className='film-details'>
            {currFilm &&
                <>
                    <h2 className="film-title">{currFilm?.title}</h2>
                    <div className="film-desc">{currFilm?.opening_crawl}</div>
                    <div className="favorite">Set Favorite</div>
                </>
            }
        </div>
    )
}
