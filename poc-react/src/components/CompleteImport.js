
function CompleteImport({ className, onSubmit, onChange, addGraph }) {
	const aggiungi = addGraph ? "Aggiungi" : "Visualizza";
	return (
		<form onSubmit={onSubmit} className={className}>
			<fieldset>
				<legend>Importazione dati</legend>
				<label htmlFor="file">Seleziona file: </label>
				<input type="file" name="data_file" id="inserimentoFile" accept=".csv, .json, .tsv" onChange={onChange} />
			</fieldset>
			<fieldset id="visualizzazione">
				<legend>Impostazione visualizzione</legend>
				<div>
					<label htmlFor="grafico">Seleziona grafico </label>
					<select name="grafico">
						<option>Scatter plot Matrix</option>
						<option>Scatter plot</option>
						<option>Heat Map</option>
					</select>
				</div>
				<div>
					<label htmlFor="riduzione">Seleziona algoritmo di riduzione </label>
					<select name="riduzione">
						<option>PCA</option>
					</select>
				</div>
			</fieldset>
			<input type="submit" value={aggiungi} className="button" />
		</form>
	)
}

export default CompleteImport;