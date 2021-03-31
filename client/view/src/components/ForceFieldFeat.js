import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ChangeDistance from './ChangeDistance';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

/*function valuetext(value) {
  return `${value}°C`;
}*/

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
];

const marks2 = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
];

const marks3 = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
];

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <p>Opzioni del grafico FF</p>
        <ChangeDistance />
        <Typography id="discrete-slider" gutterBottom>Distanza minima</Typography>
        <Slider
            defaultValue={5}
            //getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={0}
            max={10}
        />
        <Typography id="discrete-slider" gutterBottom>Distanza massima</Typography>
        <Slider id="slider-2"
            defaultValue={5}
            //getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={marks2}
            min={0}
            max={10}
        />
        <Typography id="discrete-slider" gutterBottom>Forza</Typography>
        <Slider id="slider-3"
            defaultValue={5}
            //getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={marks3}
            min={0}
            max={10}
        />
    </div>
  );
}