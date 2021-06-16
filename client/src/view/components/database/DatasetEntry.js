import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteDb from './DeleteDb';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
	content: {
		padding: '20px',
	},
}));

export default function DatasetEntry({ dsName, onClickDelete }) {
	const classes = useStyles();
	return (
		<Card variant="outlined" elevation={0}>
			<CardContent className={classes.content}>
				{dsName}
			</CardContent>
			<CardActions>
				<DeleteDb label="Elimina dataset" dsName={dsName} onClickDelete={onClickDelete} />
			</CardActions>
		</Card>
	);
}