import DashboardContent from '../components/pageContent/dashboardContent'

interface DashboardProps {
  total: number
  favoritos: number
  time: number
  bestScore: number | null
  gamesPlayed: number
}

function Dashboard(props: DashboardProps) {
  return <DashboardContent {...props} />
}

export default Dashboard
