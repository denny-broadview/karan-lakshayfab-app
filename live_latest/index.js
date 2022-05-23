/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './app/Entrypoint';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage  from '@react-native-community/async-storage';
enableScreens();
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
   // alert('Message handled in the background!'+JSON.stringify(remoteMessage));
    AsyncStorage.setItem('notification',JSON.stringify(remoteMessage))
    console.log('background',JSON.stringify(remoteMessage))
});
console.log(appName)
AppRegistry.registerComponent(appName, () => App);
// registerRootComponent(App);
