import { Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from './HomeScreen';

export default PlaylistDetailsScreen = ({ route, navigation }) => {
    const { tracksUrl } = route.params;
    const token = useContext(AuthContext);
    console.log(token);
    return (
        <View>
            <Text>Playlist Details</Text>
        </View>
    );
};