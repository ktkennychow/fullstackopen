import { useParams } from 'react-router-dom'
import patientsService from '../../services/patients'
import diagnosesService from '../../services/diagnoses'
import { useEffect, useState } from 'react'
import { Diagnosis, Patient } from '../../types'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

const PatitentInfoPage = () => {
  const { id } = useParams()
  const [patientInfo, setPatientInfo] = useState<Patient>()
  const [diagnosesInfo, setDiagnosesInfo] = useState<Diagnosis[]>()
  useEffect(() => {
    const fetchPatientInfo = async () => {
      const result = await patientsService.getSingle(id as string)
      setPatientInfo(result)
    }
    const fetchDiagnosesInfo = async () => {
      const result = await diagnosesService.getAll()
      setDiagnosesInfo(result)
    }
    fetchPatientInfo()
    fetchDiagnosesInfo()
  }, [])

  if (!patientInfo) {
    return <></>
  }
  if (!diagnosesInfo) {
    return <>loading</>
  }
  return (
    <div>
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
      <div>
        {patientInfo.entries.map((entry) => {
          return (
            <div key={entry.id}>
              <p>
                {entry.date} {entry.description}
              </p>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>{code} {diagnosesInfo.find(obj => obj.code === code)?.name}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PatitentInfoPage
