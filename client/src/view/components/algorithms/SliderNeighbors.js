
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    label: '300',
    value: 300,
  },
];
export default function SliderNeighbours({ neighbours, onChange }) {
  const classes = useStyles();

  useEffect(() => {
    onChange("useEffect", neighbours);
  }, [onChange, neighbours]);

  return (
    <div className={classes.root}>
      <Typography id="neighbors-slider-label" gutterBottom>Neighbors</Typography>
      <Slider id="neighbors-slider"
        defaultValue={20}
        aria-labelledby="neighbors-slider-label"
        valueLabelDisplay="auto"
        value={neighbours}
        step={1}
        marks={marks}
        min={10}
        max={300}
        onChangeCommitted={onChange}
      />
    </div>
  );
}