import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

export const useSpotifyAPI = () => {
	const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi | null>(null);
	useEffect(() => {
		const spotifyApi = new SpotifyWebApi({
			clientId: process.env.REACT_APP_spotifyClientId,
			clientSecret: process.env.REACT_APP_spotifyCLientSecret,
		});

		const token = localStorage.getItem("spotifyAuthToken");
		if (token) {
			spotifyApi.setAccessToken(token);
		} else {
			spotifyApi.clientCredentialsGrant().then(
				function (data) {
					console.log("The access token expires in " + data.body["expires_in"]);
					console.log("The access token is " + data.body["access_token"]);

					// Save the access token so that it's used in future calls
					spotifyApi.setAccessToken(data.body["access_token"]);
					localStorage.setItem("spotifyAuthToken", data.body["access_token"]);
				}
			);
		}

		setSpotifyApi(spotifyApi);
	}, []);

	const getSpotifyPlaylistInfo = async (playlistId: string) => {
		if (spotifyApi) {
			const playlistInfo = await spotifyApi.getPlaylist(playlistId);
			return playlistInfo.body;
		}
	}

	return [getSpotifyPlaylistInfo];
}

export default useSpotifyAPI