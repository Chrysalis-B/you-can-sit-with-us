import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function UniversityPicker(props) {
  const handleChange = event => {
    props.onChange({
      name: event.target.name,
      value: event.target.value
    });
  };
  return (
    <FormControl required>
      <Select
        native
        value={props.universityId}
        onChange={handleChange}
        inputProps={{
          name: "universityId"
        }}
      >
        <option value="" />
        {props.options &&
          props.options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </Select>
      <FormHelperText>Select a university</FormHelperText>
    </FormControl>
  );
}
