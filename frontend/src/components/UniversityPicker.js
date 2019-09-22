import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function UniversityPicer(props) {
  const handleChange = event => {
    props.onChange({
      name: event.target.name,
      value: event.target.value
    });
  };
  return (
    <FormControl>
      <InputLabel htmlFor="university">University</InputLabel>
      <Select
        value={props.universityId}
        onChange={handleChange}
        inputProps={{
          name: "universityId"
        }}
      >
        {props.options.universities.map(university => (
          <MenuItem key={university.id} value={university.id}>
            {university.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select a university</FormHelperText>
    </FormControl>
  );
}
