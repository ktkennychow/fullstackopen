const Persons = ({ display }) => {
	return (
		<div>
			{display.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default Persons;
