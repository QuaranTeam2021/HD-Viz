import { Link } from 'react-router-dom';
import logo from '../../logoHDVIZ.PNG';
import React from 'react';

export default function Header() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="HD-Viz" />
			<ul>
				<Link to="/">
					<li>Visualzza dati</li>
				</Link>
				{/* <Link to="/dataset">
					<li>Gestione dataset</li>
				</Link>
				<Link to="/help">
					<li>Aiuto</li>
				</Link> */}
			</ul>
		</header>
	);
}