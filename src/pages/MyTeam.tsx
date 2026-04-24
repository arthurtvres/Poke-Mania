import { type Dispatch, type SetStateAction } from 'react'
import MyTeamContent from '../components/pageContent/myTeamContent'
import type { ITeam } from '../interfaces/ITeam'

interface MyTeamProps {
    teams: ITeam[]
    setTeams: Dispatch<SetStateAction<ITeam[]>>
}

function MyTeam(props: MyTeamProps) {
  return <MyTeamContent {...props} />
}

export default MyTeam