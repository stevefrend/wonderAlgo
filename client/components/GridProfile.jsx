import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { List, ListItem } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

const styles = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10, height: 545 },
};

export default (props) => {
  const [bestTimes, setBestTimes] = useState([]);

  const getData = async () => {
    try {
      await fetch(`http://localhost:3000/getResults/${props.userId}`) //! change to ${user_id}
        .then((result) => result.json())
        .then((data) => {
          const bestFive = [data[0], data[1], data[2], data[3], data[4]];
          setBestTimes(bestFive);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const highScores = bestTimes.map((entry) => {
    return (
      <ListItem key={entry.id} divider={true}>
        {entry.algo_name} --- {entry.time} seconds
      </ListItem>
    );
  });

  return (
    <Grid container justify='center'>
      <Grid item sm>
        <Paper style={styles}>
          <h1>HIGHSCORES</h1>
          <List>
            {highScores}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};
