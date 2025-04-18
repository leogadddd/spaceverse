export const getPlaylistIdFromUrl = (url: string) => {
	// remove the query string
	const urlWithoutQueryString = url.split('?')[0]
	// remove the trailing slash
	const urlWithoutTrailingSlash = urlWithoutQueryString.replace(/\/$/, '')
	// get the last part of the url
	const playlistId = urlWithoutTrailingSlash.split('/').pop()
	console.log(playlistId)
	return playlistId
}

// https://open.spotify.com/album/1kCHru7uhxBUdzkm4gzRQc?si=prsxwrUkROOn0iyCZdbu0Q
// https://open.spotify.com/playlist/6ReYAGR4R2vY3QZP9bAGt3?si=9701c7b956dc40ca

export const getTypeAndUrlValue = (url: string) => {

	// get which type of source it is
	// youtube, vimeo, etc
	// check the hostname of the url
	const hostname = new URL(url).hostname

	const getYtVideoId = (url: string) => {
		const videoId = url.split('v=')[1]
		// remove the query string
		const videoIdWithoutQueryString = videoId.split('&')[0]
		return videoIdWithoutQueryString
	}

	switch (hostname) {
		case 'www.youtube.com':
		case 'youtu.be':
			return {
				type: 'youtube',
				urlValue: getYtVideoId(url),
			}
	}

	return {
		type: 'unknown',
		urlValue: '',
	}
}