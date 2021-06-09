import { Link, useRouteMatch } from 'react-router-dom';
import Guide from './Guide';
import logo from '../../HDViz_logo.jpg';
import React from 'react';

export default function Header({ storeDefined }) {
	const match = useRouteMatch();

	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="HD-Viz" />
			{!(match.isExact && match.url === "/") &&
				<div className="menu_div not_home">
					<ul className="main_menu">
						<li className="item_home"><Link to="/">Home</Link></li>
						<li className="item_home"><Link to="/build">{storeDefined ? 'Aggiungi ' : 'Nuovo '}grafico</Link></li>
						{storeDefined && <li className="item_home"><Link to="/visualization">Visualizza grafici</Link></li>}
						<li className="item_home"><Link to="/dataset">Gestisci database</Link></li>
						<li className="item_home"><Guide /></li>
						<li className="item_home"><Link to="/manual">Manuale utente</Link></li>
					</ul>
				</div>
			}
		</header>
	);
}