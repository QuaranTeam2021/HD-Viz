import React, { useState } from 'react'

export default function Graph({ svg, onDelete, index }) {
	const [i] = useState(index);

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