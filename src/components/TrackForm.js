import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { name, recording, locations },
            startRecording,
            stopRecording,
            changeName
        } = useContext(LocationContext)

        // console.log(locations.length);

    const [saveTrack] = useSaveTrack();

    return (
        <>
            <Spacer>
                <Input 
                 value = {name}
                 onChangeText = { changeName }
                 placeholder="Enter Track Name"
                 style = {styles.input}/>
            </Spacer>

            <Spacer>
                { recording 
                ? <Button title="Stop" onPress={ stopRecording } />
                : <Button title="Start Recording" onPress = { startRecording } />
                }
            </Spacer>

            <Spacer>
                { (!recording && locations.length)  // if we stop recording and have some locations[array] to show
                ? <Button title = "Save Track" onPress={saveTrack}/> 
                : null
                }
            </Spacer>
            
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5
    },
})

export default TrackForm;