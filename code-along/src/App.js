import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes';

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		noteService
			.getAll()
			.then(initNotes => {
				setNotes(initNotes)
			})
	}, [])

	const toggleImportanceOf = id => {
		
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
	}

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};
		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	};

	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	};
	const toggleShowAll = () => {
		setShowAll(!showAll);
	}


	const notesToShow = showAll ? notes : notes.filter((note) => note.important);
	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={toggleShowAll}>show {showAll ? "important" : "all"}</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type='submit'>save</button>
			</form>
		</div>
	);
};

export default App;