import '../../style/header.css'

function Header() {
  return (
    <header className="text-white p-3 shadow-sm">
      <div className="container-fluid">
        <div className="header-brand">
          <img
            src="/pokemanialogo.png"
            alt="Logo PokéMania"
            className="header-logo"
          />
        </div>
      </div>
    </header>
  )
}

export default Header