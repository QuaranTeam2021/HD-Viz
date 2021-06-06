import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    gridGap: '5em',
    padding: '2em',
  },
}));

export default function ForceFieldOptions({ position, graphViz, buttonRef, currentOptions, setCurrentOptions }) {
  const classes = useStyles();

  const [distanceMin, setDistanceMin] = useState(0);
  const [distanceMax, setDistanceMax] = useState(200);
  const [maxDistanceMax, setMaxDistanceMax] = useState(200);
  const [maxDistanceMin, setMaxDistanceMin] = useState(200);
  const [strength, setStrength] = useState(-30);


  const commitChanges = useCallback(() => {
    
    if (currentOptions.oldDisMax !== distanceMax ||
        currentOptions.oldDisMin !== distanceMin ||
        currentOptions.oldStr !== strength) {
      graphViz.updateDistStr(distanceMin, distanceMax, strength);
    } 
    /* else {
         graphViz.updateStrength(strength);
       } */

    setCurrentOptions({
      oldDisMax: distanceMax,
      oldDisMin: distanceMin,
      oldStr: strength,
    });
  }, [currentOptions, distanceMax, distanceMin, graphViz, setCurrentOptions, strength]);

  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      const disMax = graphViz.getMax();
      const disMin = graphViz.getMin();

      setMaxDistanceMax(disMax);
      setMaxDistanceMin(disMax);

      marks.distanceMax[0].label = disMin.toString();
      marks.distanceMax[0].value = disMin;
      marks.distanceMin[0].label = disMin.toString();
      marks.distanceMin[0].value = disMin;
      marks.distanceMax[1].label = disMax.toString();
      marks.distanceMax[1].value = disMax;
      marks.distanceMin[1].label = disMax.toString();
      marks.distanceMin[1].value = disMax;

    }
  }, [buttonRef, commitChanges, graphViz]);

  // css nel caso sia verticale o orrizzontale (up, down => orrizzontale; left, right => verticale)
  classes.direction = ["up", "down"].includes(position) ? classes.column : classes.row;

  const onChangeDistanceMax = (_e, v) => setDistanceMax(v);
  const onChangeDistanceMin = (_e, v) => setDistanceMin(v);
  const onChangeStrength = (_e, v) => setStrength(v);

  return (
    <div className={classes.root}>
      <div className={classes.direction}>
        <Typography id="frfd-maxDistance-slider-label" gutterBottom>Distanza massima</Typography>
        <Slider id="frfd-maxDistance-slider"
          aria-labelledby="frfd-maxDistance-slider-label"
          valueLabelDisplay="auto"
          step={10 ** Math.floor(Math.log(maxDistanceMax / 10) / Math.LN10)}
          marks={marks.distanceMax}
          min={0}
          max={maxDistanceMax}
          value={distanceMax}
          onChange={onChangeDistanceMax}
        />
      </div>
      <div className={classes.direction}>
        <Typography id="frfd-minDistance-slider-label" gutterBottom>Distanza minima</Typography>
        <Slider id="frfd-minDistance-slider"
          aria-labelledby="frfd-minDistance-slider-label"
          valueLabelDisplay="auto"
          step={10 ** Math.floor(Math.log(maxDistanceMax / 100) / Math.LN10)}
          marks={marks.distanceMin}
          min={0}
          max={maxDistanceMin}
          value={distanceMin}
          onChange={onChangeDistanceMin}
        />
      </div>
      <div className={classes.direction}>
        <Typography id="frfd-strength-slider-label" gutterBottom>Intensità forza</Typography>
        <Slider id="frfd-strength-slider"
          aria-labelledby="frfd-strength-slider-label"
          valueLabelDisplay="auto"
          step={10}
          marks={marks.strength}
          min={-150}
          max={50}
          value={strength}
          onChange={onChangeStrength}
        />
      </div>
    </div>
  );
}

const marks = {
  distanceMax: [
    {
      label: '0',
      value: 0,
    },
    {
      label: '200',
      value: 200,
    }
  ],
  distanceMin: [
    {
      label: '0',
      value: 0,
    },
    {
      label: '200',
      value: 200,
    }
  ],
  strength: [
    {
      label: '-150',
      value: -150,
    },
    {
      label: '50',
      value: 50,
    }
  ]
};
