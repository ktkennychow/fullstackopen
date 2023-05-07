const PersonForm = ({
	updatePersonsHandler,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
}) => {
	return (
		<div>
			<form onSubmit={updatePersonsHandler}>
				<div>
					name:
					<input
						value={newName}
						onChange={(event) => setNewName(event.target.value)}
					/>
				</div>
				<div>
					number:
					<input
						value={newNumber}
						onChange={(event) => setNewNumber(event.target.value)}
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</div>
	);
};

export default PersonForm;
