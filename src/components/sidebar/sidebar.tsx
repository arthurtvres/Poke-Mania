import { Link, useLocation } from 'react-router-dom'
import './sidebar.css'

// Menu lateral de navegação com destaque automático da rota ativa.
function Sidebar() {
  const location = useLocation()

  return (
    <div className="sidebar">
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
      </ul>
    </div>
  )
}

export default Sidebar