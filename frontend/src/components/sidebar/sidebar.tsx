import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TrainerSelector from '../trainerSelector/trainerSelector'
import '../../style/sidebar.css'
import '../../style/trainerSelector.css'

const THEME_STORAGE_KEY = 'poke-mania-theme'
type ThemeMode = 'light' | 'dark'

function Sidebar() {
    const location = useLocation()
    const [theme, setTheme] = useState<ThemeMode>('light')
    const isDarkMode = theme === 'dark'

    useEffect(() => {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
        const nextTheme: ThemeMode = savedTheme === 'dark' ? 'dark' : 'light'

        setTheme(nextTheme)
        document.body.classList.toggle('dark-mode', nextTheme === 'dark')
    }, [])

    function handleToggleTheme() {
        setTheme((currentTheme) => {
            const nextTheme: ThemeMode = currentTheme === 'dark' ? 'light' : 'dark'
            document.body.classList.toggle('dark-mode', nextTheme === 'dark')
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)

            return nextTheme
        })
    }

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src="/pokemanialogo.png" alt="PokéMania" />
            </div>

            <TrainerSelector />

            <ul className="sidebar-menu">
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/">
                        <i className="bi bi-clipboard-data"></i>
                        Dashboard
                    </Link>
                </li>

                <li className={location.pathname === '/pokemons' ? 'active' : ''}>
                    <Link to="/pokemons">
                        <i className="bi bi-grid"></i>
                        Pokémons
                    </Link>
                </li>

                <li className={location.pathname === '/my-team' ? 'active' : ''}>
                    <Link to="/my-team">
                        <i className="bi bi-people"></i>
                        Meus Times
                    </Link>
                </li>

                <li className={location.pathname === '/favorites' ? 'active' : ''}>
                    <Link to="/favorites">
                        <i className="bi bi-heart"></i>
                        Favoritos
                    </Link>
                </li>

                <li className={location.pathname === '/who-is-that-pokemon' ? 'active' : ''}>
                    <Link to="/who-is-that-pokemon">
                        <i className="bi bi-question-circle"></i>
                        Quem é esse Pokémon?
                    </Link>
                </li>

                <button
                type="button"
                className="sidebar-theme-toggle"
                onClick={handleToggleTheme}
                aria-pressed={isDarkMode}
            >
                <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
                {isDarkMode ? '' : ''}
            </button>
            </ul>
        </div>
    )
}

export default Sidebar