function Graph({ svg, onDelete, index }) {
	const createMarkup = () => {
		return { __html: svg }
	}
	return (
		<div>
			<button onClick={() => onDelete(i)}>RIMUOVI</button>
			<div dangerouslySetInnerHTML={createMarkup()}></div>
		</div>
	)
}