import React, { useCallback, useRef, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import ButtonAnchorOptions from './ButtonAnchorOptions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForceFieldFeat from './ForceFieldFeat';
import HeatMapFeat from './HeatmapFeat';
import { makeStyles } from '@material-ui/core/styles';
import MALPFeat from './PLMAFeat';
import { purple } from '@material-ui/core/colors'
import RemoveIcon from '@material-ui/icons/Delete';
import RenameTitleGraph from './RenameTitleGraph';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  button: {
    '&:hover': {
      backgroundColor: purple[700],
    },
    backgroundColor: purple[500],
      color: theme.palette.getContrastText(purple[500]),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '100%'
  },

}));

export default function FeaturesContainer({ onDelete, graphViz, graphId, graphType, graphData, graphTitle, optionsPosition }) {
  const classes = useStyles();
  const [title, setTitle] = useState(graphTitle);
  const [currentOptions, setCurrentOptions] = useState({});
  const confirmButtonRef = useRef(null);

  const switchOptions = useCallback((type, position, viz) => {
    let optProps = {
      buttonRef: confirmButtonRef,
      currentOptions,
      data: graphData,
      graphViz: viz,
      position,
      setCurrentOptions,
    };
    switch (type) {
      /* case "scptMat":
        return <ScptMat {...optProps} />; */
      case "htmp":
        return <HeatMapFeat {...optProps} />;
      case "frcfld":
        return <ForceFieldFeat {...optProps} />;
      case "malp":
        return <MALPFeat {...optProps} />;
      default:
        return null;
    }
  }, [currentOptions, graphData]);

  return (
    <div className="options-container" id={`options-${graphId}`}>
      <Accordion variant="outlined" className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${graphId}-options`}
          id={`${graphId}-options-header`}
        >
          <h3 className="graph-title">{graphTitle}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div id={`${graphId}-options`} className={classes.root}>
            <RenameTitleGraph title={title} setTitle={setTitle} />
            <ButtonAnchorOptions optionsPosition={optionsPosition} />
            {switchOptions(graphType, optionsPosition.position, graphViz)}
          </div>
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RemoveIcon />}
            size="small"
            onClick={() => onDelete(graphId)}
          >
            Rimuovi grafico
          </Button>
          <Button
            ref={confirmButtonRef}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            size="small"
          >
            Conferma
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}


