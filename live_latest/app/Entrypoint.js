/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React,{useEffect} from 'react';
import { ActivityIndicator ,View,Dimensions,Alert,Platform,StatusBar} from 'react-native';
import messaging from '@react-native-firebase/messaging';


import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';
import Colors from './Resources/Colors';
import AsyncStorage from '@react-native-community/async-storage';



const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
};

const { persistor, store } = configureStore();

export function RootNavigation() {
  const isDark = useSelector(state => state.themeReducer.isDark);
  const theme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const X_WIDTH = 375;
  const X_HEIGHT = 812; const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896; const { height, width } = Dimensions.get('window');
  const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
      ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
      : false;

  const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
  });


// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;

  const MyStatusBar = ({ backgroundColor, ...props }) => (
      <View style={[{ height: StatusBarHeight }, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  );

  useEffect(()=>{

  },[])

  return (
    <PaperProvider theme={theme}>
      {Platform.OS === 'ios' ?
          <MyStatusBar backgroundColor={Colors.rgb_e15517}  barStyle="light-content" /> :
          <StatusBar barStyle="dark-content" backgroundColor={Colors.rgb_e15517}  />
      }

      <Navigator theme={theme}  />
    </PaperProvider>
  );
}

export default function Entrypoint() {

useEffect(()=>{


},[])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
