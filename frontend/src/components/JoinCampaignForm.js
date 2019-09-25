import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function JoinCampaignForm() {
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const url = new URL(window.location.href);
        const id = new URLSearchParams(url.search).get("campaignId");
        const response = await axios.get(`/campaigns/${id}`);
        setCampaignInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaign();
  }, []);

  const [campaignInfo, setCampaignInfo] = useState({});

  const [values, setFormValues] = useState({
    name: "",
    email: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = event => {
    const values = {
      [event.target.name]: event.target.value
    };
    setFormValues(oldValues => ({
      ...oldValues,
      ...values
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/campaigns/${campaignInfo.campaignId}`,
        values
      );
      setSuccess(response.data.success);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h1>
        Join the campaign for <span>{campaignInfo.universityName}</span>{" "}
      </h1>
      <Grid container spacing={2}>
        <Grid item>
          <p>
            Fill out the form to join this campaign and get an exlusive
            discount!
          </p>
          <p>Be sure to share this link with your friends.</p>
          <p>The more people join, the bigger the discount.</p>
          <p>
            The campaign ends on{" "}
            <strong>{new Date(campaignInfo.endDate).toDateString()}</strong>.
          </p>
          <p>
            So far <strong>{campaignInfo.studentsTotal}</strong> student/s
            participating.
          </p>
          <h4>Discounts available</h4>
          <ul>
            {campaignInfo.discounts &&
              campaignInfo.discounts.map(discount => {
                return (
                  <li key={discount.discountId}>
                    {discount.minPeople}+ people: {discount.discount}% discount
                  </li>
                );
              })}
          </ul>
        </Grid>
        <Grid item>
          <form
            autoComplete="off"
            action="submit"
            method="post"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Name"
              inputProps={{
                name: "name"
              }}
              value={values.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email"
              inputProps={{
                name: "email"
              }}
              value={values.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            {success && <p>Thank you for joining!</p>}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default JoinCampaignForm;
