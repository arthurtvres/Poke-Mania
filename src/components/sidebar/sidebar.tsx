import { Link, useLocation } from 'react-router-dom'
import '../../style/sidebar.css'

function Sidebar() {
  const location = useLocation()

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <img src="/pokemanialogo.png" alt="PokéMania" />
      </div>

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
      </ul>
    </div>
  )
}

export default Sidebar