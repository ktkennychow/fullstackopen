import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import { useEffect, useState } from 'react'
import { Patient } from '../../types'

const PatitentInfoPage = () => {
  const { id } = useParams()
  const [patientInfo, setPatientInfo] = useState<Patient>()
  useEffect(() => {
    const fetchPatientInfo = async () => {
      const result = await patientService.getSingle(id as string)
      setPatientInfo(result)
    }
    fetchPatientInfo()
  }, [])
  if (!patientInfo) {
    return <></>
  }
  return (
    <div>
      <h2>{patientInfo.name}</h2>
      <p>Gender: {patientInfo.gender}</p>
      <p>SSN: {patientInfo.ssn}</p>
      <p>Occupation: {patientInfo.occupation}</p>
    </div>
  )
}

export default PatitentInfoPage
