import React, { useContext} from "react";
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { ListItem, Avatar } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { navigate } from "../navigationRef";

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);

    return (
        <>
            <NavigationEvents
             onWillFocus = { fetchTracks }
            />

            <FlatList
             data={state}
             keyExtractor={item => item._id}
             renderItem={ ({item}) => {
                 return (
                    <TouchableOpacity
                     onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
                        <ListItem style={{ backgroundColor: 'gray'}}>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                        
                    </TouchableOpacity>
                 )
             }}
            />
        </>
    );
};


TrackListScreen.navigationOptions = {
    title: 'Tracks'
}


const styles = StyleSheet.create({
    view: {
        backgroundColor: 'white'
    }
});

export default TrackListScreen;