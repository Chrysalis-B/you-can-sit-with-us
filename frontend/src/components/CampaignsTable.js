import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(2)
  },
  link: {
    textDecoration: "none"
  }
}));

function CampaignsTable() {
  const classes = useStyles();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/campaigns");
        console.log(response.data);
        setTableData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaigns();
  }, []);

  const [tableData, setTableData] = useState([]);

  return (
    <Fragment>
      {tableData.length === 0 && (
        <p>No campaigns yet! Why don't you create one.</p>
      )}
      <Link to="/create" className={classes.link}>
        <Button
          className={classes.button}
          size="medium"
          type="submit"
          variant="contained"
          color="secondary"
        >
          Create New Campaign
        </Button>
      </Link>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>University Name</TableCell>
              <TableCell>Students Participating</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.campaignId}>
                <TableCell>{row.universityName}</TableCell>
                <TableCell>{row.studentsTotal}</TableCell>
                <TableCell>{new Date(row.startDate).toDateString()}</TableCell>
                <TableCell>{new Date(row.endDate).toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
}

export default CampaignsTable;
