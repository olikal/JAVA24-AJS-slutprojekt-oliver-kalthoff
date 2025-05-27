import { useState } from "react";
import { deleteTask, updateTask } from "../firebase/tasks";
import { formatDate } from "../utils/formatDate";
import { handleError } from "../utils/handleError";

// Komponent för enskilt taskcard
// Innehåller info: titel, kategori, medlem, created-date
// Interaktioner: edit, assign, finish, reopen och delete
export default function TaskCard({ task, members, setErrorMessage }) {
	// Medlemmar som matchar taskens kategori (eller fullstack)
	const eligibleMembers = members?.filter(
		(member) => member.role === task.category || member.role === "fullstack"
	);

	// State för redigeringsläge
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);
	const [editedMemberId, setEditedMemberId] = useState(task.memberId || "");
	// Då edit inte är available på completed tasks är isEditable true om status är new/in progress
	const isEditable = ["new", "in progress"].includes(task.status);
	const assignedMember = members.find((member) => member.id === task.memberId);

	const handleAssignMember = async (memberId) => {
		try {
			await updateTask(task.id, {
				memberId,
				status: "in progress",
			});
		} catch (error) {
			handleError("Failed to assign member", error, setErrorMessage);
		}
	};

	const handleMarkAsFinished = async () => {
		try {
			await updateTask(task.id, { status: "finished" });
		} catch (error) {
			handleError("Failed to mark task as finished", error, setErrorMessage);
		}
	};

	const handleDeleteTask = async () => {
		try {
			await deleteTask(task.id);
		} catch (error) {
			handleError("Failed to delete task", error, setErrorMessage);
		}
	};

	const handleEditTask = async () => {
		if (!editedTitle.trim()) return;
		try {
			await updateTask(task.id, {
				title: editedTitle,
				memberId: editedMemberId || null,
			});
			setIsEditing(false);
		} catch (error) {
			handleError("Failed to edit task", error, setErrorMessage);
		}
	};

	// Återöppnar "finished" task
	const handleMoveToInProgress = async () => {
		try {
			await updateTask(task.id, { status: "in progress" });
		} catch (error) {
			handleError(
				"Failed to move task back to in progress",
				error,
				setErrorMessage
			);
		}
	};

	return (
		<div className="task-card" data-status={task.status}>
			{/* Redigeringsläge, ändra titel och (om in progress) member */}
			{isEditing && isEditable ? (
				<>
					<input
						type="text"
						value={editedTitle}
						onChange={(event) => setEditedTitle(event.target.value)}
					/>
					{task.status === "in progress" && (
						<select
							value={editedMemberId}
							onChange={(event) => setEditedMemberId(event.target.value)}
							disabled={eligibleMembers.length === 0}
						>
							<option value="" disabled>
								{eligibleMembers.length === 0
									? "No available members"
									: "Select member"}
							</option>
							{eligibleMembers.map((member) => (
								<option key={member.id} value={member.id}>
									{member.name}
								</option>
							))}
						</select>
					)}
				</>
			) : (
				<>
					{/* Visningsläge */}
					<h4>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h4>
					{assignedMember && <p>Member: {assignedMember.name}</p>}
					<p>
						Category:{" "}
						{task.category.charAt(0).toUpperCase() + task.category.slice(1)}
					</p>
					<p>Created: {formatDate(task.timestamp)}</p>
				</>
			)}

			{/* Knappar baserat på status/läge */}
			<div className="task-actions">
				{isEditing ? (
					<>
						<button onClick={handleEditTask}>Save</button>
						<button
							onClick={() => {
								setIsEditing(false);
								setEditedTitle(task.title);
								setEditedMemberId(task.memberId || "");
							}}
						>
							Cancel
						</button>
					</>
				) : task.status === "new" ? (
					<>
						<button
							onClick={() => {
								setIsEditing(true);
								setEditedTitle(task.title);
								setEditedMemberId(task.memberId || "");
							}}
						>
							Edit
						</button>

						<select
							defaultValue=""
							disabled={eligibleMembers.length === 0}
							onChange={(event) => handleAssignMember(event.target.value)}
						>
							<option value="" disabled>
								Select member
							</option>
							{eligibleMembers.map((member) => (
								<option key={member.id} value={member.id}>
									{member.name}
								</option>
							))}
						</select>
					</>
				) : task.status === "in progress" ? (
					<>
						<button
							onClick={() => {
								setIsEditing(true);
								setEditedTitle(task.title);
								setEditedMemberId(task.memberId || "");
							}}
						>
							Edit
						</button>
						<button onClick={handleMarkAsFinished}>Mark as done</button>
					</>
				) : task.status === "finished" ? (
					<>
						<button onClick={handleMoveToInProgress}>Reopen</button>
						<button onClick={handleDeleteTask}>Delete</button>
					</>
				) : null}
			</div>
		</div>
	);
}
