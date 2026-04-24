import DashboardCards from '../dashboardCards/dashboardCards'
import Footer from '../footer/footer'
import Sidebar from '../sidebar/sidebar'

interface DashboardContentProps {
  total: number
  favoritos: number
  time: number
}

function DashboardMain({ total, favoritos, time }: DashboardContentProps) {
  return (
    <section>
      <h1 className="mb-4">Dashboard</h1>
      <DashboardCards
        total={total}
        favoritos={favoritos}
        time={time}
      />
    </section>
  )
}

function DashboardContent({ total, favoritos, time }: DashboardContentProps) {
  return (
    <div className="d-flex flex-column flex-md-row">
      <aside className="bg-light p-3 border-end">
        <Sidebar />
      </aside>

      <div className="flex-grow-1 p-4">
        <DashboardMain
          total={total}
          favoritos={favoritos}
          time={time}
        />
        <Footer />
      </div>
    </div>
  )
}

export default DashboardContent