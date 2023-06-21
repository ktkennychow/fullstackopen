import diagnoses from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getDiagnose = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnose,
  addDiagnose,
};
