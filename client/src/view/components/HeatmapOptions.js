/* eslint-disable no-extra-parens */
import React, { useCallback, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  inputLabel: {
    fontWeight: 'bold',
  },
  root: { // dovrebbe renderlo largo quanto GraphContainer a seconda del grafico
    display: 'flex',
    gridGap: '5em',
    padding: '2em',
  },
}));

export default function HeatmapOptions({ position, graphViz, buttonRef, currentOptions, setCurrentOptions }) {
  const classes = useStyles();
  
  const [ordinamento, setOrdinamento] = React.useState('none');
  const [minDist, setMinDist] = React.useState(0);
  const [maxDist, setMaxDist] = React.useState(Number.MAX_VALUE);
  const [minForDistances, setMinForDistances] = React.useState(0);
  const [maxForDistances, setMaxForDistances] = React.useState(200);
  
  const commitChanges = useCallback(() => {
    
    if (currentOptions.oldMinDist !== minDist || currentOptions.oldMaxDist !== maxDist) {
      graphViz.updateDist(minDist, maxDist, ordinamento);
    } 
    else if (currentOptions.oldOrd !== ordinamento) {
      graphViz.updateOrder(ordinamento);
    }
    
      setCurrentOptions({
        oldMaxDist: maxDist,
        oldMinDist: minDist,
        oldOrd: ordinamento,
    });
  }, [currentOptions, graphViz, maxDist, minDist, ordinamento, setCurrentOptions]);
  
  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      const disMax = graphViz.getMax();
      const disMin = graphViz.getMin();

      setMinForDistances(disMin);
      setMaxForDistances(disMax);
    }
  }, [buttonRef, commitChanges, graphViz]);
  
  // css nel caso sia verticale o orizzontale (up, down => orrizzontale; left, right => verticale)
  classes.direction = ["up", "down"].includes(position) ? classes.column : classes.row;
  
  const onChangeOrdinamento = e => setOrdinamento(e.target.value);
  const onChangeMinDist = (_e, v) => setMinDist(v);
  const onChangeMaxDist = (_e, v) => setMaxDist(v);
  
  return (
    <div className={classes.root}>
      <div className={classes.direction}>
        <Typography id="htmp-maxDist-slider-label" gutterBottom>Distanza massima</Typography>
        <Slider id="htmp-maxDist-slider"
          aria-labelledby="htmp-maxDist-slider-label"
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
          onChange={onChangeMaxDist}
          />
      </div>
      <div className={classes.direction}>
        <Typography id="htmp-minDist-slider-label" gutterBottom>Distanza minima</Typography>
        <Slider id="htmp-minDist-slider"
          aria-labelledby="htmp-minDist-slider-label"
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
          onChange={onChangeMinDist}
          />
      </div>
      <div className={classes.direction}>
        <FormControl className={classes.formControl}>
          <InputLabel id="order-select-label" className={classes.inputLabel}>Ordinamento</InputLabel>
          <Select labelId="order-select-label" id="order-select" value={ordinamento} onChange={onChangeOrdinamento}>
            <MenuItem value={'none'}>Originale</MenuItem>
            <MenuItem value={'group'}>Cluster</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}