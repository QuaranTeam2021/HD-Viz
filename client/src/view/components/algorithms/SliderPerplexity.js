
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
    label: '100',
    value: 100,
  },
];
export default function SliderPerplexity({ perplexity, onChange }) {
  const classes = useStyles();

  useEffect(() => {
    onChange("useEffect", perplexity);
  }, [onChange, perplexity]);

  return (
    <div className={classes.root}>
      <Typography id="perplexity-slider-label" gutterBottom>Perplexity</Typography>
      <Slider id="perplexity-slider"
        defaultValue={50}
        aria-labelledby="perplexity-slider-label"
        valueLabelDisplay="auto"
        value={perplexity}
        step={1}
        marks={marks}
        min={2}
        max={100}
        onChangeCommitted={onChange}
      />
    </div>
  );
}