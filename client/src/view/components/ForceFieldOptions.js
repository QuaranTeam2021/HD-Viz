import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  column: {
    flexBasis: '25%'
  },
  root: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  row: {
    flexBasis: '25%'
  }
}));

export default function ForceFieldOptions({ position, graphViz, buttonRef, currentOptions, setCurrentOptions }) {
  const classes = useStyles();

  const [distanceMin, setDistanceMin] = React.useState(0);
  const [distanceMax, setDistanceMax] = React.useState(0);
  const [maxDistanceMax, setMaxDistanceMax] = React.useState(200);
  const [maxDistanceMin, setMaxDistanceMin] = React.useState(200);
  const [strength, setStrength] = React.useState(-30);
  const [threshold, setThreshold] = React.useState(0);
  const [maxThreshold, setMaxThreshold] = React.useState(10);


  const commitChanges = useCallback(() => {
    if (currentOptions.oldDisMax !== distanceMax)
    graphViz.updateDistanceMax(distanceMax);
    if (currentOptions.oldDisMin !== distanceMin)
    graphViz.updateDistanceMin(distanceMin);
    if (currentOptions.oldStr !== strength)
    graphViz.updateStrength(strength);
    if (currentOptions.oldThres !== threshold)
      graphViz.updateThreshold(threshold);

    setCurrentOptions({
      oldDisMax: distanceMax,
      oldDisMin: distanceMin,
      oldStr: strength,
      oldThres: threshold,
    });
  }, [currentOptions, distanceMax, distanceMin, graphViz, setCurrentOptions, strength, threshold]);

  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      const max = graphViz.getMax();
      const disMax = Math.max(200, max);

      setMaxDistanceMax(disMax);
      setMaxDistanceMin(disMax);
      setMaxThreshold(max);
      
      marks.distanceMax[1].label = disMax.toString();
      marks.distanceMax[1].value = disMax;
      marks.distanceMin[1].label = disMax.toString();
      marks.distanceMin[1].value = disMax;
      marks.threshold[1].label = max.toString();
      marks.threshold[1].value = max;
    }
  }, [buttonRef, commitChanges, graphViz]);

  // css nel caso sia verticale o orrizzontale (up, down => orrizzontale; left, right => verticale)
  classes.direction = ["up", "down"].includes(position) ? classes.column : classes.row;

  const onChangeDistanceMax = (_e, v) => setDistanceMax(v);
  const onChangeDistanceMin = (_e, v) => setDistanceMin(v);
  const onChangeThreshold = (_e, v) => setThreshold(v);
  const onChangeStrength = (_e, v) => setStrength(v);

  return (
    <div className={classes.root}>
      <div className={classes.direction}>
        <Typography id="frfd-maxDistance-slider-label" gutterBottom>Distanza massima</Typography>
        <Slider id="frfd-maxDistance-slider"
          aria-labelledby="frfd-maxDistance-slider-label"
          valueLabelDisplay="auto"
          step={10}
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
          step={10}
          marks={marks.distanceMin}
          min={0}
          max={maxDistanceMin}
          value={distanceMin}
          onChange={onChangeDistanceMin}
        />
      </div>
      <div className={classes.direction}>
        <Typography id="frfd-threshold-slider-label" gutterBottom>Soglia</Typography>
        <Slider id="frfd-threshold-slider"
          aria-labelledby="frfd-threshold-slider-label"
          valueLabelDisplay="auto"
          step={maxThreshold > 3 ? 1 : 0.1}
          marks={marks.threshold}
          min={0}
          max={maxThreshold}
          value={threshold}
          onChange={onChangeThreshold}
        />
      </div>
      <div className={classes.direction}>
        <Typography id="frfd-strength-slider-label" gutterBottom>Intensità forza</Typography>
        <Slider id="frfd-strength-slider"
          aria-labelledby="frfd-strength-slider-label"
          valueLabelDisplay="auto"
          step={1}
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
  ],
  threshold: [
    {
      label: '0',
      value: 0,
    },
    {
      label: '10',
      value: 10,
    }
  ],
};
