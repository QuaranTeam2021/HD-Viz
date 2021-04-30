
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
    label: '2',
    value: 2,
  },
  {
    label: '10',
    value: 10,
  },
];
export default function SliderSize({ size, onChange }) {
  const classes = useStyles();

  useEffect(() => {
    onChange("useEffect", size);
  }, [onChange, size])

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>Dimensione</Typography>
      <Slider
        defaultValue={5}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={2}
        max={10}
        onChangeCommitted={onChange}
      />
    </div>
  );
}