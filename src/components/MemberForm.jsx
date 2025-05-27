import { useState } from "react";
import { addMember } from "../firebase/members";
import { handleError } from "../utils/handleError";

// Formulär för att lägga till member
export default function MemberForm({ onClose, setErrorMessage }) {
	const [name, setName] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Måste ha namn och roll
		if (!name.trim() || !role) return;

		const newMember = {
			name: name.trim(),
			role,
			created: new Date().toISOString(),
		};

		try {
			await addMember(newMember);
			onClose();
			setName("");
			setRole("");
		} catch (error) {
			handleError("Failed to add member", error, setErrorMessage);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(event) => setName(event.target.value)}
				required
			/>
			<select value={role} onChange={(event) => setRole(event.target.value)}>
				<option value="" disabled>
					Select role
				</option>
				<option value="ux">UX</option>
				<option value="frontend">Frontend</option>
				<option value="backend">Backend</option>
				<option value="fullstack">Fullstack</option>
			</select>
			<button type="submit" disabled={!name.trim() || !role}>
				Add member
			</button>
		</form>
	);
}
