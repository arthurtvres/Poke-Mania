import { useState } from 'react'
import '../../style/pokemonCard.css'
import type { IPokemonCardProps } from '../../interfaces/IPokemonCardProps'
import { typeIcons } from '../../utils/typeIcons'

// Exibe um pokémon individual com ações de favoritar e adicionar ao time.
function PokemonCard({ name, image, types, number, onFavorite, onAddToTeam, isFavorite }: IPokemonCardProps) {

    
    // Alterna o status de favorito localmente e notifica o componente pai.
    function handleFavoriteClick() {
        onFavorite({
            name,
            image,
            number,
            types,
        })
    }
    const [inTeam, setInTeam] = useState(false)

    // Alterna o estado visual de "no time" e envia os dados do pokémon para inclusão.
    function handleTeamClick() {
        const newValue = !inTeam
        setInTeam(newValue)
        onAddToTeam({
            name,
            image,
            number,
            types,

        })
    }

    return (
        <div className="card shadow-sm border-0 h-100 pokemon-card">
            <img
                src={image}
                className="card-img-top"
                alt={name}
            />

            <div className="card-body text-center">
                <h5 className="card-title">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </h5>
                <p className="card-text text-muted">#{number}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {types.map((type) => (
                            <span key={type} className={`type-badge ${type.toLowerCase()}`}>
                                <img
                                    src={typeIcons[type]}
                                    alt={type}
                                    title={type}
                                />
                                {type}
                            </span>
                        ))}
                    </div>
                </li>
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