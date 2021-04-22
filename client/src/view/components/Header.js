import { Link } from 'react-router-dom';
import logo from '../../logoHDVIZ.PNG';
import React from 'react';

export default function Header() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="HD-Viz" />
		</header>
	);
}
