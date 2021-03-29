import React, { useState } from 'react';
import axios from 'axios';
import CompleteImport from "./CompleteImport";
import Graph from './Graph';
import Message from "./Message";

function DataInsert() {
	const [file, setFile] = useState('');
	const [selectGrafico, setSelectGrafico] = useState('scpm');
	const [riduzione, setRiduzione] = useState('pca');
	const [metrica, setMetrica] = useState('euclidean');
	const [grafici, setGrafici] = useState([]);
	const [message, setMessage] = useState('');
	const [addGraph, setAddGraph] = useState(false);

	const onChangeFile = e => {
		setFile(e.target.files[0]);
	}

	const onClickFile = e => {
		e.target.value = null;
		setFile(e.target.value);
	}

	const onChangeSelectGrafico = e => {
		setSelectGrafico(e.target.value);
	}

	const onChangeRiduzione = e => {
		setRiduzione(e.target.value);
	}

	const onChangeMetrica = e => {
		setMetrica(e.target.value);
	}

	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('data_file', file);
		formData.append('select_grafico', selectGrafico);
		formData.append('riduzione', riduzione);
		formData.append('metrica', metrica);

		let res;
		try {
			res = await axios.post('/api/graph', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			let { svg, msg } = res.data;
			updateGrafici([...grafici, svg]);
			setMessage(msg);
		} catch (err) {
			if (err.response === undefined) {
				setMessage("Il file é stato modificato su disco. Seleziona nuovamente il file da caricare");
			}
			else if (err.response.status === 400 || err.response.status === 500) {
				setMessage(err.response.data.msg);
				// setMessage(err.response.data.msg.message);
			}
			console.error(err);
		}

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
			<CompleteImport className="App-import-form" onSubmit={onSubmit} onChangeFile={onChangeFile} onClickFile={onClickFile} onChangeSelectGrafico={onChangeSelectGrafico} onChangeRiduzione={onChangeRiduzione} onChangeMetrica={onChangeMetrica} addGraph={addGraph} />
			{grafici.map((grafico, i) => <Graph key={i} svg={grafico} onDelete={deleteGrafico} index={i} />)}
		</>
	)
}

export default DataInsert;