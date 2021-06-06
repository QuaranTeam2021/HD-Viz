import React, { useCallback, useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: { // dovrebbe renderlo largo quanto GraphContainer a seconda del grafico
    display: 'flex',
    gridGap: '5em',
    padding: '2em',
  },
}));

export default function HeatmapOptions({ position, graphViz, buttonRef, currentOptions, setCurrentOptions }) {
  const classes = useStyles();
  
  const [ordinamento, setOrdinamento] = useState('none');
  const [minDist, setMinDist] = useState(0);
  const [maxDist, setMaxDist] = useState(10);
  const [minForDistances, setMinForDistances] = useState(0);
  const [maxForDistances, setMaxForDistances] = useState(10);
  
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
        oldOrd: ordinamento
    });
  }, [currentOptions, graphViz, ordinamento, setCurrentOptions, minDist, maxDist]);
  
  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      const disMax = graphViz.getMax(),
        disMin = graphViz.getMin();

      setMinForDistances(disMin);
      setMaxForDistances(disMax);
      
      marks[0].label = disMin.toString();
      marks[0].value = disMin;
      marks[1].label = disMax.toString();
      marks[1].value = disMax;
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
        <Typography id="htmp-minDist-slider-label" gutterBottom>Distanza minima</Typography>
        <Slider id="htmp-minDist-slider"
          aria-labelledby="htmp-minDist-slider-label"
          valueLabelDisplay="auto"
          step={10 ** Math.floor(Math.log(maxForDistances / 10) / Math.LN10)}
          marks={marks}
          min={minForDistances}
          max={maxForDistances}
          value={minDist}
          onChange={onChangeMinDist}
          />
      </div>
      <div className={classes.direction}>
        <Typography id="htmp-maxDist-slider-label" gutterBottom>Distanza massima</Typography>
        <Slider id="htmp-maxDist-slider"
          aria-labelledby="htmp-maxDist-slider-label"
          valueLabelDisplay="auto"
          step={10 ** Math.floor(Math.log(maxForDistances / 10) / Math.LN10)}
          marks={marks}
          min={minForDistances}
          max={maxForDistances}
          value={maxDist}
          onChange={onChangeMaxDist}
          />
      </div>
      <div className={classes.direction}>
        <FormControl className={classes.formControl}>
          <InputLabel id="order-select-label">Ordinamento</InputLabel>
          <Select labelId="order-select-label" id="order-select" value={ordinamento} onChange={onChangeOrdinamento}>
            <MenuItem value={'none'}>Originale</MenuItem>
            <MenuItem value={'group'}>Cluster</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

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