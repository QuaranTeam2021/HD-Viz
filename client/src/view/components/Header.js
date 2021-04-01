import logo from '../../logo.svg';

function Header() {
	const title = "React PoC"
	return (
		<>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p className="App-title">{title}</p>
			</header>
		</>	
	)
} 

export default Header;