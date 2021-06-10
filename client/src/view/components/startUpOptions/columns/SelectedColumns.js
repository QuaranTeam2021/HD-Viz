import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
 
  chip: {
    margin: 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 150,
    minWidth: 120,
  },
 
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const none = "Nessuna colonna disponibile";

export default function SelectColumns({onChange, uploadedColumns}) {
  const classes = useStyles();
  
  return (
      <FormControl className={classes.formControl}>
      <InputLabel id="columns-select-label">Colonne</InputLabel>
      <Select
        labelId="columns-select-label"
        id="columns-select"
        multiple
        value={[]}
        onChange={onChange}
        input={<Input id="columns-chip" />}
        renderValue={selected => <div className={classes.chips}>
            {selected.map(value => <Chip key={value} label={value === "none" ? none : value} className={classes.chip} />)}
          </div>
        }
        MenuProps={MenuProps}
      >
      {/*   {
					uploadedColumns && uploadedColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleCheckbox />} onChange={onChange}
						label={d} value={d}
					/>)
				} */}
		{uploadedColumns ? uploadedColumns.map((column, i) => <MenuItem key={i} value={column}> {column} </MenuItem>)
          : <MenuItem value="none" disabled>{none}</MenuItem>}
      </Select>
    </FormControl>
  );
}

/* import Checkbox from '@material-ui/core/Checkbox';
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
} */