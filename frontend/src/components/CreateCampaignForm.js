import React, { useState, useEffect, Fragment } from "react";
import axios from "../lib/axios";
import Grid from "@material-ui/core/Grid";
import UniversityPicker from "./UniversityPicker";
import DatePicker from "./DatePicker";
import DiscountSelector from "./DiscountSelector";

function CreateCampaignForm() {
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("/campaigns/create");
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
    endDate: new Date(Date.now() + 12096e5),
    discounts: [
      {
        discountId: 0,
        minPeople: 10,
        discount: 10
      },
      {
        discountId: 1,
        minPeople: 20,
        discount: 20
      },
      {
        discountId: 2,
        minPeople: 30,
        discount: 30
      },
      {
        discountId: 3,
        minPeople: 50,
        discount: 50
      }
    ]
  });

  function handleChange(event) {
    if (event.hasOwnProperty("discountId")) {
      let newDiscounts = [...values.discounts];
      newDiscounts[event.discountId] = {
        ...newDiscounts[event.discountId],
        [event.name]: event.value
      };
      setFormValues(oldValues => ({
        ...oldValues,
        discounts: [...newDiscounts]
      }));
    } else {
      setFormValues(oldValues => ({
        ...oldValues,
        [event.name]: event.value
      }));
    }
  }

  return (
    <Fragment>
      <h1>Create new Campaign</h1>
      <form autoComplete="off">
        <Grid container direction="column">
          <UniversityPicker
            university={values.university}
            options={options}
            onChange={handleChange}
          />
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
          <DiscountSelector
            onChange={handleChange}
            discounts={values.discounts}
          />
        </Grid>
      </form>
    </Fragment>
  );
}

export default CreateCampaignForm;
