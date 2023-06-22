import {
  Diagnosis,
  HealthCheckRating,
  NewEntry,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isNumber = (number: unknown): number is number => {
  return typeof number === "number";
};
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};
const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};
const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  console.log(object,typeof object, )

  if (!object || typeof object !== "object" ) {
    console.log(3213)
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object as Array<Diagnosis["code"]>;
};

const ishealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !ishealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
};



const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object 
  ) {
    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newEntry: NewEntry = {
            type: "HealthCheck",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            
            healthCheckRating: parseHealthRating(object.healthCheckRating),
          };
          if ("diagnosisCodes" in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)}
          return newEntry;
        }
        throw new Error("Incorrect or missing health check rating");

      case "Hospital":
        if (
          "discharge" in object &&
          object.discharge &&
          typeof object.discharge === "object" &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        ) {
          const newEntry: NewEntry = {
            type: "Hospital",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            
            discharge: {
              date: parseDate(object.discharge.date),
              criteria: parseCriteria(object.discharge.criteria),
            },

          };
          if ("diagnosisCodes" in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)}
          return newEntry;
        }
        throw new Error("Incorrect or missing discharge information");

      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const newEntry: NewEntry = {
            type: "OccupationalHealthcare",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
          
            employerName: parseEmployerName(object.employerName),
          };
          if ("sickLeave" in object && object.sickLeave && typeof object.sickLeave === "object" && "startDate" in object.sickLeave && "endDate" in object.sickLeave) {
            newEntry.sickLeave = {
              startDate: parseDate(object.sickLeave.startDate),
              endDate: parseDate(object.sickLeave.endDate),
            };
          }
          if ("diagnosisCodes" in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)}
          return newEntry;
        }
        throw new Error("Incorrect or missing employer name");

      default:
        throw new Error("Incorrect or missing type");
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewEntry;
