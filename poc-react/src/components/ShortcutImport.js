
function ShortcutImport({ className, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className={className}>
			<input type="checkbox" name="bypass" id="bypass" checked readOnly hidden />
			<input type="submit" value="File predefinito" />
		</form>
	)
}

export default ShortcutImport;