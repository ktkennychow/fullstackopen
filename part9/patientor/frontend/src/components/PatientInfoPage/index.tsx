import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import { useEffect, useState } from 'react'
import { Patient } from '../../types'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { QuestionMark } from '@mui/icons-material'

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

  console.log(patientInfo?.gender)
  if (!patientInfo) {
    return <></>
  }
  return (
    <div>
      <h2 >
        {patientInfo.name}{' '}
        <span>
          {patientInfo.gender === 'male'
            ? <MaleIcon />
            : patientInfo.gender === 'female' ? <FemaleIcon/> : <QuestionMarkIcon />}
        </span>
      </h2>
      <p>SSN: {patientInfo.ssn}</p>
      <p>Occupation: {patientInfo.occupation}</p>
    </div>
  )
}

export default PatitentInfoPage
