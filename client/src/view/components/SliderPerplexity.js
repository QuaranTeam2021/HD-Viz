
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

  const marks = [
    {
      label: '10',
      value: 10,
    },
    {
      label: '50',
      value: 50,
    },
  ];
  export default function SliderSize() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
          <Typography id="discrete-slider" gutterBottom>Perplexity</Typography>
          <Slider
              defaultValue={20}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={10}
              max={50}
          />
      </div>
    );
  }