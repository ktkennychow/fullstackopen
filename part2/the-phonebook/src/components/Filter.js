const Filter = ({ filterName, filterHandler }) => {
	return (
		<div>
			filter shown with{" "}
			<input value={filterName} onChange={filterHandler} />
		</div>
	);
};

export default Filter;
