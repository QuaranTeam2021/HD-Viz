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
		label: '1',
		value: 1,
	},
	{
		label: '100',
		value: 100,
	},
];
export default function SliderEpsilon({ epsilon, onChange }) {
	const classes = useStyles();

	useEffect(() => {
		onChange("useEffect", epsilon);
	}, [onChange, epsilon]);

	return (
		<div className={classes.root}>
			<Typography id="epsilon-slider-label" gutterBottom>Epsilon</Typography>
			<Slider id="epsilon-slider"
				defaultValue={10}
				aria-labelledby="epsilon-slider-label"
				valueLabelDisplay="auto"
				value={epsilon}
				step={1}
				marks={marks}
				min={1}
				max={100}
				onChangeCommitted={onChange}
			/>
		</div>
	);
}