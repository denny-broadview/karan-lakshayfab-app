import * as React from 'react';
import {useEffect, useState} from 'react';

import {Alert, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService, {navigationRef} from './NavigationService';

import {createDrawerNavigator} from '@react-navigation/drawer';

import CartIcon from '@svg/supermarket.svg';
import LogoutIcon from '@svg/ic_logout.svg';


import ThemeController from '../components/ThemeController';
import LoginScreen from '../screens/Login/LoginScreen';
import {Constants} from '../Resources';
import ForgotPasswordScreen from '../screens/ForgotPassword/ForgotPasswordScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import SplashScreen from 'react-native-splash-screen';
import Colors from '../Resources/Colors';
import HeaderTitle from '../components/HeaderTitle';
import OtpVerificationScreen from '../screens/ForgotPassword/OtpVerificationScreen';
import ResetPasswordScreen from '../screens/ForgotPassword/ResetPasswordScreen';
import FabricSelectionScreen from '../screens/Customer/FabricSelectionScreen';
import ProductSelectionScreen from '../screens/Customer/ProductSelectionScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CartScreen from '../screens/Customer/CartScreen';
import CatalogSelectionScreen from '../screens/Customer/CatalogSelectionScreen';
import HeaderRight from '../components/HeaderRight';
import * as customerActions from '../actions/customerActions';
import Styles from './Styles';
import AdminOrderDetailScreen from '../screens/Admin/AdminOrderDetailScreen';
import ShipmentScreen from '../screens/Admin/ShipmentScreen';
import AddDispatchScreen from '../screens/Dispatcher/AddDispatchScreen';
import messaging from '@react-native-firebase/messaging';
import * as loginActions from '../actions/loginActions';
import CustomerStackNavigator from './CustomerStack';
import AdminStackNavigator from './AdminStack';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorScreen from '../components/ErrorScreen';
import VersionCheck from 'react-native-version-check';
import LoadingSpinner from '../components/LoadingSpinner';
import OTPScreen from '../screens/OTPScreen/OTPScreen'
import PdfScreen from '../screens/Admin/PdfScreen';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const homeOptions = {
    title: 'Home',
    headerShown: false,
    headerTitleStyle: {
        fontWeight: 'bold',
    },

};


/*function showLogout(onLogout) {

    Alert.alert(Constants.APP_NAME, 'Are you sure you want to logout?', [
        {
            text: 'Ok',
            onPress: () => {
                onLogout();
            },
            style: 'cancel',
        },
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },

    ]);

}*/




function MyTabBar({state, descriptors, navigation}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10}}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index.toString()}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[Styles.tabBarContainer, isFocused ? {backgroundColor: Colors.rgb_e15517} : {backgroundColor: 'white'}]}
                    >
                        <Text
                            style={[Styles.tabBarTextStyle, !isFocused ? {color: Colors.rgb_e15517} : {color: 'white'}]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


function App(props) {
    const {theme} = props;
    const [isLoading, SetIsLoading] = useState(false);
    const [error, SetError] = useState(false);
    const [ message,SetMessage]=useState('')
    const [ data,SetData]=useState({})
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.loginReducer?.isLoggedIn);
    const userId = useSelector(state => state.loginReducer?.id);
    const role = useSelector(state => state.loginReducer?.role);
    const cartArr = useSelector(state => state.customerReducer?.cartArr);
    // const cartArr =[]

    const onLogout = () => dispatch(loginActions.logOut(), customerActions.logOut());

    const showLogout=()=> {

        Alert.alert(Constants.APP_NAME, 'Are you sure you want to logout?', [
            {
                text: 'Ok',
                onPress: () => {
                    onLogout();
                },
                style: 'cancel',
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },

        ]);

    }

    useEffect(() => {
    }, []);

    const DispatcherTabNavigator = () => (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Orders" component={ShipmentScreen}/>
            <Tab.Screen name="Gallery" component={FabricSelectionScreen} options={{
                headerTitle: 'Dispatched',
            }}/>

        </Tab.Navigator>
    );


    const DispatcherStackNavigator = () => (
        <Stack.Navigator>
            <Stack.Screen
                name="DispatcherTabNavigator"
                component={DispatcherTabNavigator}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle title={'Shipment'}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: 'sss',
                    headerTintColor: '#fff',
                    headerRight: () => <HeaderRight
                        icon={<LogoutIcon fill={Colors.white} width='62.5%' height='62.5%'/>} press={() => {
                        showLogout();
                    }
                    }/>,
                }}
            />


            <Stack.Screen
                name="ProductSelectionScreen"
                component={ProductSelectionScreen}
                options={({route}) => ({
                    headerShown: true,
                    headerTitle: () => <HeaderTitle title={'Colour Chart'}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: ' ',
                    headerTintColor: '#fff',
                    headerRight: () => <HeaderRight icon={
                        (role !== Constants.ROLE.DISPATCHER) ? (
                            <CartIcon fill={Colors.white} width='25' height='25'/>) : null}
                                                    press={() => {
                                                        (role !== Constants.ROLE.DISPATCHER) ? NavigationService.navigate('CartScreen') : console.log('ss');
                                                    }}
                    />,

                })}
            />


            <Stack.Screen
                name="CatalogSelectionScreen"
                component={CatalogSelectionScreen}
                options={({route}) => ({
                    headerTitle: () => <HeaderTitle title={'Catalogs'}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: ' ',
                    headerTintColor: '#fff',
                    headerShown: true,
                    headerRight: () => <HeaderRight icon={
                        (role !== Constants.ROLE.DISPATCHER) ? (
                            <CartIcon fill={Colors.white} width='25' height='25'/>) : null}
                                                    press={() => {
                                                        (role !== Constants.ROLE.DISPATCHER) ? NavigationService.navigate('CartScreen') : console.log('ss');
                                                    }}
                    />,


                })}

            />
            <Stack.Screen
                name="ShipmentScreen"
                component={ShipmentScreen}
                options={homeOptions}
                /*options={{
                    headerShown: false,
                    headerTitle: () => <HeaderTitle title={'Shipment'}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: ' ',
                    headerTintColor: '#fff',
                    headerRight: () => <HeaderRight/>
                }}*/
            />
            <Stack.Screen
                name="AdminOrderDetailScreen"
                component={AdminOrderDetailScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle title={'My Orders '}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: ' ',
                    headerTintColor: '#fff',
                    headerRight: () => <HeaderRight/>,
                }}
            />
            <Stack.Screen
                name="AddDispatchScreen"
                component={AddDispatchScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle title={'Add Dispatch Details'}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: ' ',
                    headerTintColor: '#fff',
                    headerRight: () => <HeaderRight/>,
                }}
            />

