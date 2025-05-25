export default function Modal({ onClose, children }) {
	return (
		<div className="modal" onClick={onClose}>
			<div
				className="modal-content"
				onClick={(event) => event.stopPropagation()}
			>
				<button className="close-button" onClick={onClose}>
					x
				</button>
				{children}
			</div>
		</div>
	);
}
