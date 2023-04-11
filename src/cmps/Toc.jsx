import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Toc({ films, currFilm, isOpen, setIsOpen }) {

    const navigate = useNavigate()

    return (
        <div className={isOpen && window.innerWidth ? 'open toc' : 'toc'} onClick={() => setIsOpen(false)}>
            {films?.map(film => (
                <div key={film?.episode_id} className={currFilm === film ? "selected film-title" : "film-title"} onClick={() => navigate(`/${film?.episode_id}`)}>
                    {film.title}
                </div>
            ))}
        </div>
    )
}
