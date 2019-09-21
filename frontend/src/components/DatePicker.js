import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function DatePicker(props) {
  function onDateChange(date) {
    props.onChange({
        name: props.name,
        value: date
    });
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        name={props.name}
        value={props.selectedDate}
        onChange={onDateChange}
        KeyboardButtonProps={{
          "aria-label": `change ${props.label}`
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
