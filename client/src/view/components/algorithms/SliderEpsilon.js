import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		width: 200,
	},
});

const marks = [
	{
		label: '10',
		value: 10,
	},
	{
		label: '50',
		value: 50,
	},
];
export default function SliderEpsilon({ epsilon, onChange }) {
	const classes = useStyles();

	useEffect(() => {
		onChange("useEffect", epsilon);
	}, [onChange, epsilon]);

	return (
		<div className={classes.root}>
			<Typography id="discrete-slider" gutterBottom>Epsilon</Typography>
			<Slider
				defaultValue={20}
				aria-labelledby="discrete-slider"
				valueLabelDisplay="auto"
				step={1}
				marks={marks}
				min={10}
				max={50}
				onChangeCommitted={onChange}
			/>
		</div>
	);
}