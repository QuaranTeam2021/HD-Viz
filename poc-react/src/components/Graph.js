import React from 'react'

function Graph({ grafico }) {
	let { svg } = JSON.parse(grafico);
	return (
		<>
			{svg}
		</>
	)
}

export default Graph;