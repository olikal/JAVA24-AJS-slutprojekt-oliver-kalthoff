import { useState } from "react";
import { addTask } from "../firebase/tasks";
import { handleError } from "../utils/handleError";

// Formulär för ny task
// Användare väljer tiel, kategori och (valfritt) medlem
export default function TaskForm({ members, onClose, setErrorMessage }) {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [selectedMemberId, setSelectedMemberId] = useState("");

	// Filtrerar medlemmar som matchar vald kategori (eller fullstack)
	const filteredMembers = category
		? members.filter(
				(member) => member.role === category || member.role === "fullstack"
		  )
		: [];

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (title.trim() === "") return;

		const isMemberChosen = selectedMemberId.trim() !== "";

		const newTask = {
			title,
			category,
			status: isMemberChosen ? "in progress" : "new",
			timestamp: new Date().toISOString(),
			memberId: isMemberChosen ? selectedMemberId : null,
		};

		try {
			await addTask(newTask);
			onClose();
			setTitle("");
			setCategory("");
			setSelectedMemberId("");
		} catch (error) {
			handleError("Failed to add task", error, setErrorMessage);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="New task"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				required
			/>

			<select
				value={category}
				onChange={(event) => {
					setCategory(event.target.value);
					setSelectedMemberId("");
				}}
				required
			>
				<option value="" disabled>
					Select Category
				</option>
				<option value="ux">UX</option>
				<option value="frontend">Frontend</option>
				<option value="backend">Backend</option>
			</select>

			<select
				value={selectedMemberId}
				onChange={(event) => setSelectedMemberId(event.target.value)}
				disabled={!category}
			>
				<option value="" disabled>
					Select member
				</option>
				{filteredMembers.map((member) => (
					<option key={member.id} value={member.id}>
						{member.name}
					</option>
				))}
			</select>

			<button type="submit" disabled={!title || !category}>
				Add
			</button>
		</form>
	);
}
