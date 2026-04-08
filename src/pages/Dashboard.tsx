import DashboardCards from '../components/dashboardCards/dashboardCards'

interface DashboardProps {
  total: number
  favoritos: number
  time: number
  analisados: number
}

// Página de dashboard que agrupa os cards de indicadores gerais.
function Dashboard({ total, favoritos, time}: DashboardProps) {
  return (
    <section className="p-4">
      <h1 className="mb-4">Dashboard</h1>

      <DashboardCards
        total={total}
        favoritos={favoritos}
        time={time}
      />
    </section>
  )
}

export default Dashboard