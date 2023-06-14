import toNewPatientEntry from "../utils";
import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errMsg = "Something went wrong.";
    if (error instanceof Error) {
      errMsg += " Error: " + error.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;
