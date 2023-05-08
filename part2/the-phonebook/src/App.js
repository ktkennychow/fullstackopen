import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsServices from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterName, setFilterName] = useState("");

	useEffect(() => {
		personsServices.getAll().then(response => { setPersons(response) })
	}, [])

	const updatePersonsHandler = (event) => {
		event.preventDefault();
		const lastPerson = persons.slice(-1)
		const newPerson = {
			name: newName,
			number: newNumber,
			id: lastPerson.id + 1,
		};
		if (persons.find((person) => person.name === newName)) {
			const personId = persons.find((person) => person.name === newName).id;
			console.log(personId);
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				personsServices.update(personId, newPerson).then(response => {
					console.log("updated!", response)
					personsServices.getAll().then(response => {
						setPersons(response);
						setNewName("");
						setNewNumber("");
					})

				})
			}
			return ""
		}
		if (persons.some((item) => newPerson.name === item.name)) {
			alert(`${newPerson.name} is already added to the phonebook`);
		}
		if (!persons.some((item) => newPerson.name === item.name)) {
			personsServices.create(newPerson).then(response => {
				console.log("Added!", response);
				const newPersons = [...persons, response];
				setPersons(newPersons);
				setNewName("");
				setNewNumber("");
			})
		}
	};

	const deleteHandler = (id) => {
		const name = persons.find(p => p.id === id).name
		window.confirm(`Delete ${name} ?`)
		personsServices.remove(id).then(response => {
			personsServices.getAll().then(response => { setPersons(response) })
			console.log("deleted!", response)
		})
	}

	const filterHandler = (event) => {
		setFilterName(event.target.value);
		console.log("filtered!", event.target.value)
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
			<Persons persons={persons} filterName={filterName} deleteHandler={deleteHandler} />
		</div>
	);
};

export default App;
