export function handleError(message, error, setErrorMessage) {
	console.error(message, error);
	if (typeof setErrorMessage === "function") {
		setErrorMessage(message);
	}
}