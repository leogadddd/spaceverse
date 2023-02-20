export const generateId = (str : string) => {
	return Math.random().toString(36) + `-${str}`;
}

export const generateKey = () => {
	return Math.random().toString(36);
}