import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import Grid from "@material-ui/core/Grid";
import UniversityPicker from "./UniversityPicker";
import DatePicker from "./DatePicker";
import DiscountSelector from "./DiscountSelector";
import Button from "@material-ui/core/Button";

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

  const [options, setOptions] = useState([]);
  console.log(options);

  const [values, setFormValues] = useState({
    universityId: "",
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

  const [campaignUrl, setCampaignUrl] = useState();

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

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const result = await axios.post("/campaigns/create", values);
      setCampaignUrl(result.data.campaignUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <h1>Create new Campaign</h1>
      <form autoComplete="off" action="submit" method="post" onSubmit={handleSubmit}>
        <Grid container direction="column">
          <UniversityPicker
            universityId={values.universityId}
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
          {campaignUrl && (
            <p>
              Great! Here is the link to the newly created campaign:{" "}
              <Link to={campaignUrl}>{campaignUrl}</Link>
            </p>
          )}
          <Button
            size="medium"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Fragment>
  );
}

export default CreateCampaignForm;
