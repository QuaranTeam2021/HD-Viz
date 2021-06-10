/* eslint-disable no-underscore-dangle */
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const Dataset = ({ onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="insert-dataset">
      <input
        accept=".csv, .tsv"
        className={classes.input}
        id="dataset-button"
        type="file"
        onChange={onChange}
      />
      <label htmlFor="dataset-button">
        <IconButton variant="contained" color="primary" component="span" >
          <AddIcon/>
        </IconButton>
      </label>
    </div>
  );
};

export default Dataset;