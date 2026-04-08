import './header.css'

// Cabeçalho fixo da aplicação com identidade visual do projeto.
function Header() {
  return (
    <header className="text-white p-3 shadow-sm">
      <div className="container-fluid">
        <h2>PokéMania</h2>
      </div>
    </header>
  )
}

export default Header