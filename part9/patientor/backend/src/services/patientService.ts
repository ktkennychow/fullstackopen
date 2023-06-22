import { v1 as uuid } from "uuid";

import patients from "../../data/patients";

import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSinglePatient = (id: string): Patient => {
  const targetPatient = patients.find((patient) => patient.id === id);
  return targetPatient as Patient;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const NewPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(NewPatient);
  return NewPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const targetPatientIndex = patients.findIndex((patient) => patient.id === id);
  const NewEntry = {
    id: uuid(),
    ...entry,
  };

  patients[targetPatientIndex].entries.push(NewEntry);

  return NewEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatient,
  getSinglePatient,
  addEntry,
};
