import { useSpotifyAuth } from "../utils";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import SpotifyAuthButton from "../components/SpotifyAuthButton.js";
import MainPage from "../components/MainPage";

export default function HomeScreen(props) {
    const { token, tracks, getSpotifyAuth } = useSpotifyAuth();
    const navigation = props.navigation

    let contentDisplayed = null;

    if (token) {
        contentDisplayed = <MainPage />;
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
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
  });