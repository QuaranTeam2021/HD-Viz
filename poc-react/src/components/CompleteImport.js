
function CompleteImport({ className, onSubmit, onChangeFile, onClickFile, onChangeSelectGrafico, onChangeRiduzione, addGraph }) {
	const aggiungi = addGraph ? "Aggiungi" : "Visualizza";
	return (
		<form onSubmit={onSubmit} className={className}>
			<fieldset>
				<legend>Importazione dati</legend>
				<label htmlFor="file">Seleziona file: </label>
				<input type="file" name="data_file" id="inserimentoFile" accept=".csv, .json, .tsv" onChange={onChangeFile} onClick={onClickFile}/>
			</fieldset>
			<fieldset id="visualizzazione">
				<legend>Impostazione visualizzione</legend>
				<div>
					<label htmlFor="grafico">Seleziona grafico </label>
					<select name="grafico" onChange={onChangeSelectGrafico}>
						<option value="scpm">Scatter plot Matrix</option>
						<option value="scp">Scatter plot</option>
					</select>
				</div>
				<div>
					<label htmlFor="riduzione">Seleziona algoritmo di riduzione </label>
					<select name="riduzione" onChange={onChangeRiduzione}>
						<option value="pca">PCA</option>
					</select>
				</div>
			</fieldset>
			<input type="submit" value={aggiungi} className="button" />
		</form>
	)
}

export default CompleteImport;