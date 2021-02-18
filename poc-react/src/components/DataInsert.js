import React, { useState } from 'react';
import CompleteImport from "./CompleteImport";
import ShortcutImport from "./ShortcutImport";
import Message from "./Message";
import Graph from './Graph';
import axios from 'axios';

function DataInsert() {
	const [file] = useState('');
	const [grafico, setGrafico] = useState('');
	const [message, setMessage] = useState('')

	const onSubmit = async formData => {
		let res;
		try {
			res = await axios.post('https://localhost:5000/api/graph', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			// let { page } = JSON.parse(res);
			setGrafico(res);
		} catch (err) {
			if (err.response.status === 500) {
				setMessage('There was a problem with the server');
			} else {
				setMessage(err.response.data.msg);
			}
		}

	}

	const onSubmitComplete = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		formData.append('grafico', grafico);
		onSubmit(formData);
	}
	const onSubmitBypass = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('bypass', true);
		onSubmit(formData);
	}

	return (
		<>
			{message ? <Message msg={message} /> : null}
			<CompleteImport className="App-import-form" onSubmit={onSubmitComplete}/>			
			<ShortcutImport className="App-import-form" onSubmit={onSubmitBypass} />
			{grafico ? <Graph svg={grafico}/> : null}
		</>
	)
}

export default DataInsert;