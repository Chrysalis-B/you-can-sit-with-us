import React, { useState, useEffect, Fragment } from "react";
import axios from "../lib/axios";
import Grid from "@material-ui/core/Grid";

function JoinCampaignForm() {
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const url = new URL(window.location.href);
        const id = new URLSearchParams(url.search).get("campaignId");
        const response = await axios.get(`/campaigns/${id}`);
        console.log("Response----------", response);
        setCampaignInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaign();
  }, []);

  const [campaignInfo, setCampaignInfo] = useState({});

  return (
    <Fragment>
      <h1>
        Join the campaign for <span>{campaignInfo.universityName}</span>{" "}
      </h1>
      <Grid>
          <div>
              <p>Fill out the form to join this campaign and get an exlusive discount!</p>
              <p>Be sure to share this link with your friends. The more people join, the bigger the discount.</p>
              <p>The campaign ends on <strong>{new Date(campaignInfo.endDate).toDateString()}</strong>.</p>
              <p>So far <strong>{campaignInfo.studentsTotal}</strong> student/s participating.</p>
              <h4>Discounts available</h4>
              <ul>
                  {campaignInfo.discounts && campaignInfo.discounts.map(discount => {
                      return (
                          <li key={discount.discountId}>{discount.minPeople}+ people: {discount.discount}% discount</li>
                      )
                  })}
              </ul>
          </div>
          <form></form>
      </Grid>
    </Fragment>
  );
}

export default JoinCampaignForm;
