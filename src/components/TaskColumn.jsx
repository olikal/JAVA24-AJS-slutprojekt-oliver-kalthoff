import TaskCard from "./TaskCard";

const emptyMessages = {
	ToDo: "No tasks to do",
	Doing: "Nothing in progress",
	Done: "No completed tasks",
};

const statusIcons = {
	ToDo: "📋",
	Doing: "⏳",
	Done: "✅",
};

// Kolumner för varje typ av tasks (ToDo, Doing och Done)
export default function TaskColumn({ title, tasks, members, setErrorMessage }) {
	return (
		<div className="task-column">
			<h3>
				{statusIcons[title]} {title} ({tasks.length})
			</h3>

			{tasks.length === 0 ? (
				<p>{emptyMessages[title]}</p>
			) : (
				tasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						members={members}
						setErrorMessage={setErrorMessage}
					/>
				))
			)}
		</div>
	);
}
