import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { taskRef } from "./firebase/tasks";
import { membersRef } from "./firebase/members";
import { filterTasks } from "./utils/filter";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import MemberForm from "./components/MemberForm";
import Modal from "./components/Modal";
import ErrorBanner from "./components/ErrorBanner";

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [members, setMembers] = useState([]);
	const [filter, setFilter] = useState({
		category: "",
		memberId: "",
		sortField: "timestamp:asc",
	});
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [showMemberModal, setShowMemberModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		onValue(taskRef, (snapshot) => {
			if (snapshot.exists()) {
				setTasks(
					Object.entries(snapshot.val()).map(([id, task]) => ({ id, ...task }))
				);
			} else {
				setTasks([]);
			}
		});

		onValue(membersRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const memberArray = Object.entries(data).map(([id, member]) => ({
					id,
					...member,
				}));
				setMembers(memberArray);
			}
		});
	}, []);

	useEffect(() => {
		if (!errorMessage) return;
		const timer = setTimeout(() => setErrorMessage(""), 5000);
		return () => clearTimeout(timer);
	}, [errorMessage]);

	const filteredTasks = filterTasks(tasks, filter);

	return (
		<>
			<ErrorBanner message={errorMessage} />

			<div className="board-frame">
				<Board
					tasks={filteredTasks}
					members={members}
					openTaskModal={() => setShowTaskModal(true)}
					openMemberModal={() => setShowMemberModal(true)}
					onFilterChange={setFilter}
				/>
			</div>

			{showTaskModal && (
				<Modal onClose={() => setShowTaskModal(false)}>
					<TaskForm members={members} onClose={() => setShowTaskModal(false)} />
				</Modal>
			)}

			{showMemberModal && (
				<Modal onClose={() => setShowMemberModal(false)}>
					<MemberForm onClose={() => setShowMemberModal(false)} />
				</Modal>
			)}
		</>
	);
}
