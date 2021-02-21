function ShortcutImport({ className, onSubmit, addGraph }) {
	const aggiungi = addGraph ? "Aggiungi predifinito" : "File predefinito";
	return (
		<form onSubmit={onSubmit} className={className}>
			<input type="checkbox" name="bypass" id="bypass" checked readOnly hidden />
			<input type="submit" value={aggiungi} />
		</form>
	)
}

export default ShortcutImport;