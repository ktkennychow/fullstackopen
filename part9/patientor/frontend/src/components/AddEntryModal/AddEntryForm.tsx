import { useState, SyntheticEvent, useEffect } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
} from "@mui/material";

import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((v) => !isNaN(Number(v)))
  .map((v) => ({
    value: v as HealthCheckRating,
    label: v.toString(),
  }));

const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
interface EntryTypeOption {
  value: string;
  label: string;
}
const entryTypeOptions: EntryTypeOption[] = entryTypes.map((v) => ({
  value: v,
  label: v,
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [entryType, setEntryType] = useState(entryTypes[0]);
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

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(
        (g) => g === value
      );
      if (healthCheckRating) {
        setHealthCheckRating(healthCheckRating as HealthCheckRating);
      }
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    if (typeof event.target.value === "object") {
      const value = event.target.value;
      setDiagnosisCodes(value);
    }
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = entryTypes.find((g) => g === value);
      if (entryType) {
        setEntryType(entryType);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case "HealthCheck":
        const newHealthCheckEntry: EntryFormValues = {
          type: entryType,
          description,
          date,
          specialist,
          healthCheckRating,
        };
        if (diagnosisCodes.length > 0) {
          newHealthCheckEntry.diagnosisCodes = diagnosisCodes;
        }
        onSubmit(newHealthCheckEntry);
        break;
      case "Hospital":
        const newHospitalEntry: EntryFormValues = {
          type: entryType,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        if (diagnosisCodes.length > 0) {
          newHospitalEntry.diagnosisCodes = diagnosisCodes;
        }
        onSubmit(newHospitalEntry);
        break;
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry: EntryFormValues = {
          type: entryType,
          description,
          date,
          specialist,
          employerName,
        };
        if (diagnosisCodes.length > 0) {
          newOccupationalHealthcareEntry.diagnosisCodes = diagnosisCodes;
        }
        if (startDate && endDate) {
          newOccupationalHealthcareEntry.sickLeave = {
            startDate: startDate,
            endDate: endDate,
          };
        }
        onSubmit(newOccupationalHealthcareEntry);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ fontWeight: "bold" }}>Date *</InputLabel>
        <Input
          type="date"
          fullWidth
          required
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20, fontWeight: "bold" }}>
          Entry type *
        </InputLabel>
        <Select
          label="entry type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="description"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20, fontWeight: "bold" }}>
          Diagnose Codes
        </InputLabel>
        <Select
          label="diagnosisCodes"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
        >
          {diagnosesInfo.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.code}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20, fontWeight: "bold" }}>
          Details
        </InputLabel>
        {entryType === "HealthCheck" ? (
          <>
            <InputLabel style={{ fontWeight: "bold" }}>
              Health Check Rating *
            </InputLabel>
            <Select
              label="healthCheckRating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : entryType === "Hospital" ? (
          <>
            <InputLabel style={{ fontWeight: "bold" }}>Discharge</InputLabel>
            <InputLabel>Date *</InputLabel>
            <Input
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <InputLabel>Criteria *</InputLabel>
            <TextField
              label="date"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        ) : entryType === "OccupationalHealthcare" ? (
          <>
            <TextField
              label="employer name"
              fullWidth
              required
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ fontWeight: "bold" }}>Sick leave</InputLabel>
            <InputLabel>Start date</InputLabel>
            <Input
              type="date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel>End date</InputLabel>
            <Input
              type="date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </>
        ) : null}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
