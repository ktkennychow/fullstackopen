import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterName, setFilterName] = useState("");
	const [display, setDisplay] = useState(persons);

	const updatePersonsHandler = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		console.log(persons, newPerson);
		if (persons.some((item) => newPerson.name === item.name)) {
			alert(`${newPerson.name} is already added to the phonebook`);
		}
		if (!persons.some((item) => newPerson.name === item.name)) {
			const newPersons = persons.concat(newPerson);
			setPersons(newPersons);
			setDisplay(newPersons);
			setNewName("");
			setNewNumber("");
		}
	};

	const filterHandler = (event) => {
		setFilterName(event.target.value);
		setDisplay(
			persons.filter((person) =>
				person.name
					.toLowerCase()
					.startsWith(event.target.value.toLowerCase())
			)
		);
	};

	return (
		<div>
			<div>debug: {newNumber}</div>
			<h2>Phonebook</h2>
			<Filter filterName={filterName} filterHandler={filterHandler} />
			<h3>add a new</h3>
			<PersonForm
				updatePersonsHandler={updatePersonsHandler}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
			/>
			<h3>Numbers</h3>
			<Persons display={display} />
		</div>
	);
};

export default App;
