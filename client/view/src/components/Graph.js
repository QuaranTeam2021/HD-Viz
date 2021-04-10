import React from 'react';


function Graph({svg, tipoGrafico}) {
	const createMarkup = () => {
		return { __html: svg }
	}
	
	return (
		<div>
			<p> {tipoGrafico} </p>
			<div dangerouslySetInnerHTML={createMarkup()}></div>
		</div>
	)
}
export default Graph;