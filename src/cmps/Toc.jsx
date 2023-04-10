import React from 'react'

export default function Toc({films, setCurrFilm}) {
  return (
    <div className='toc'>
        {films?.map(film => (
            <div key={film?.episode_id} className="film-title" onClick={()=>setCurrFilm(film)}>
                {film.title}
            </div>
        ))}
    </div>
  )
}
