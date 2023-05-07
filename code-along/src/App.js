import Note from "./components/Note";

const App = () => {
	const notes = [
		{
			id: 1,
			content: "HTML is easy",
			important: true,
		},
		{
			id: 2,
			content: "Browser can execute only JavaScript",
			important: false,
		},
		{
			id: 3,
			content:
				"GET and POST are the most important methods of HTTP protocol",
			important: true,
		},
	];
	let animals = [
		{ name: "Kenny", species: "human" },
		{ name: "Benny", species: "cat" },
		{ name: "Fenny", species: "dog" },
		{ name: "Qenny", species: "cat" },
	];

	let names = animals.map((animal) => animal.name);
	return (
		<div>
			<h1>Notes</h1>
			<p>{names}</p>
			{notes.map((note) => (
				<Note key={note.id} note={note} />
			))}
		</div>
	);
};

export default App;
