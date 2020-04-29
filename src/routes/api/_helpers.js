export function calculateHashrate(difficulty, duration) {
	return Math.ceil(difficulty / duration * Math.pow(2, 16));
}
