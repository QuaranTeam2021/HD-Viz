
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
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

export default function TooltipConfirm() {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Il calcolo della riduzione potrebbe richiedere tempo">
        <span>
          <IconButton disabled aria-label="Riduzione">
            <ErrorOutlineIcon />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}