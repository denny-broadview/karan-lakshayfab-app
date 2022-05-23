import React, {useEffect} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import * as customerActions from 'app/actions/customerActions';

import styles from './styles';

import LogoutIcon from '@svg/ic_logout.svg';
import colors from '../../Resources/Colors';
import {Strings} from '../../utils/Strings';
import HomeItem from '../../components/HomeItem';
import {Constants} from '../../Resources';
import Header from '../../components/Header';
import FeedbackIcon from '@svg/feedback'
import GalleryIcon from '@svg/gallery';


// Permission constants Orders,Shipment,CRM,Reports,Gallery,Feedback
const ORDERS = 'Orders'
const SHIPMENT = 'Shipment'
const CRM = 'CRM'
const REPORTS = 'Reports'
const GALLERY = 'Gallery'
const FEEDBACK = 'Feedback'

function itemPress(isAdmin, navigation, adminScreen, customerScreen) {
    if (isAdmin) {
        //alert('coming soon')
        navigation.navigate(adminScreen);
    } else {
        navigation.navigate(customerScreen);
    }

}

function logoutAlert(onLogout) {

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

function HomeScreen(props) {
    const dispatch = useDispatch();
    const onLogout = () => dispatch(loginActions.logOut(), customerActions.logOut());

    let menuPermissions =  useSelector(state => {return (state.loginReducer.loginData?.menu_permission?.menu_name)});

    const [isAdmin, setIsAdmin] = React.useState(false);
    const role = useSelector(state => state.loginReducer.role);
    const {navigation} = props;
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        console.log('Menu Permission ',menuPermissions);
        setIsAdmin(role === Constants.ROLE.ADMIN);
    });

    const renderMenuItem = () => { 
        if (menuPermissions != null) {
            return (
                <>
                <View style={[styles.parentView, {marginTop: 20}]}>
                    {menuPermissions.includes(ORDERS) && <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'AdminOrders', 'FabricSelectionScreen'); //FabricSelectionScreen
                            // navigation.navigate('FabricSelectionScreen');
                        }}
                        title={isAdmin ? Strings.home.orders : Strings.home.shop_now}
                        icon={isAdmin ? <Image source={require('../../Images/assets/purchase_order.png')}/> :
                            <Image source={require('../../Images/assets/shopping_cart.png')}/>}
                    />}
                    {menuPermissions.includes(SHIPMENT) && <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'ShipmentScreen', 'MyOrders');
                        }}
                        title={isAdmin ? Strings.home.shipment : Strings.home.my_orders}
                        icon={isAdmin ? <Image source={require('../../Images/assets/shippment.png')}/> :
                            <Image source={require('../../Images/assets/purchase_order.png')}/>}
                    />}
                </View>

                <View style={styles.parentView}>
                    {menuPermissions.includes(CRM) && <HomeItem
                        onPress={() => {
                            //ProductGalleryScreen
                            itemPress(isAdmin, navigation, 'CRMScreen', 'ProductGalleryScreen');

                        }}
                        title={isAdmin ? Strings.home.crm : Strings.home.product_gallery}
                        icon={isAdmin ? <Image source={require('../../Images/assets/crm.png')}/> :
                            <Image source={require('../../Images/assets/gallery.png')}/>}
                    />}
                    {menuPermissions.includes(REPORTS) && <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'ReportsScreen', 'MyAccountScreen');
                        }}
                        title={isAdmin ? Strings.home.reports : Strings.home.my_account}
                        icon={isAdmin ? <Image source={require('../../Images/assets/report.png')}/> :
                            <Image source={require('../../Images/assets/account.png')}/>}
                    />}

                </View>

                <View style={styles.parentView}>
                    {menuPermissions.includes(GALLERY) && <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'AdminAlbumGalleryScreen', 'CustomerHomeScreen');
                            //    navigation.navigate('AdminProductGalleryScreen');
                        }}
                        title={isAdmin ? Strings.home.product_gallery:Strings.home.home}
                        icon={ <GalleryIcon width={60} height={60} fill={colors.rgb_e15517}/>}
                    />}
                    {menuPermissions.includes(FEEDBACK) && <HomeItem
                        onPress={() => {
                            //   navigation.navigate('FeedbackListingScreen');
                            itemPress(isAdmin, navigation, 'FeedbackListingScreen', 'AddFeedbackScreen');
                        }}
                        title={ Strings.home.feedback}
                        icon={<FeedbackIcon width={70} height={70} fill={colors.rgb_e15517}/>}
                    />}

                </View>
                </>
            )
        } else {
            return (
                <>
                    <View style={[styles.parentView, {marginTop: 20}]}>
                    <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'AdminOrders', 'FabricSelectionScreen'); //FabricSelectionScreen
                            // navigation.navigate('FabricSelectionScreen');
                        }}
                        title={isAdmin ? Strings.home.orders : Strings.home.shop_now}
                        icon={isAdmin ? <Image source={require('../../Images/assets/purchase_order.png')}/> :
                            <Image source={require('../../Images/assets/shopping_cart.png')}/>}
                    />
                    <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'ShipmentScreen', 'MyOrders');
                        }}
                        title={isAdmin ? Strings.home.shipment : Strings.home.my_orders}
                        icon={isAdmin ? <Image source={require('../../Images/assets/shippment.png')}/> :
                            <Image source={require('../../Images/assets/purchase_order.png')}/>}
                    />
                </View>

                <View style={styles.parentView}>
                    <HomeItem
                        onPress={() => {
                            //ProductGalleryScreen
                            itemPress(isAdmin, navigation, 'CRMScreen', 'ProductGalleryScreen');

                        }}
                        title={isAdmin ? Strings.home.crm : Strings.home.product_gallery}
                        icon={isAdmin ? <Image source={require('../../Images/assets/crm.png')}/> :
                            <Image source={require('../../Images/assets/gallery.png')}/>}
                    />
                    <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'ReportsScreen', 'MyAccountScreen');
                        }}
                        title={isAdmin ? Strings.home.reports : Strings.home.my_account}
                        icon={isAdmin ? <Image source={require('../../Images/assets/report.png')}/> :
                            <Image source={require('../../Images/assets/account.png')}/>}
                    />

                </View>

                <View style={styles.parentView}>
                    <HomeItem
                        onPress={() => {
                            itemPress(isAdmin, navigation, 'AdminAlbumGalleryScreen', 'CustomerHomeScreen');
                            //    navigation.navigate('AdminProductGalleryScreen');
                        }}
                        title={isAdmin ? Strings.home.product_gallery:Strings.home.home}
                        icon={ <GalleryIcon width={60} height={60} fill={colors.rgb_e15517}/>}
                    />
                    <HomeItem
                        onPress={() => {
                            //   navigation.navigate('FeedbackListingScreen');
                            itemPress(isAdmin, navigation, 'FeedbackListingScreen', 'AddFeedbackScreen');
                        }}
                        title={ Strings.home.feedback}
                        icon={<FeedbackIcon width={70} height={70} fill={colors.rgb_e15517}/>}
                    />

                </View>
                </>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Header isDisplay={true} icon={<LogoutIcon fill={colors.white} width='62.5%' height='62.5%'/>}
                    title={isAdmin ? 'Welcome Admin!' : 'Home'} pressIcon={() => logoutAlert(onLogout)}/>

            <ScrollView>
                {renderMenuItem()}
            </ScrollView>

        </View>
    );

}

export default HomeScreen;
