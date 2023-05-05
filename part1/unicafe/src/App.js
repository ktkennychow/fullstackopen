import { useState } from "react";

const Button = ({ clickHandler, name }) => {
	return (
		<>
			<button onClick={clickHandler}>{name}</button>
		</>
	);
};

const StatisticLine = ({ name, value }) => {
	return (
		<div>
			{name} {value}
		</div>
	);
};
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = (good * 1 + bad * -1) / all;
	const positive = (good / all) * 100 + " %";
	if (all) {
		return (
			<>
				<h1>statistics</h1>
				<StatisticLine name='good' value={good} />
				<StatisticLine name='neutral' value={neutral} />
				<StatisticLine name='bad' value={bad} />
				<StatisticLine name='all' value={all} />
				<StatisticLine name='average' value={average} />
				<StatisticLine name='positive' value={positive} />
			</>
		);
	}
};
const StatisticsTable = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = (good * 1 + bad * -1) / all;
	const positive = (good / all) * 100 + " %";
	if (all) {
		return (
			<>
				<h1>statistics (table ver.)</h1>
				<table>
					<tbody>
						<tr>
							<td>good</td>
							<td>{good}</td>
						</tr>
						<tr>
							<td>neutral</td>
							<td>{neutral}</td>
						</tr>
						<tr>
							<td>bad</td>
							<td>{bad}</td>
						</tr>
						<tr>
							<td>all</td>
							<td>{all}</td>
						</tr>
						<tr>
							<td>average</td>
							<td>{average}</td>
						</tr>
						<tr>
							<td>positive</td>
							<td>{positive}</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	}
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const goodHandler = () => {
		setGood(good + 1);
	};
	const neutralHandler = () => {
		setNeutral(neutral + 1);
	};
	const badHandler = () => {
		setBad(bad + 1);
	};
	return (
		<>
			<h1>give feedback</h1>
			<Button clickHandler={goodHandler} name='good' />
			<Button clickHandler={neutralHandler} name='neutral' />
			<Button clickHandler={badHandler} name='bad' />
			<Statistics good={good} neutral={neutral} bad={bad} />
			<StatisticsTable good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
