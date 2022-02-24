import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, submitButtonText, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>

            <Input
             autoCapitalize="none"
             autoCorrect={false} 
             label="Email"
             value={email}
             onChangeText={(newEmail) => setEmail(newEmail)}
             style={styles.input}
             placeholder = 'sample@gmail.com'
            />
            <Spacer />

            <Input 
             autoCapitalize="none"
             autoCorrect={false} 
             label="Password"
             value={password}
             onChangeText={(newPassword) => setPassword(newPassword)} 
             style={styles.input}
             placeholder = 'must contain 8 or characters'
            />

            {errorMessage ? <Text style={styles.errorMessage}>{ errorMessage }</Text> : null }

            <Spacer>
                <Button 
                 title={submitButtonText}
                 onPress={() => onSubmit({ email, password })} 
                 style={styles.button}
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
    },

    input: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 3
    },

    button: {
        marginHorizontal: 50
    }
});

export default AuthForm;