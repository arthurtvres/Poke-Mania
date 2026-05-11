import MyTeamContent from '../components/pageContent/myTeamContent'
import type { ITeam } from '../interfaces/ITeam'

interface MyTeamProps {
  teams: ITeam[]
  onCreateTeam: (name: string) => Promise<void> | void
  onDeleteTeam: (teamId: number) => void
  onRemovePokemon: (teamId: number, pokemonNumber: number) => void
}

function MyTeam(props: MyTeamProps) {
  return <MyTeamContent {...props} />
}

export default MyTeam
