import logo from '../../QuaranTeam_logo_b.jpg';
import React from 'react';

export default function Footer() {
	return (
		<footer className="App-footer">
            <p>Software sviluppato da</p>
			<img src={logo} className="QT-logo" alt="QuaranTeam" />
		</footer>
	);
}