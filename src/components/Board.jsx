import { useState } from "react";
import { filterTasks } from "../utils/filter";
import TaskColumn from "./TaskColumn";
import FilterControls from "./FilterSortControls";

// Board är i princip allt vi ser.
// Titel, filter + sortering, knappar för add task/member
// Tre kolumner för ToDo, Doing och Done
export default function Board({
	tasks,
	members,
	openTaskModal,
	openMemberModal,
	setErrorMessage,
}) {
	const [filter, setFilter] = useState({
		category: "",
		memberId: "",
		sortField: "timestamp:asc",
	});

	// Filtrerar och sorterar tasks efter användarens val
	const filteredTasks = filterTasks(tasks, filter);

	// Filtrerar tasks per status
	const todo = filteredTasks.filter((task) => task.status === "new");
	const doing = filteredTasks.filter((task) => task.status === "in progress");
	const done = filteredTasks.filter((task) => task.status === "finished");

	return (
		<div className="board">
			<h1 className="chalk-title">Scrum Board</h1>
			<div className="board-controls">
				<FilterControls
					categories={["ux", "frontend", "backend"]}
					members={members}
					onFilterChange={setFilter}
				/>

				<div className="modal-buttons">
					<button onClick={openTaskModal}>Add Task</button>
					<button onClick={openMemberModal}>Add Member</button>
				</div>
			</div>
			<div className="column-wrapper">
				<TaskColumn
					title="ToDo"
					tasks={todo}
					members={members}
					setErrorMessage={setErrorMessage}
				/>
				<TaskColumn
					title="Doing"
					tasks={doing}
					members={members}
					setErrorMessage={setErrorMessage}
				/>
				<TaskColumn
					title="Done"
					tasks={done}
					members={members}
					setErrorMessage={setErrorMessage}
				/>
			</div>
		</div>
	);
}
