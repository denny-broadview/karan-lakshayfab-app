import {createStackNavigator} from '@react-navigation/stack';
import HeaderTitle from '../components/HeaderTitle';
import Colors from '../Resources/Colors';
import {Text, TouchableOpacity, View} from 'react-native';
import AlbumIcon from '@svg/ic_folder_upload.svg';
import PhotoIcon from '@svg/ic_photo.svg';
import NewOrderIcon from '@svg/ic_new_order.svg';
import ApproveIcon from '@svg/ic_approve.svg';
import RejectIcon from '@svg/ic_rejected.svg';
import DispatchedIcon from '@svg/ic_dispatched.svg';
import * as React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import ImageZoomScreen from '../screens/Customer/ImageZoomScreen';
import HeaderRight from '../components/HeaderRight';
import UploadImageScreen from '../screens/Admin/UploadImageScreen';
import CustomerReportsScreen from '../screens/Admin/CustomerReportsScreen';
import ProductReportsScreen from '../screens/Admin/ProductReportsScreen';
import OddReportsScreen from '../screens/Admin/OddReportsScreen';
import DispatchOrdersReportsScreen from '../screens/Admin/DispatchOrdersReportsScreen';
import AdminProductGalleryScreen from '../screens/Admin/AdminProductGalleryScreen';
import FeedbackListingScreen from '../screens/Admin/FeedbackListingScreen';
import AdminOrderDetailScreen from '../screens/Admin/AdminOrderDetailScreen';
import ShipmentScreen from '../screens/Admin/ShipmentScreen';
import AddDispatchScreen from '../screens/Dispatcher/AddDispatchScreen';
import ReportsScreen from '../screens/Admin/ReportsScreen';
import CRMScreen from '../screens/Admin/CRMScreen';
import LogsScreen from '../screens/Admin/LogsScreen';
import Styles from './Styles';
import NewOrders from '../screens/Admin/NewOrders';
import ApproveOrders from '../screens/Admin/ApproveOrders';
import RejectedOrders from '../screens/Admin/RejectedOrders';
import DeliveredOrders from '../screens/Admin/DeliveredOrders';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AdminAlbumGalleryScreen from '../screens/Admin/AdminAlbumGalleryScreen';
import UploadAlbumScreen from '../screens/Admin/UploadAlbumScreen';
import UpdatePersonalDetailsScreen from '../screens/Customer/UpdatePersonalDetailsScreen';
import PdfScreen from '../screens/Admin/PdfScreen'
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const homeOptions = {
    headerShown: false,
};


