import TaskColumn from "./TaskColumn";
import FilterControls from "./FilterSortControls";

export default function Board({
	tasks,
	members,
	openTaskModal,
	openMemberModal,
	onFilterChange,
}) {
	const todo = tasks.filter((task) => task.status === "new");
	const doing = tasks.filter((task) => task.status === "in progress");
	const done = tasks.filter((task) => task.status === "finished");

	return (
		<div className="board">
			<h1 className="chalk-title">Scrum Board</h1>
			<div className="board-controls">
				<FilterControls
					categories={["ux", "frontend", "backend"]}
					members={members}
					onFilterChange={onFilterChange}
				/>

				<div className="modal-buttons">
					<button onClick={openTaskModal}>Add Task</button>
					<button onClick={openMemberModal}>Add Member</button>
				</div>
			</div>
			<div className="column-wrapper">
				<TaskColumn title="ToDo" tasks={todo} members={members} />
				<TaskColumn title="Doing" tasks={doing} members={members} />
				<TaskColumn title="Done" tasks={done} members={members} />
			</div>
		</div>
	);
}
