// import '../_mockLocation';   // this runs only once and set our location as we set on this file(must check/see)
import React, { useContext, useCallback } from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigationFocus } from 'react-navigation';
import Map from "../components/Map";
// npx expo-cli install expo-location(to get version matches to expo and react-native we use 'npx expo-cli')
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

import { FontAwesome } from '@expo/vector-icons';


const TrackCreateScreen = ({ isFocused }) => {  // isFocus comes from "withNavigationFocus"
    const { state: { recording }, addLocation } = useContext(LocationContext);

    const callback = useCallback((location) => {
        addLocation(location, recording)
    }, [recording] );

    // console.log(locations.length)

    const [error] = useLocation(isFocused || recording, callback);
    // when we press 'Start Recording' button we have to track user,
    // even if user navigates away from this screen, so we use  "||" case

    return (
        <ScrollView>
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {error ? <Text>Please enable location services</Text> : null }

            <TrackForm />
        </SafeAreaView>
        </ScrollView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name='plus' size={20} />
}

const styles = StyleSheet.create({

});

export default withNavigationFocus(TrackCreateScreen);
// withNavigationFocus have 'isFocused' prop. returns value true or false depend upon screen is focused or not
// so this can help us to disable location whenever user gets away from this screen without taping 'record' button

// NOTE: here we use 'useCallback' hook,
//       because in useLocation.js 'file' we used 'useEffect'(which used to disable tracking and other functions)
//       which run when we navigate or navigate away from TrackCreateScreen
//       so the initial value of 'recording' is 'false' so when we tap on 'start Recording' the state changes to true
//       but in 'useEffect' it still reference to old "false" value, 
//       (because 'useEffect' runs only when we navigate or navigate away from 'TrackCreateScreen'
//       so it will not run when 'recording' state changes to 'true' or 'false')
//       so locations[array] not updating(locations[] = 0), means track not saving

//       so in "useEffect()" as second argument in array we also pass "callback(addLocation())",
//       it compares previous values of "shouldTrack" and "callback(addLocation())"
//       'shouldTrack' not changes until we navigate, but ''callback(addLocation())' changes 
//       but 'callback(addLocation())' passes same function but it referes different function() in memory location
//       so whenever 'app/component' rerender 'TrackCreateScreen' passes new 
//       'callback(addLocation))', which is same but refers different in memory location,
//       so 'useEffect' will run coninueously and so all project/components,
//       so project/app is going to crash

//       so we use "useCallback" hook, in this we call "addLocation" function, which same as 'useEffect'
//       as second argument we pass [state.recording],
//       whenever this state changes then only new callback send to 'useLocation.js' file

//       add we have to use some 'return cleanupFunction()' 
