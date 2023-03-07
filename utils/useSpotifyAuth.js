import getEnv from "./env";
import { Platform } from "react-native";
import { useState, useEffect } from "react";
import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import { getMyPlaylists } from "./apiOptions";

import * as WebBrowser from "expo-web-browser";

const {
  REDIRECT_URI,
  SCOPES,
  CLIENT_ID,
  ALBUM_ID,
  SPOTIFY_API: { DISCOVERY },
} = getEnv();

// needed so that the browswer closes the modal after auth token
WebBrowser.maybeCompleteAuthSession();

const formatter = (data) => data.map((val) => {
    return ({
        playlistId: val.id,
        playlistDescription: val.description,
        playlistName: val.name,
        playlistTracks: val.tracks,
        playlistImageUrl: val?.images[0]?.url ?? undefined,
    });
});


const useSpotifyAuth = (ALBUM_ONLY = false) => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [_, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri:
        Platform.OS !== "web"
          ? REDIRECT_URI
          : makeRedirectUri({
              // scheme: null, // optional for web, mobile default: 'exp'
              preferLocalhost: true,
              isTripleSlashed: true,
              // useProxy: true, // not needed afaict, default: false
            }),
    },
    DISCOVERY
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
    if (Platform.OS === "web" && location.hash)
      setToken(location.hash.split("=")[1]);
  }, [response]);

  useEffect(() => {
    const fetchPlaylists = async () => {
        let res;
        res = await getMyPlaylists(token);
        console.log(res);
        setPlaylists(formatter(res))
    };

    if (token) {
        fetchPlaylists();
    }
  }, [token]);


  const setLoggedIn = () => {
    promptAsync(
      Platform.OS === "web"
        ? { windowName: "_self" }
        : /* this is for forcing the popup to be created within the same window so needs same context */
          {}
    );
  };
  // TO DO: pick better naming conventions
  return { token: token ?? undefined, playlists, getSpotifyAuth: setLoggedIn };
};

export default useSpotifyAuth;
