import React from "react";
import Box from "@material-ui/core/Box";
import CreateCampaignForm from "./components/CreateCampaignForm";
import JoinCampaignForm from "./components/JoinCampaignForm";
import CampaignsTable from "./components/CampaignsTable";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Box m={10}>
      <Router>
      <Route path="/" exact component={CampaignsTable} />
        <Route path="/campaign" component={JoinCampaignForm} />
        <Route path="/create" component={CreateCampaignForm} />
      </Router>
    </Box>
  );
}

export default App;
