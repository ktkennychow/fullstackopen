import toNewPatient from "../utils/toNewPatient";
import express from "express";
import patientService from "../services/patientService";
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});
router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  res.send(patientService.getSinglePatient(id));
});

router.post("/", (req, res) => {
  try {
    const NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(NewPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errMsg = "Something went wrong.";
    if (error instanceof Error) {
      errMsg += " Error: " + error.message;
    }
    res.status(400).send(errMsg);
  }
});

router.post("/:id/entries", (req, res) => {
    const id: string = req.params.id;
  try {
    const NewEntry = toNewEntry(req.body);
    console.log(1111,NewEntry)
    const addedEntry = patientService.addEntry(NewEntry, id);
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
