export const getTimeSince = (date: number) => {
	const seconds = Math.floor((new Date().getTime() - date) / 1000);
	let interval = Math.floor(seconds / 31536000);
	if (interval > 1) {
		return interval + "y";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + "M";
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + "d";
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + "h";
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + "m";
	}
	return Math.floor(seconds) + "s ago";
};