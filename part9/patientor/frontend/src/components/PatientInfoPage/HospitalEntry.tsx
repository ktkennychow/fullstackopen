import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, HospitalEntry } from "../../types";

const HospitalEntries = ({ entry }: { entry: HospitalEntry }) => {
  const [diagnosesInfo, setDiagnosesInfo] = useState<Diagnosis[]>();
  useEffect(() => {
    const fetchDiagnosesInfo = async () => {
      const result = await diagnosesService.getAll();
      setDiagnosesInfo(result);
    };
    fetchDiagnosesInfo();
  }, []);

  if (!diagnosesInfo) {
    return <>loading</>;
  }
  return (
    <div
      style={{
        border: "0.25rem solid black",
        borderRadius: "1rem",
        padding: "10px",
      }}
      key={entry.id}
    >
      <p>
        {entry.date} <LocalHospitalIcon />{" "}
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
      {entry.discharge ? (
        <>
          <p>discharge:</p>
          <p>date: {entry.discharge.date}</p>
          <p>criteria: {entry.discharge.criteria}</p>
        </>
      ) : null}
    </div>
  );
};

export default HospitalEntries;
