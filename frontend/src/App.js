import React from "react";
import CreateCampaignForm from "./create-campaign-form";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </ul>
          </nav>

          <Route path="/create" exact component={CreateCampaignForm} />
        </div>
      </Router>
    </div>
  );
}

export default App;
