import React, { useContext} from "react";
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from "react-native-maps";  // npm install react-native-maps
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
    const { state: { currentLocation, locations }} = useContext(LocationContext);

    if(!currentLocation) {  // show loading until we get location
        return <ActivityIndicator size="large" style={{ marginTop: 200 }}/>
    }

    // console.log(locations.coords)
    return (
        <MapView
         style={styles.map}
         initialRegion={{
            ...currentLocation.coords,   // gets latitude and longitude
            latitudeDelta:0.01,
            longitudeDelta: 0.01
         }}

         region = {{    // center map on our current location
            ...currentLocation.coords,
            latitudeDelta:0.01,
            longitudeDelta: 0.01
         }}
        >
            <Circle 
             center={ currentLocation.coords }
             radius={20}
             strokeColor='rgba(158, 158, 255, 1.0)'   // fourth number is for opacity
             fillColor='rgba(158, 158, 255, 0.3)'
            />

            <Polyline 
             coordinates={locations.map((loc) => {
                 return {     // we should also use just "loc.coords"
                     latitude: loc.coords.latitude,
                     longitude: loc.coords.longitude
                 }
             })}   
            //  strokeColor="black"
             strokeWidth={3}
             lineDashPattern={[1]}
            //  lineCap="round"
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 400,
        marginHorizontal: 5
    }
});

export default Map;