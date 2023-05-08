const Persons = ({ persons, filterName, deleteHandler }) => {
	const filterPersons = persons.filter((person) =>
		person.name
			.toLowerCase()
			.startsWith(filterName.toLowerCase())
	)
	return (
		<div>
			{filterPersons.map((person) => (
				<p key={person.id}>
					{person.name} {person.number} {" "}
					<button onClick={() => { deleteHandler(person.id) }}>delete</button>
				</p>
			))}
		</div>
	);
};

export default Persons;
