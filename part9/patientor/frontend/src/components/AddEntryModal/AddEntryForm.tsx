import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { EntryFormValues, HealthCheckRating } from "../../types";

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
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [entryType, setEntryType] = useState(entryTypes[0]);

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
        onSubmit({
          type: entryType,
          description,
          date,
          specialist,
          healthCheckRating,
        });
        break;
        case "Hospital":
          onSubmit({
            type: entryType,
            description,
            date,
            specialist,
            discharge:{
              date: dischargeDate,
              criteria: dischargeCriteria
            },
          });
          break;
      case "OccupationalHealthcare":
        onSubmit({
          type: entryType,
          description,
          date,
          specialist,
          employerName,
          sickLeave: {
            startDate: startDate,
            endDate: endDate,
          }
        });
    }
    
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
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
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {entryType === "HealthCheck" ? (
          <>
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating
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
            <TextField
              label="discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="discharge criteria"
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
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="start date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <TextField
              label="end date"
              placeholder="YYYY-MM-DD"
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
// ToDo: 9.28 - add field for diagnoseCodes, error handling for invaild values