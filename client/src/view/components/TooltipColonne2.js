
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    absolute: {
        bottom: theme.spacing(2),
        position: 'absolute',
        right: theme.spacing(3),
      },
   
 
}));

export default function SimpleTooltips() {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Colonne da plottare o da sottoporre a riduzione dimensionale">
        <IconButton aria-label="Colonne">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}