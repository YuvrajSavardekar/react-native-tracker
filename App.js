import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator } from "react-navigation";

import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider} from './src/context/LocationContext';
import { Provider as TrackProvider } from "./src/context/TrackContext";

import { setNavigator } from "./src/navigationRef";

import { FontAwesome } from '@expo/vector-icons';
import { accessibilityProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const trackListFlow = createStackNavigator({ // switch/back-and-forth between TrackList and TrackDetails
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

// function TrackScreen() {
//   return(

//   )
// }
trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: <FontAwesome name='th-list' size={20} />
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,

  loginFlow: createStackNavigator({  // switch/back-and-forth between signin and signin
    Signup: SignupScreen,
    Signin: SigninScreen
  }),

  mainFlow: createBottomTabNavigator({ // bottom tab for TrackList, create and account
    trackListFlow: trackListFlow,   // we have to assign this to variable because we have to change text and icon
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={navigator => setNavigator(navigator)} />    
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
};