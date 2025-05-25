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

export default function TaskColumn({ title, tasks, members }) {
	return (
		<div className="task-column">
			<h3>
				{statusIcons[title]} {title} ({tasks.length})
			</h3>

			{tasks.length === 0 ? (
				<p>{emptyMessages[title] || "No tasks found"}</p>
			) : (
				tasks.map((task) => (
					<TaskCard key={task.id} task={task} members={members} />
				))
			)}
		</div>
	);
}
