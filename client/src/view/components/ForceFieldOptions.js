import React, { useCallback, useEffect } from 'react';
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

  const [minDist, setMinDist] = React.useState(0);
  const [maxDist, setMaxDist] = React.useState(Number.MAX_VALUE);
  const [minForDistances, setMinForDistances] = React.useState(0);
  const [maxForDistances, setMaxForDistances] = React.useState(200);
  const [strength, setStrength] = React.useState(-30);

  const commitChanges = useCallback(() => {
    
    if (currentOptions.oldDisMax !== maxDist ||
        currentOptions.oldDisMin !== minDist ||
        currentOptions.oldStr !== strength) {
      graphViz.updateDistStr(minDist, maxDist, strength);
    } 
    /* else {
         graphViz.updateStrength(strength);
       } */

    setCurrentOptions({
      oldDisMax: maxDist,
      oldDisMin: minDist,
      oldStr: strength,
    });
  }, [currentOptions, maxDist, minDist, graphViz, setCurrentOptions, strength]);

  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      const disMax = graphViz.getMax();
      const disMin = graphViz.getMin();

      setMaxForDistances(disMax);
      setMinForDistances(disMin);
    }
  }, [buttonRef, commitChanges, graphViz]);

  // css nel caso sia verticale o orrizzontale (up, down => orrizzontale; left, right => verticale)
  classes.direction = ["up", "down"].includes(position) ? classes.column : classes.row;

  const onChangeDistanceMax = (_e, v) => setMaxDist(v);
  const onChangeDistanceMin = (_e, v) => setMinDist(v);
  const onChangeStrength = (_e, v) => setStrength(v);

  return (
    <div className={classes.root}>
      <div className={classes.direction}>
        <Typography id="frfd-maxDistance-slider-label" gutterBottom>Distanza massima</Typography>
        <Slider id="frfd-maxDistance-slider"
          aria-labelledby="frfd-maxDistance-slider-label"
          valueLabelDisplay="auto"
          step={10 ** Math.floor(Math.log(maxForDistances / 100) / Math.LN10)}
          marks={[
              {label: minForDistances,
                value: minForDistances},
              {label: maxForDistances,
                value: maxForDistances}
            ]}
          min={minForDistances}
          max={maxForDistances}
          value={maxDist}
          onChange={onChangeDistanceMax}
        />
      </div>
      <div className={classes.direction}>
        <Typography id="frfd-minDistance-slider-label" gutterBottom>Distanza minima</Typography>
        <Slider id="frfd-minDistance-slider"
          aria-labelledby="frfd-minDistance-slider-label"
          valueLabelDisplay="auto"
          step={10 ** Math.floor(Math.log(maxForDistances / 100) / Math.LN10)}
          marks={[
              {label: minForDistances,
                value: minForDistances},
              {label: maxForDistances,
                value: maxForDistances}
            ]}
          min={minForDistances}
          max={maxForDistances}
          value={minDist}
          onChange={onChangeDistanceMin}
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