<Stack.Screen 
            name="PdfScreen"
            component={PdfScreen}
            options={{
                headerShown: true,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'Pdf'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                    elevation: 0,
                    shadowOpacity: 0,
                    shadowOffset: {
                        height: 0,
                        width: 0,
                    },
                    shadowRadius: 0,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />
        </Stack.Navigator>
    );


    const AuthStackNavigator = () => (
        <AuthStack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    // You can remove this if you want the default 'push' animation
                    animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
                    headerRight: () => <ThemeController/>,
                }}
            />
            <Stack.Screen
                name="OtpVerificationScreen"
                component={OtpVerificationScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'OTP Verification'}/>,
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerBackTitle: ' ',
                    headerTintColor: Colors.rgb_e15517,
                    headerRight: () => <Text>{'  '}</Text>,

                }}
            />
            <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'Reset Password '}/>,
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerBackTitle: ' ',
                    headerTintColor: Colors.rgb_e15517,
                    headerRight: () => <Text>{'  '}</Text>,
                }}
            />

            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    // You can remove this if you want the default 'push' animation
                    animationTypeForReplace: isLoggedIn ? 'push' : 'pop',

                }}
            />
            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle style={{color: Colors.rgb_e15517}} title={'Forgot Password '}/>,
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerBackTitle: ' ',
                    headerTintColor: Colors.rgb_e15517,
                    headerRight: () => <Text>{'  '}</Text>,
                }}
            />
            <Stack.Screen
                name="OTPScreen"
                component={OTPScreen}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderTitle style={{color: Colors.rgb_fafafa}} title={'Verify Mobile Number'}/>,
                    headerStyle: {
                        backgroundColor: Colors.rgb_e15517,
                    },
                    headerBackTitle: ' ',
                    headerTintColor: Colors.rgb_fafafa,
                    headerRight: () => <Text>{'  '}</Text>,
                }}
            />


        </AuthStack.Navigator>
    );


    const getHomeData=(fcm_token)=> {
        let bb={user_id: userId,fcm_token,version:VersionCheck.getCurrentVersion(),device_type:Platform.OS}
        console.log('body--',bb)

        SetIsLoading(true)
        console.log('is compling')
//         try {
//         let datas =    fetch(Constants.BASE_URL + '/users/mobile_home', {
//   method: 'POST',
// //   headers: {
// //     Accept: 'application/json',
// //     'Content-Type': 'application/json'
// //   },
//   body: JSON.stringify(bb)
// }).then((r)=>{
//     console.log(r)
// }).catch((e)=>{
//     console.log(e)
// })

//             fetch(Constants.BASE_URL + '/users/mobile_home', {
//                 method: 'POST',
//                 body: JSON.stringify(bb),
//             })
//                 .catch((error)=>{  console.log('is compling error ')
//                 console.log(error)}).then((response) => response.json())
//                 .then((responseJson) => {
//                     SetIsLoading(false)
//                     console.log('HomeAPiResponse-->>>>',JSON.stringify(responseJson))
//                     const {status, message, data} = responseJson;
//                     console.log(data)
                    
//                      if (status=='400'){
//                          SetError(true)
//                          SetMessage(message)
//                          SetData(data)
//                     }
    
//                 })
//                 .catch((error) => {
//                     SetIsLoading(false)
//                     console.log('is compling error ')
//                     console.log(error)
    
//                 });
//         } catch (error) {
//             console.log('is compling error ')
//             console.log(error)
//         }
    }

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);

        if(isLoggedIn && role !== Constants.ROLE.DISPATCHER && role !== Constants.ROLE.ADMIN){
            messaging().getToken().then((result) => {
                console.log(JSON.stringify(result));
                // getHomeData(result);
            })
        }


        messaging().onNotificationOpenedApp(remoteMessage => {
       //  alert('onNotificationOpenedApp:'+JSON.stringify(remoteMessage));
            if (remoteMessage != null && isLoggedIn && role === Constants.ROLE.CUSTOMER) {
                let dd = remoteMessage;
                const {screen} = dd.data;

                if (screen == 'product_detail') {
                    let data = JSON.parse(dd.data.data);
                    console.log(data);
                    const {catalog_id, id, catalog_name, fabric_name} = data;

                    NavigationService.navigate('ProductDetailScreen', {
                        item: data,
                        catalogId: catalog_id,
                        productId: id,
                        catalogName: catalog_name,
                        productColour: data.product_color,
                        fabricName: fabric_name,
                        isArhamGSilk: catalog_id == 21,
                    });
                } else if (screen == 'order_detail') {
                    let data = dd.data;
                    console.log(data.order_id);
                    NavigationService.navigate('MyOrders1', {
                        order_id: data.order_id,
                    });
                    AsyncStorage.removeItem('notification');
                }
            }
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {

                    console.log('Notification---',JSON.stringify(remoteMessage))
                  //alert('Notification caused app to open from quit state:'+JSON.stringify(remoteMessage),);
                    // NavigationService.navigate('CustomerOrderDetailScreen',{order_id:32});
                    // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                    if (remoteMessage != null && isLoggedIn && role === Constants.ROLE.CUSTOMER) {
                        let dd = remoteMessage;
                        const {screen} = dd.data;

                        if (screen == 'product_detail') {
                            let data = JSON.parse(dd.data.data);
                            console.log(data);
                            const {catalog_id, id, catalog_name, fabric_name} = data;

                            NavigationService.navigate('ProductDetailScreen', {
                                item: data,
                                catalogId: catalog_id,
                                productId: id,
                                catalogName: catalog_name,
                                productColour: data.product_color,
                                fabricName: fabric_name,
                                isArhamGSilk: catalog_id == 21,
                            });
                        } else if (screen == 'order_detail') {
                            let data = dd.data;
                            console.log(data.order_id);
                            NavigationService.navigate('MyOrders1', {
                                order_id: data.order_id,
                            });
                            AsyncStorage.removeItem('notification');
                        }
                    }

                }

            });

        //return unsubscribe
    }, []);


    if (error){
        const {APP_URL}=data
        return <ErrorScreen title={message} link={APP_URL}
            image={require('../Images/assets/logo.png')} imageStyle={{width:300,height:200,marginTop:20}}/>
    }

    if (isLoggedIn && isLoading) {
        return <LoadingSpinner/>;
    }
    console.log(isLoading)
    console.log(isLoggedIn)

    return (
        <NavigationContainer ref={navigationRef} theme={theme}>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={Colors.rgb_e15517}
                       style={{height: 40}}/>
            <SafeAreaView/>

            <Stack.Navigator>
                {isLoggedIn ? (
                    role === Constants.ROLE.DISPATCHER ?
                        (<Stack.Screen name={'DispatcherStack'} options={{headerShown: false}}
                                       component={DispatcherStackNavigator}/>) : role === Constants.ROLE.ADMIN ?
                        (<Stack.Screen name={'AdminStack'} options={{headerShown: false}}
                                       component={AdminStackNavigator}/>) : (
                            <Stack.Screen name={'MainStack'} role={role} options={{headerShown: false}}
                                          component={CustomerStackNavigator}/>)
                ) : (
                    <Stack.Screen name={'AuthStack'} component={AuthStackNavigator} options={{
                        headerShown: false,
                    }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default (App);
