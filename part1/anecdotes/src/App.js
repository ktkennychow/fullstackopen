import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);

	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const [highestPoint, setHighestPoint] = useState(0);

  const [topQuotes, setTopQuotes] = useState([])

  const topQuote = topQuotes[Math.floor(Math.random() * topQuotes.length)];


	const voteHandler = () => {
    
		const newVote = [...points];
		newVote[selected] += 1;
		setPoints(newVote);
    if (newVote[selected] > highestPoint) {
      setHighestPoint(newVote[selected]);
      setTopQuotes([anecdotes[selected]]);
    }
    if (newVote[selected] === highestPoint) {
      const newTopQuotes = [...topQuotes];
      newTopQuotes.push(anecdotes[selected]);
      setTopQuotes(newTopQuotes);
    }
  
    
	};

	return (
		<>
			<h1>Anecdote of the day</h1>
			<div>{anecdotes[selected]}</div>
			<div>has {points[selected]} votes</div>
			<button onClick={voteHandler}>vote</button>
			<button
				onClick={() => {
					setSelected(Math.floor(Math.random() * anecdotes.length));
				}}
			>
				next anecdote
			</button>
			<h1>Anecdote with most votes</h1>
			<div>{topQuote}</div>
			has {highestPoint} votes
		</>
	);
};

export default App;
