import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { purple } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';

const useStyles = makeStyles(() => ({
  formLabel: {
    fontWeight: 'bold',
  },
}));

const PurpleRadio = withStyles({
  checked: {},
  root: {
    '&$checked': {
      color: purple[600],
    },
    color: purple[400]
  }
})(props => <Radio color="default" {...props} />);

export default function RadioColumns({ grouperColumns, onChange }) {
	const classes = useStyles();

	return (
		<>
			<FormControl component="fieldset">
				<FormLabel component="legend" className={classes.formLabel}>Raggruppamento:</FormLabel>
				<RadioGroup onChange={onChange}>
					{
						grouperColumns && grouperColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleRadio color="primary" />} label={d} value={d}
						/>)
					}
				</RadioGroup>
			</FormControl>
		</>
	)
}