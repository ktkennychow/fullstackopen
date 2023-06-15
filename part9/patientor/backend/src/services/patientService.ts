import { v1 as uuid } from "uuid";

import patients from "../../data/patients";

import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSingleEntry = (id: string): Patient => {
  const targetPatient = patients.find((patient) => patient.id === id);
  return targetPatient as Patient
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getSingleEntry,
};
