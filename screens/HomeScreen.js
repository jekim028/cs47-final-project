import { useSpotifyAuth } from "../utils";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import SpotifyAuthButton from "../components/SpotifyAuthButton.js";
import MainPage from "../components/MainPage";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function HomeScreen(props) {
    const { token, playlists, getSpotifyAuth } = useSpotifyAuth();
    const navigation = props.navigation

    let contentDisplayed = null;

    if (token) {
        contentDisplayed = (
            <AuthContext.Provider value={token}>
                <MainPage playlists={playlists} />
            </AuthContext.Provider>
        );
    } else {
        contentDisplayed = (
            <SpotifyAuthButton authenticationFunction={getSpotifyAuth} />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            {contentDisplayed}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
  });