import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
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

export default function CheckboxColumns({onChange, uploadedColumns}) {
	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Colonne:</FormLabel>
			<FormGroup>
				{
					uploadedColumns && uploadedColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleCheckbox />} onChange={onChange}
						label={d} value={d}
					/>)
				}
			</FormGroup>
		</FormControl>
	)
}