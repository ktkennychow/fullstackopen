import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import { useEffect, useState } from 'react'
import diagnosesService from '../../services/diagnoses'
import { Diagnosis, OccupationalHealthcareEntry } from '../../types'

const OccupationalHealthcareEntries = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry
}) => {
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
        {entry.date} <MedicalInformationIcon /> {entry.employerName}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <p>diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            {code} {diagnosesInfo.find((obj) => obj.code === code)?.name}
          </li>
        ))}
      </ul>
      {entry.sickLeave ? (
        <div>
          <p>sick leave:</p>
          <p>start date: {entry.sickLeave.startDate}</p>
          <p>end date: {entry.sickLeave.endDate}</p>
        </div>
      ) : null}
    </div>
  )
}

export default OccupationalHealthcareEntries
