import { useEffect, useState } from "react";

// Filtrerar och sorterar tasks
export default function FilterControls({
	categories,
	members,
	onFilterChange,
}) {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedMemberId, setSelectedMemberId] = useState("");
	const [sortField, setSortField] = useState(""); // Vilken sortering som valts

	// Uppdaterar filter när något val ändras.
	useEffect(() => {
		onFilterChange({
			category: selectedCategory,
			memberId: selectedMemberId,
			sortField,
		});
	}, [selectedCategory, selectedMemberId, sortField]);

	return (
		<div className="filters">
			<select
				value={selectedCategory}
				onChange={(event) => {
					setSelectedCategory(event.target.value);
				}}
			>
				<option value="">All categories</option>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat.charAt(0).toUpperCase() + cat.slice(1)}
					</option>
				))}
			</select>

			<select
				value={selectedMemberId}
				onChange={(event) => {
					setSelectedMemberId(event.target.value);
				}}
			>
				<option value="">All members</option>
				{members.map((member) => (
					<option key={member.id} value={member.id}>
						{member.name}
					</option>
				))}
			</select>

			<select
				value={sortField}
				onChange={(event) => setSortField(event.target.value)}
			>
				<option value="timestamp:asc">Oldest first</option>
				<option value="timestamp:desc">Newest first</option>
				<option value="title:asc">Title A-Z</option>
				<option value="title:desc">Title Z-A</option>
			</select>
		</div>
	);
}
