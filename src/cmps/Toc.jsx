import React from 'react'

export default function Toc({films, setCurrFilm, currFilm, isOpen, setIsOpen}) {
  return (
    <div className={isOpen && window.innerWidth ? 'open toc' : 'toc'} onClick={()=>setIsOpen(false)}>
        {films?.map(film => (
            <div key={film?.episode_id} className={currFilm === film ? "selected film-title" : "film-title"} onClick={()=>setCurrFilm(film)}>
                {film.title}
            </div>
        ))}
    </div>
  )
}
