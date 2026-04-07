import { useState } from 'react'
import './pokemonCard.css'
import type { IPokemonCardProps } from '../../interfaces/IPokemonCardProps'

function PokemonCard({ name, image, types, number, onFavorite, onAddToTeam }: IPokemonCardProps) {

    const [isFavorite, setIsFavorite] = useState(false)
    function handleFavoriteClick() {
        const newValue = !isFavorite
        setIsFavorite(newValue)

        onFavorite(newValue)
    }

    const [inTeam, setInTeam] = useState(false)
    function handleTeamClick() {
        const newValue = !inTeam
        setInTeam(newValue)
        onAddToTeam(newValue)
    }

    return (
        <div className="card shadow-sm border-0 h-100 pokemon-card">
            <img
                src={image}
                className="card-img-top"
                alt={name}
            />

            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
                <p className="card-text text-muted">#{number}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">Tipo: {types}</li>
            </ul>

            <div className="card-body text-center card-action">
                <button
                    className='icon-btn team'
                    title='Adicionar ao Time'
                    onClick={handleTeamClick}
                >
                    <i className={`bi ${inTeam ? 'bi-check-circle-fill' : 'bi-plus-circle'}`}></i>
                </button>

                {/* Button favoritar pokemon */}
                <button
                    className='icon-btn favorite'
                    title='Favoritar Pokémon'
                    onClick={handleFavoriteClick}
                >
                    <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>
            </div>
        </div>
    )
}

export default PokemonCard