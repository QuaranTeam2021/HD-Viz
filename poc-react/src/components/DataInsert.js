import React, { useState } from 'react';
import CompleteImport from "./CompleteImport";
import ShortcutImport from "./ShortcutImport";
import Message from "./Message";
import Graph from './Graph';
import axios from 'axios';

function DataInsert() {
	const [file, setFile] = useState('');
	const [selectGrafico, setSelectGrafico] = useState('scpm');
	const [riduzione, setRiduzione] = useState('pca');
	const [grafici, setGrafici] = useState([]);
	const [message, setMessage] = useState('');
	const [addGraph, setAddGraph] = useState(false);

	const onChangeFile = e => {
		setFile(e.target.files[0]);
	};
	const onChangeSelectGrafico = e => {
		setSelectGrafico(e.target.value);
	};
	const onChangeRiduzione = e => {
		setRiduzione(e.target.value);
	}

	const onSubmit = async formData => {
		let res;
		try {
			res = await axios.post('/api/graph', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			let { svg } = res.data;
			updateGrafici([...grafici, svg]);
			setMessage(`Aggiunto ${grafici[grafici.length-1]}`)
		} catch (err) {
			if (err.status === 400 || err.status === 500) {
				setMessage(err.data.msg);
			}
			console.error(err);
		}

	}

	const onSubmitComplete = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('data_file', file);
		formData.append('select_grafico', selectGrafico);
		formData.append('riduzione', riduzione);
		onSubmit(formData);
	}
	const onSubmitBypass = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('bypass', 'on');
		onSubmit(formData);
	}

	const updateGrafici = graphUpdated => {
		if (graphUpdated.length >= 1)
			setAddGraph(true);
		else
			setAddGraph(false);
		setGrafici(graphUpdated);
	}

	const deleteGrafico = index => {
		updateGrafici(grafici.filter((g, i) => i !== index));
	}

	return (
		<>
			{message ? <Message msg={message} /> : null}
			<CompleteImport className="App-import-form" onSubmit={onSubmitComplete} onChangeFile={onChangeFile} onChangeSelectGrafico={onChangeSelectGrafico} onChangeRiduzione={onChangeRiduzione} addGraph={addGraph}/>
			<ShortcutImport className="App-import-form2" onSubmit={onSubmitBypass}  addGraph={addGraph}/>
			{grafici.map((grafico, i) => <Graph key={i} svg={grafico} onDelete={deleteGrafico} index={i}/>)}
		</>
	)
}

export default DataInsert;