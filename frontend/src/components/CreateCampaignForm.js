import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import Grid from '@material-ui/core/Grid';
import DatePicker from "./DatePicker";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function CreateCampaignForm() {
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`/campaigns/create`);
        setOptions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUniversities();
  }, []);

  const [options, setOptions] = useState({ universities: [] });

  const [values, setFormValues] = useState({
    university: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 12096e5)
  });

  console.log(values);

  function handleChange(event) {
    setFormValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <div>
      <h1>Create new Campaign</h1>
      <form autoComplete="off">
        <Grid container direction="column">
        <FormControl>
          <InputLabel htmlFor="university">University</InputLabel>
          <Select
            value={values.university}
            onChange={handleChange}
            inputProps={{
              name: "university"
            }}
          >
            {options.universities.map(university => (
              <MenuItem key={university.id} value={university.name}>
                {university.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a university</FormHelperText>
        </FormControl>
        <DatePicker
          onChange={handleChange}
          selectedDate={values.startDate}
          label="Start Date"
          name="startDate"
        />
        <DatePicker
          onChange={handleChange}
          selectedDate={values.endDate}
          label="End Date"
          name="endDate"
        />
        </Grid>
      </form>
    </div>
  );
}

export default CreateCampaignForm;
