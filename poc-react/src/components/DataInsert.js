import React, { useState } from 'react';
import CompleteImport from "./CompleteImport";
import ShortcutImport from "./ShortcutImport";
import Message from "./Message";
import Graph from './Graph';
import axios from 'axios';

function DataInsert() {
	const [file, setFile] = useState('');
	const [grafico, setGrafico] = useState('');
	const [message, setMessage] = useState('')

	const onChange = e => {
		setFile(e.target.files[0]);
	};

	const onSubmit = async formData => {
		let res;
		try {
			res = await axios.post('/api/graph', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			let { svg } = res.data;
			setGrafico(svg);
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
		onSubmit(formData);
	}
	const onSubmitBypass = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('bypass', 'on');
		onSubmit(formData);
	}

	return (
		<>
			{message ? <Message msg={message} /> : null}
			<CompleteImport className="App-import-form" onSubmit={onSubmitComplete} onChange={onChange}/>			
			<ShortcutImport className="App-import-form" onSubmit={onSubmitBypass} />
			{grafico ? <Graph svg={grafico}/> : null}
		</>
	)
}

export default DataInsert;