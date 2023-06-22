import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import { Button, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Entry, EntryFormValues, Patient } from "../../types";
import assertNever from "assert-never";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import HospitalEntries from "./HospitalEntry";
import HealthCheckEntries from "./HealthCheckEntry";
import OccupationalHealthcareEntries from "./OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntries entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntries entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntries entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatitentInfoPage = () => {
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const fetchPatientInfo = async () => {
      const result = await patientsService.getSingle(id as string);
      setPatientInfo(result);
      console.log(patientInfo);
    };
    fetchPatientInfo();
  }, [entries]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientsService.addEntry(values, id as string);
      setEntries(entries.concat(entry));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patientInfo) {
    return <></>;
  }

  return (
    <div>
      <Container>
        <h2>
          {patientInfo.name}{" "}
          <span>
            {patientInfo.gender === "male" ? (
              <MaleIcon />
            ) : patientInfo.gender === "female" ? (
              <FemaleIcon />
            ) : (
              <QuestionMarkIcon />
            )}
          </span>
        </h2>
        <p>SSN: {patientInfo.ssn}</p>
        <p>Occupation: {patientInfo.occupation}</p>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
        <h3>entries</h3>
        <Stack spacing={1}>
          {patientInfo.entries.map((entry) => {
            return <EntryDetails key={entry.id} entry={entry} />;
          })}
        </Stack>
      </Container>
    </div>
  );
};

export default PatitentInfoPage;
