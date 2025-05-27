import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { taskRef } from "./firebase/tasks";
import { membersRef } from "./firebase/members";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import MemberForm from "./components/MemberForm";
import Modal from "./components/Modal";
import ErrorBanner from "./components/ErrorBanner";

export default function App() {
	const [tasks, setTasks] = useState([]); // Alla tasks
	const [members, setMembers] = useState([]); // Alla members
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [showMemberModal, setShowMemberModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// Subscription på ändringar av tasks och members från firebase.
	useEffect(() => {
		onValue(taskRef, (snapshot) => {
			if (snapshot.exists()) {
				setTasks(
					// Omvandlar objekt till array med id och task-data
					Object.entries(snapshot.val()).map(([id, task]) => ({
						id,
						...task,
					}))
				);
			} else {
				setTasks([]);
			}
		});

		onValue(membersRef, (snapshot) => {
			if (snapshot.exists()) {
				setMembers(
					// Omvandlar objekt till array med id och member-data
					Object.entries(snapshot.val()).map(([id, member]) => ({
						id,
						...member,
					}))
				);
			} else {
				setMembers([]);
			}
		});
	}, []);

	// Visar error message i 5 sec, sen försvinner det igen
	useEffect(() => {
		if (!errorMessage) return;
		const timer = setTimeout(() => setErrorMessage(""), 5000);
		return () => clearTimeout(timer);
	}, [errorMessage]);

	return (
		<>
			<ErrorBanner message={errorMessage} />

			<div className="board-frame">
				<Board
					tasks={filteredTasks}
					members={members}
					openTaskModal={() => setShowTaskModal(true)}
					openMemberModal={() => setShowMemberModal(true)}
					setErrorMessage={setErrorMessage}
				/>
			</div>

			{showTaskModal && (
				<Modal onClose={() => setShowTaskModal(false)}>
					<TaskForm
						members={members}
						onClose={() => setShowTaskModal(false)}
						setErrorMessage={setErrorMessage}
					/>
				</Modal>
			)}

			{showMemberModal && (
				<Modal onClose={() => setShowMemberModal(false)}>
					<MemberForm
						onClose={() => setShowMemberModal(false)}
						setErrorMessage={setErrorMessage}
					/>
				</Modal>
			)}

			{/* Endast för demonstration av error-banner */}
			<button onClick={() => setErrorMessage("This is a test error message")}>
				Error banner demo
			</button>
		</>
	);
}
