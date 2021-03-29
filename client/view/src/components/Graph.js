
function Graph({svg, tipoGrafico}) {
	const createMarkup = () => {
		return { __html: svg }
	}
	
	return (
		<div>
			<div className="FeaturesCont">

			</div>
			<p> {tipoGrafico}</p>
			<div dangerouslySetInnerHTML={createMarkup()}></div>
		</div>
	)
}
export default Graph;