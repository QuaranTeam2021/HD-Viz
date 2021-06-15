
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
    label: '5',
    value: 5,
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
        defaultValue={2}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        value={size}
        step={1}
        marks={marks}
        min={2}
        max={5}
        onChangeCommitted={onChange}
      />
    </div>
  );
}