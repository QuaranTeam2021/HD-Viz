function ShortcutImport({ className, onSubmit, addGraph }) {
	const aggiungi = addGraph ? "Aggiungi predefinito" : "File predefinito";
	return (
		<form onSubmit={onSubmit} className={className}>
			<input type="checkbox" name="bypass" id="bypass" checked readOnly hidden />
			<input type="submit" value={aggiungi} className="button" />
		</form>
	)
}

export default ShortcutImport;