const Header = (props) => {
	return (
		<div>
			<h1>{props.name}</h1>
		</div>
	);
};

const Part = ({ part }) => {
	return (
		<div>
			<p>
				{part.name} {part.exercises}
			</p>
		</div>
	);
};

const Content = (props) => {
	return (
		<div>
			{props.parts.map((prop) => (
				<Part key={prop.id} part={prop} />
			))}
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<p>
				<strong>
					total of{" "}
					{course.parts.reduce(
						(accm, part) => accm + part.exercises,
						0
					)}{" "}
					exercises
				</strong>
			</p>
		</div>
	);
};

export default Course;
