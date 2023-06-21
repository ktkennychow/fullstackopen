import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import { useEffect, useState } from 'react'
import diagnosesService from '../../services/diagnoses'
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../types'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, orange, red, yellow } from '@mui/material/colors';
import assertNever from 'assert-never';

const HealthRating = ({rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 3:
      return <FavoriteIcon sx={{color: red[500]}} />
    case 2:
      return <FavoriteIcon sx={{color: orange[500]}} />
    case 1:
      return <FavoriteIcon sx={{color: yellow[500]}} />
    case 0:
      return <FavoriteIcon sx={{color: green[500]}} />
    default:
      return null
  }
}

const HealthCheckEntries = ({ entry }: { entry: HealthCheckEntry }) => {
  const [diagnosesInfo, setDiagnosesInfo] = useState<Diagnosis[]>()
  useEffect(() => {
    const fetchDiagnosesInfo = async () => {
      const result = await diagnosesService.getAll()
      setDiagnosesInfo(result)
    }
    fetchDiagnosesInfo()
  }, [])

  if (!diagnosesInfo) {
    return <>loading</>
  }
  return (
    <div
      style={{
        border: '0.25rem solid black',
        borderRadius: '1rem',
        padding: '10px',
      }}
      key={entry.id}>
      <p>
        {entry.date} <AssignmentTurnedInIcon />{' '}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <HealthRating rating={entry.healthCheckRating}/>
      <p>diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            {code} {diagnosesInfo.find((obj) => obj.code === code)?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HealthCheckEntries