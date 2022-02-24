import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    
    return (
        // <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container} >
            <NavigationEvents 
             onWillFocus={clearErrorMessage}
            />

            <AuthForm 
             headerText="Sign up"
             errorMessage={state.errorMessage}
             submitButtonText="Sign up"
             onSubmit={({ email, password }) => signup({ email, password })}
            />

            <NavLink 
             routeName="Signin"
             text="Already have an account? Sign in instead"
            />
        </View>
        // </ScrollView>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: () => false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200,
        marginTop: 40
    }
});

export default SignupScreen;
