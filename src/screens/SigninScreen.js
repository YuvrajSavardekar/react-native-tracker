import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context} from "../context/AuthContext";

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);

    return (
        // <ScrollView>
        <View style={styles.container}>
            <NavigationEvents
             onWillFocus={clearErrorMessage}
            />

            <AuthForm
             headerText="Sign in"
             errorMessage={state.errorMessage}
             submitButtonText="Sign in"
             onSubmit={({ email, password }) => signin({ email, password })}
            />

            <NavLink 
             text="Don't have an account? Sign up instead"
             routeName="Signup"
            />

        </View>
        // </ScrollView>
    );
};

SigninScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200,
        marginTop: 40
    }
});

export default SigninScreen;