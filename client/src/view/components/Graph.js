import React, { useEffect } from 'react'

export default function Graph({ graphId }) {
	useEffect(() => {
		// console.log(`Render graph component ${graphId}`);
	}, [graphId])

	return (
		<div id={graphId} className="graph-svg-render" />
	)
}