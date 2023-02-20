import React from 'react'

const initialSpotifyPlaylistContext = {
	playlist: [],
	playlistIndex: 0,
}

const localStorageName = 'spotifyPlaylistContext';

const getInitialSpotifyPlaylist = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem('spotifyPlaylistContext');
		if (typeof storedPrefs === 'string') {
			return JSON.parse(storedPrefs);
		}

		window.localStorage.setItem(localStorageName, JSON.stringify(initialSpotifyPlaylistContext));
		return initialSpotifyPlaylistContext;

	}
}

export const SpotifyPlaylistContext = React.createContext();

export const SpotifyPlaylistContextProvider = ({ children }) => {
	const [ctx, setCtx] = React.useState(getInitialSpotifyPlaylist);

	const rawSetSpotifyPlaylist = (rawSpotifyPlaylistCtx) => {
		const stringifiedSpotifyPlaylistCtx = JSON.stringify(rawSpotifyPlaylistCtx);
		localStorage.setItem(localStorageName, stringifiedSpotifyPlaylistCtx);
	};

	React.useEffect(() => {
		rawSetSpotifyPlaylist(ctx);
	}, [ctx]);

	return (
		<SpotifyPlaylistContext.Provider value={{ ctx, setCtx }}>
			{children}
		</SpotifyPlaylistContext.Provider>
	);
}