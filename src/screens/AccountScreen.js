import React, { useContext } from "react";
import { Text, StyleSheet } from 'react-native';
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

import { FontAwesome } from '@expo/vector-icons';


const AccoountScreen = () => {
    const { signout } = useContext(AuthContext);
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
        <Text style={{ fontSize: 48 }}>AccountScreen</Text>
        <Spacer>
            <Button title="Sign Out" onPress={signout} />
        </Spacer>
        </SafeAreaView>
    );
};


AccoountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <FontAwesome name='gear' size={20} />
}
const styles = StyleSheet.create({

});

export default AccoountScreen;