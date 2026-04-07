import DashboardCards from '../components/dashboardCards/dashboardCards'

interface DashboardProps {
  total: number
  favoritos: number
  time: number
  analisados: number
}

function Dashboard({ total, favoritos, time, analisados }: DashboardProps) {
  return (
    <section className="p-4">
      <h1 className="mb-4">Dashboard</h1>

      <DashboardCards
        total={total}
        favoritos={favoritos}
        time={time}
        analisados={analisados}
      />
    </section>
  )
}

export default Dashboard