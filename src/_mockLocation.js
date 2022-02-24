// this file set our location and changes every 1 second which helps to draw a line,
// so we don't have to actully move around to test app that draw line on map or not
import * as Location from 'expo-location';

const tenMeterWithDegrees = 0.0001;   // appro. 10 meters in longitude and latitude

const getLocation = (increment) => {
    return {
        timeStamp: 100000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 72.877656 + increment * tenMeterWithDegrees,
            latitude: 19.075984 + increment * tenMeterWithDegrees
        }
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);