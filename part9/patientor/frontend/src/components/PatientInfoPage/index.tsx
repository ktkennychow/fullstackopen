import { useParams } from 'react-router-dom'
import patientsService from '../../services/patients'
import { Container } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { Entry, Patient } from '../../types'
import assertNever from 'assert-never'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import HospitalEntries from './HospitalEntry'
import HealthCheckEntries from './HealthCheckEntry'
import OccupationalHealthcareEntries from './OccupationalHealthcareEntry'

const EntryDetails = ({entry}: {entry: Entry}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntries entry={entry}/>
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntries entry={entry} />
    case 'HealthCheck':
      return <HealthCheckEntries entry={entry} />
    default:
      return assertNever(entry)
  }
}

const PatitentInfoPage = () => {
  const { id } = useParams()
  const [patientInfo, setPatientInfo] = useState<Patient>()
  useEffect(() => {
    const fetchPatientInfo = async () => {
      const result = await patientsService.getSingle(id as string)
      setPatientInfo(result)
    }
    fetchPatientInfo()
  }, [])

  if (!patientInfo) {
    return <></>
  }

  return (
    <div>
      <Container>
        <h2>
          {patientInfo.name}{' '}
          <span>
            {patientInfo.gender === 'male' ? (
              <MaleIcon />
            ) : patientInfo.gender === 'female' ? (
              <FemaleIcon />
            ) : (
              <QuestionMarkIcon />
            )}
          </span>
        </h2>
        <p>SSN: {patientInfo.ssn}</p>
        <p>Occupation: {patientInfo.occupation}</p>

        <h3>entries</h3>
        <Stack spacing={1}>
          {patientInfo.entries.map((entry) => {
            return (
              <EntryDetails
                key={entry.id}
                entry={entry}
              />
            )
          })}
        </Stack>
      </Container>
    </div>
  )
}

export default PatitentInfoPage
