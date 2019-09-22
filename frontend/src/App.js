import React from "react";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CreateCampaignForm from "./components/CreateCampaignForm";
import JoinCampaignForm from "./components/JoinCampaignForm";
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Box m={10}>
      <Router>
        <Container maxWidth="sm">
          <Route path="/create" component={CreateCampaignForm} />
          <Route path="/campaign" component={JoinCampaignForm} />
        </Container>
      </Router>
    </Box>
  );
}

export default App;