function AdminOrdersTabBar({state, descriptors, navigation}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                let icon = null;
                switch (index) {
                    case 0:
                        icon =
                            <NewOrderIcon fill={isFocused ? Colors.rgb_e15517 : Colors.white} width='25' height='25'/>;
                        break;
                    case 1:
                        icon =
                            <ApproveIcon fill={isFocused ? Colors.rgb_e15517 : Colors.white} width='25' height='25'/>;
                        break;
                    case 2:
                        icon = <RejectIcon fill={isFocused ? Colors.rgb_e15517 : Colors.white} width='18' height='18'/>;
                        break;
                    case 3:
                        icon =
                            <DispatchedIcon fill={isFocused ? Colors.rgb_e15517 : Colors.white} width='30'
                                            height='30'/>;
                        break;
                }


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
                        style={[Styles.adminTabBarContainer, !isFocused ? {backgroundColor: Colors.rgb_e15517} : {backgroundColor: 'white'}]}
                    >
                        {icon}

                        <Text style={[Styles.adminTabsTextStyle, {
                            color: !isFocused ? 'white' : Colors.rgb_e15517,
                        }]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const AdminOrdersTabNavigator = () => (
    <Tab.Navigator tabBar={props => <AdminOrdersTabBar {...props} />}>
        <Tab.Screen name="New" component={NewOrders}/>
        <Tab.Screen name="Approved" component={ApproveOrders}/>
        <Tab.Screen name="Rejected" component={RejectedOrders}/>
        <Tab.Screen name="Dispatched" component={DeliveredOrders}/>

    </Tab.Navigator>
);


const AdminStackNavigator = (props) => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            listeners={({navigation}) => ({
                focus:async () => {
                    await AsyncStorage.removeItem('ImageAlbum')
                }
            })}
            options={homeOptions}/>

        <Stack.Screen
            name="ImageZoomScreen"
            component={ImageZoomScreen}
            options={{
                headerShown: false,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'My Orders '}/>,
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
            name="ReportsScreen"
            component={ReportsStack}
            options={homeOptions}
        />

        <Stack.Screen
            name="ShipmentScreen"
            component={ShipmentStack}
            options={homeOptions}
        />

        <Stack.Screen
            name="AdminOrders"
            component={OrdersStack}
            options={homeOptions}
        />


        <Stack.Screen
            name="CRMScreen"
            component={CRMStack}
            options={homeOptions}
        />

        <Stack.Screen
            name="AdminAlbumGalleryScreen"
            component={ProductGalleryStack}
            options={homeOptions}
        />

        <Stack.Screen
            name="FeedbackListingScreen"
            component={FeedbackListingScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Feedback '}/>,
                headerRight: () => <HeaderRight/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',

            }}
        />

    </Stack.Navigator>
);


const OrdersStack = (props) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="AdminOrders"
            component={AdminOrdersTabNavigator}
            options={{
                headerShown: true,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'My Orders '}/>,
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
    </Stack.Navigator>;
};
const ShipmentStack = (props) => {
    return <Stack.Navigator>

        <Stack.Screen
            name="ShipmentScreen"
            component={ShipmentScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Shipment'}/>,
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
    </Stack.Navigator>;
};

const CRMStack = (props) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="CRMScreen"
            component={CRMScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Customers'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
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
            name="LogsScreen"
            component={LogsScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Device Logs'}/>,
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
const ReportsStack = (props) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="ReportsScreen"
            component={ReportsScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Reports'}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="CustomerReportsScreen"
            component={CustomerReportsScreen}
            options={{
                headerShown: true,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'Customer Reports '}/>,
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
            name="ProductReportsScreen"
            component={ProductReportsScreen}
            options={{
                headerShown: true,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'Product Reports '}/>,
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
            name="OddReportsScreen"
            component={OddReportsScreen}
            options={{
                headerShown: true,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'Odd Reports '}/>,
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
            name="DispatchOrdersReportsScreen"
            component={DispatchOrdersReportsScreen}
            options={{
                headerShown: true,
                headerRight: () => <HeaderRight/>,
                headerTitle: () => <HeaderTitle title={'Dispatch Orders Reports '}/>,
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
    </Stack.Navigator>;
};

const ProductGalleryStack = (props) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="AdminAlbumGalleryScreen"
            component={AdminAlbumGalleryScreen}
            listeners={({ navigation }) => ({
                blur:async () => {
                    // await AsyncStorage.removeItem('ImageAlbum')
                }

            })}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Album'}/>,
                headerRight: () => <HeaderRight icon={<AlbumIcon fill={Colors.white} width='25' height='25'/>}
                                                press={() => {
                                                    props.navigation.navigate('UploadAlbumScreen')
                                                }}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',

            }}
        />

        <Stack.Screen
            name="UploadAlbumScreen"
            component={UploadAlbumScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Album '}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',
                headerRight: () => <HeaderRight/>,
            }}
        />

        <Stack.Screen
            name="AdminProductGalleryScreen"
            component={AdminProductGalleryScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Gallery '}/>,
                headerRight: () => <HeaderRight icon={<PhotoIcon fill={Colors.white} width='20' height='20'/>}
                                                press={() => {

                                                    let y=props.route.state.routes.filter((e)=>{
                                                        return e.params
                                                    })
                                                    props.navigation.navigate('UploadImageScreen',{
                                                        album_id:y[0].params.album_id,
                                                    })
                                                }}/>,
                headerStyle: {
                    backgroundColor: Colors.rgb_e15517,
                },
                headerBackTitle: ' ',
                headerTintColor: '#fff',

            }}
        />

        <Stack.Screen
            name="UploadImageScreen"
            component={UploadImageScreen}
            options={{
                headerShown: true,
                headerTitle: () => <HeaderTitle title={'Gallery '}/>,
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
                headerTitle: () => <HeaderTitle title={'My Orders '}/>,
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


    </Stack.Navigator>;
};


export default AdminStackNavigator;
