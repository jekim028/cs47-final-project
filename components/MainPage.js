import { Text, View, FlatList, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';

const screenWidth = Dimensions.get("window").width;
const numCols = 2;
const tileSize = (screenWidth - (screenWidth * 0.05)) / numCols;

const renderPlaylist = ({item}, navigation ) => {
    return (
        <View style={styles.playlistContainer}>
            <Pressable
                onPress={() => (
                    navigation.navigate('PlaylistDetailsScreen', {
                        tracksUrl: item.playlistTracks
                    })
                )}>
                <Image style={styles.playlistCover} source={{ url: item.playlistImageUrl}} />
                <Text style={styles.playlistName}>{item.playlistName}</Text>
                {/* <Text>{item.playlistDescription}</Text> */}
            </Pressable>
        </View>
    )
};
const MainPage = ({ playlists }) => {
    console.log(playlists);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={playlists}
                renderItem={(item) => renderPlaylist(item, navigation )}
                numColumns={numCols}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        margin: "1%",
        display: "flex",
        flex: 1,
    },
    playlistContainer: {
        width: tileSize - (tileSize * 0.01)*2,
        height: tileSize * 1.17,
        margin: '1%',
        display: "flex",
        alignContent: "center",
        justifyContent: "flex-start",
        backgroundColor: "#D9D9D9",
        borderRadius: 30,
    },
    playlistCover: {
        resizeMode: "contain",
        width: tileSize - (tileSize * 0.01)*2,
        height: tileSize - (tileSize * 0.01)*2,
        borderRadius: 30,
    },
    playlistName: {
        margin: "3%",
        textAlign: "center",
    }
})


export default MainPage;