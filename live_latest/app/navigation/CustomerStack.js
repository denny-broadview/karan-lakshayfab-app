import React from 'react';
import {Alert, Text, Keyboard,TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../Resources/Colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';

import {Constants} from '../Resources';

import HomeIcon from '@svg/icon_home.svg';
import DeleteIcon from '@svg/ic_clear_cart.svg';
import CartIcon from '@svg/supermarket.svg';
import HomeMenuIcon from '@svg/ic_home_menu.svg';

import * as loginActions from '../actions/loginActions';
import * as customerActions from '../actions/customerActions';

import HeaderTitle from '../components/HeaderTitle';
import PendingOrdersScreen from '../screens/Customer/PendingOrdersScreen';
import CompletedOrdersScreen from '../screens/Customer/CompletedOrdersScreen';
import ImageZoomScreen from '../screens/Customer/ImageZoomScreen';
import HeaderRight from '../components/HeaderRight';
import OrderConfirmationScreen from '../screens/Customer/OrderConfirmationScreen';
import NavigationService from './NavigationService';
import ShippingAddressSelectionScreen from '../screens/Customer/ShippingAddressSelectionScreen';
import EditShippingAddressSelectionScreen from '../screens/Customer/EditShippingAddressSelectionScreen';
import AddNewAddressScreen from '../screens/Customer/AddNewAddressScreen';
import UpdateAddressScreen from '../screens/Customer/UpdateAddressScreen';
import ProductDetailScreen from '../screens/Customer/ProductDetailScreen';
import CartScreen from '../screens/Customer/CartScreen';
import ProductSelectionScreen from '../screens/Customer/ProductSelectionScreen';
import CatalogSelectionScreen from '../screens/Customer/CatalogSelectionScreen';
import ProductGalleryScreen from '../screens/Customer/ProductGalleryScreen';
import MyAccountScreen from '../screens/Customer/MyAccountScreen';
import UpdatePersonalDetailsScreen from '../screens/Customer/UpdatePersonalDetailsScreen';
import FabricSelectionScreen from '../screens/Customer/FabricSelectionScreen';

import CustomerOrderDetailScreen from '../screens/Customer/CustomerOrderDetailScreen';
import ChangePasswordScreen from '../screens/Customer/ChangePasswordScreen';

import CustomerHomeScreen from '../screens/Customer/CustomerHomeScreen';
import AddFeedbackScreen from '../screens/Customer/AddFeedbackScreen';


import Styles from './Styles';
import DrawerContent from './DrawerContent';
import ContactUsScreen from '../screens/Customer/ContactUsScreen';
import PurchaserRequest from '../screens/Customer/PurchaserRequest';
import CustomerOrderDetail from '../screens/Customer/CustomerOrderDetail';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();



function showClearCart(clearCart) {
    Alert.alert(
        Constants.APP_NAME,
        'Do  you want to clear the cart?',
        [
            {
                text: 'Ok',
                onPress: () => {
                    clearCart();
                },
                style: 'cancel',
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },

        ],
        {cancelable: false});

}

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


const TabNavigator = () => (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Pending" component={PendingOrdersScreen}/>
        <Tab.Screen name="Dispatched" component={CompletedOrdersScreen} options={{
            headerTitle: 'Dispatched',
        }}/>

    </Tab.Navigator>
);

const drawerNavigator = (props) => {

    return <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeStackNavigator" component={HomeStackNavigator} {...props}/>
        <Drawer.Screen name="MyOrders" component={MyOrdersNavigator}/>
        <Drawer.Screen name="MyOrders1" component={CustomerOrderDetail}/>
        <Drawer.Screen name="Gallery" component={ProductGalleryStackNavigator}/>
        <Drawer.Screen name="AccountNavigator" component={AccountNavigator}/>
        <Drawer.Screen name="FeedbackNavigator" component={FeedbackNavigator}/>
        <Drawer.Screen name="PurchaserNavigator" component={PurchaserNavigator}/>
        <Drawer.Screen name="ContactUsNavigator" component={ContactUsNavigator}/>
    </Drawer.Navigator>;

};


const HomeStackNavigator = (props) => {
    const {role, navigation} = props;
    const cartArr = useSelector(state => state.customerReducer?.cartArr);

    return <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={CustomerHomeScreen}
            options={{
                title: 'Dashboard',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                                   Keyboard.dismiss()
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Home '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => role !== Constants.ROLE.DISPATCHER ?
                    <HeaderRight icon={<CartIcon fill={Colors.white} width='25' height='25'/>}
                                 counter={1}
                                 press={() => {
                                     NavigationService.navigate('CartScreen');
                                 }}
                    /> : null,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />

        <Stack.Screen
            name="FabricSelectionScreen"
            component={FabricSelectionScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Fabrics '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => role !== Constants.ROLE.DISPATCHER ?
                    <HeaderRight icon={<CartIcon fill={Colors.white} width='25' height='25'/>}
                                 counter={1}
                                 press={() => {
                                     NavigationService.navigate('CartScreen');
                                 }}
                    /> : null,

            }}
        />

        <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={({route}) => ({
                headerShown: true,
                headerTitle: () => <HeaderTitle title={route.params.productColour}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight icon={<CartIcon fill={Colors.white} width='25' height='25'/>}
                                                counter={1}
                                                press={() => {
                                                    NavigationService.navigate('CartScreen');
                                                }}/>,

            })}
        />

        <Stack.Screen
            name="CartScreen"
            component={cartStack}
            options={{
                headerShown: false,
            }}
        />


        <Stack.Screen
            name="ImageZoomScreen"
            component={ImageZoomScreen}
            options={{
                headerShown: false,
            }}
        />


        <Stack.Screen
            name="ProductSelectionScreen"
            component={ProductSelectionScreen}
            options={({route}) => ({
                headerShown: true,
                headerTitle: () => <HeaderTitle title={route.params.isArhamGSilk?route.params.fabricName:'Colour Charts'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight icon={<CartIcon fill={Colors.white} width='25' height='25'/>}
                                                counter={1}
                                                press={() => {
                                                    NavigationService.navigate('CartScreen');
                                                }}/>,

            })}
        />


        <Stack.Screen
            name="CatalogSelectionScreen"
            component={CatalogSelectionScreen}
            options={({route}) => ({
                headerTitle: () => <HeaderTitle title={'Items'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerShown: true,
                headerRight: () => <HeaderRight icon={<CartIcon fill={Colors.white} width='25' height='25'/>}
                                                counter={1}
                                                press={() => {
                                                    NavigationService.navigate('CartScreen');
                                                }}/>,

            })}

        />

    </Stack.Navigator>;
};

const DetailScreen=(props)=>{

    return  <Stack.Navigator>
        <Stack.Screen
            name="CustomerOrderDetail"
            component={CustomerOrderDetail}
            options={{
                headerShown: false,
                headerTitle: () => <HeaderTitle title={'My Orders '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />
    </Stack.Navigator>
}
const MyOrdersNavigator = (props) => {
    const { navigation} = props;

    return <Stack.Navigator >

        <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
                title: 'Home',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'My Orders'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => <HeaderRight icon={null}/>,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}

        />

        <Stack.Screen
            name="CustomerOrderDetailScreen"
            component={CustomerOrderDetailScreen}
            options={{
                headerShown: false,
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
            name="CustomerOrderDetail"
            component={CustomerOrderDetail}
            options={{
                headerShown: false,
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
            name="CartScreen"
            component={cartStack}
            options={{
                headerShown: false,
            }}
        />


    </Stack.Navigator>;
};


const ProductGalleryStackNavigator = (props) => {
    const { navigation} = props;
    return <Stack.Navigator>
        <Stack.Screen
            name="ProductGalleryScreen"
            component={ProductGalleryScreen}
            options={{
                title: 'Home',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Product Gallery'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => <HeaderRight icon={null}/>,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />


        <Stack.Screen
            name="CustomerOrderDetailScreen"
            component={CustomerOrderDetailScreen}
            options={{
                headerShown: false,
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
            name="CartScreen"
            component={cartStack}
            options={{
                headerShown: false,
            }}
        />

    </Stack.Navigator>;
};

const cartStack = (props) => {
    const dispatch=useDispatch()
    const cartArr = useSelector(state => state.customerReducer?.cartArr);
    const clearCart = () => dispatch(customerActions.clearCart());
    return <Stack.Navigator>
        <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Your Cart'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight
                    icon={(cartArr !=undefined && cartArr.length > 0) ?
                        <DeleteIcon fill={Colors.white} width='25' height='25'/> : null} press={() => {
                   showClearCart(clearCart);
                }}/>,
            }}
        />

        <Stack.Screen
            name="ShippingAddressSelectionScreen"
            component={ShippingAddressSelectionScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Select Address'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="ImageZoomScreen"
            component={ImageZoomScreen}
            options={{
                headerShown: false,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'Image'}/>,
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


        <Stack.Screen
            name="OrderConfirmationScreen"
            component={OrderConfirmationScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle style={{color: Colors.rgb_377D22}} title={'Success Order'}/>,
                headerStyle: {
                    backgroundColor: 'white',
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
                headerLeft: () => <HeaderRight icon={<HomeIcon fill={Colors.rgb_377D22} width='25' height='25'/>}
                                               press={() => {
                                                   NavigationService.navigate('HomeScreen');
                                               }}/>,
            }}
        />

        <Stack.Screen
            name="AddNewAddressScreen"
            component={AddNewAddressScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Add Address'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="UpdateAddressScreen"
            component={UpdateAddressScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Update Address'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="EditShippingAddressSelectionScreen"
            component={EditShippingAddressSelectionScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Your Addresses'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />


    </Stack.Navigator>;

};


const AccountNavigator = (props) => {
    const { navigation} = props;

    return <Stack.Navigator>
        <Stack.Screen
            name="MyAccountScreen"
            component={MyAccountScreen}
            options={{
                title: 'Home',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'My Account '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => <HeaderRight icon={null}/>,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />

        <Stack.Screen
            name="UpdatePersonalDetailsScreen"
            component={UpdatePersonalDetailsScreen}
            options={{
                headerShown: false,
                headerTitle: () => <HeaderTitle title={'Change Profile '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },

                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />
        <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Change Password'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="AddNewAddressScreen"
            component={AddNewAddressScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Add Address'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="UpdateAddressScreen"
            component={UpdateAddressScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Update Address'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="EditShippingAddressSelectionScreen"
            component={EditShippingAddressSelectionScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Your Addresses'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />


    </Stack.Navigator>;
};


const FeedbackNavigator = (props) => {
    const { navigation} = props;

    return <Stack.Navigator>
        <Stack.Screen
            name="AddFeedbackScreen"
            component={AddFeedbackScreen}
            options={{
                title: 'Home',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                                   Keyboard.dismiss()
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Feedback '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => <HeaderRight icon={null}/>,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />

    </Stack.Navigator>;
};


const ContactUsNavigator = (props) => {
    const { navigation} = props;

    return <Stack.Navigator>
        <Stack.Screen
            name="ContactUsScreen"
            component={ContactUsScreen}
            options={{
                title: 'Home',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Contact Us '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => <HeaderRight icon={null}/>,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />


    </Stack.Navigator>;
};

const PurchaserNavigator = (props) => {
    const { navigation} = props;

    return <Stack.Navigator>
        <Stack.Screen
            name="PurchaserRequest"
            component={PurchaserRequest}
            options={{
                title: 'Home',
                //  headerShown: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => <HeaderRight icon={<HomeMenuIcon fill={Colors.white} width='20' height='20' style={{marginLeft:5}}/>}
                                               press={() => {
                                                   navigation.openDrawer();
                                                   Keyboard.dismiss()
                                               }}/>,
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Purchaser  Request'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerRight: () => <HeaderRight icon={null}/>,
                headerBackTitle: ' ',
                headerTintColor: '#fff',
            }}
        />


    </Stack.Navigator>;
};
export default drawerNavigator;
