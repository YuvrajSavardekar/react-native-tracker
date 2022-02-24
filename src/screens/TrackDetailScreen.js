import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Context as TrackContext } from "../context/TrackContext";
import Spacer from "../components/Spacer";
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);

    const _id = navigation.getParam('_id');

    const track = state.find((t) => t._id === _id);

    const initialCoords = track.locations[0].coords;     // to center map at where we started
    // we have track record with object { name:, id:, and locations:[] }
    // inside locations[array] we have 'coords:' object where we can get our longitude and latitude

    return (
        <View style={styles.view}>
            <Spacer>
                <Text style={{ fontSize: 30 }}>{track.name}</Text>
            </Spacer>
            
            <MapView
             style={styles.map}
             initialRegion = {{
                 longitudeDelta: 0.01,
                 latitudeDelta: 0.01,
                 ...initialCoords
             }}
            >

                <Polyline 
                 coordinates={track.locations.map((loc) => loc.coords)}
                 strokeWidth={2}
                 lineDashPattern={[1]}
                 lineCap='butt'
                />

            </MapView>

        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 400,
        marginHorizontal: 5
    },

    view: {
        backgroundColor: 'white'
    }
});

// TrackDetailScreen.navigationOptions = {
//     title: 'Track Detail'
// }

export default TrackDetailScreen;