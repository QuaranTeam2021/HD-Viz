
function CompleteImport({ className, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className={className}>
			<fieldset>
				<label htmlFor="file">Inserisci un file csv:</label>
				<input type="file" name="data_file" id="inserimentoFile" accept=".csv, .json" />
				<label htmlFor="grafico">Scegli il grafico</label>
				<input type="radio" name="grafico" id="scp" /> Scatterplot
      			<input type="radio" name="grafico" id="scpm" /> ScP matrix
			</fieldset>
			<input type="submit" value="Carica" />
		</form>
	)
}

export default CompleteImport;