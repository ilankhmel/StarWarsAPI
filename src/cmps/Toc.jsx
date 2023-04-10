import React from 'react'

export default function Toc({films, setCurrFilm, currFilm}) {
  return (
    <div className='toc'>
        {films?.map(film => (
            <div key={film?.episode_id} className={currFilm === film ? "selected film-title" : "film-title"} onClick={()=>setCurrFilm(film)}>
                {film.title}
            </div>
        ))}
    </div>
  )
}
