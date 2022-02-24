import { useState, useEffect } from 'react';
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [error, setError] = useState(null);
    
    // const [subscriber, setSubscriber] = useState(null);

    

    useEffect(() => {
        
        let subscriber;
        const starWatching = async () => {
            try{
                await requestForegroundPermissionsAsync();
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,   // for either every 1 second or every 10 meters 
                        distanceInterval: 10
                    },
                    callback
                );
                // setSubscriber(sub);
            }catch(error){   // if reject location permission
                setError(error);
            }
        };

        if(shouldTrack) {
            starWatching();
        } else {
            if(subscriber) {
                subscriber.remove();  // disable location
            }
            subscriber = null;  // reset to null
            // setSubscriber(null);
        }

        return () => {
            if(subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    // we pass "shouldTrack" is array because whenever TrackCreateScreen rerender,
    // if the value of "shouldTrack"(true or false)change, means if we navigate or navigate away from this screen
    // then useEffect hook runs

    return [error];  // we can use {error} or just error, but by convention we use array[error]
}