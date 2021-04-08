import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { purple } from '@material-ui/core/colors';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const PurpleCheckbox = withStyles({
  checked: {},
  root: {
    '&$checked': {
      color: purple[600],
    },
    color: purple[400],
  },
})(props => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {

 

  
} 
