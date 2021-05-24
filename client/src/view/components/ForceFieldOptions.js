import ChangeDistance from './ChangeDistance';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

/* function valuetext(value) {
  return `${value}°C`;
}*/

const marks = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '10',
    value: 10,
  },
];

const marks2 = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '10',
    value: 10,
  },
];

const marks3 = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '10',
    value: 10,
  },
];

export default function ForceFieldOptions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <p>Opzioni del grafico FF</p>
        <ChangeDistance />
        <Typography id="min-distance-slider-label" gutterBottom>Distanza minima</Typography>
        <Slider id="min-distance-slider"
            defaultValue={5}
            // getAriaValueText={valuetext}
            aria-labelledby="min-distance-slider-label"
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={0}
            max={10}
        />
        <Typography id="max-distance-slider-label" gutterBottom>Distanza massima</Typography>
        <Slider id="max-distance-slider"
            defaultValue={5}
            // getAriaValueText={valuetext}
            aria-labelledby="max-distance-slider-label"
            valueLabelDisplay="auto"
            step={1}
            marks={marks2}
            min={0}
            max={10}
        />
        <Typography id="force-slider-label" gutterBottom>Forza</Typography>
        <Slider id="force-slider"
            defaultValue={5}
            // getAriaValueText={valuetext}
            aria-labelledby="force-slider-label"
            valueLabelDisplay="auto"
            step={1}
            marks={marks3}
            min={0}
            max={10}
        />
    </div>
  );
}