import React from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import HeaderBg from '../Images/assets/headerbg.png';
import MyOrdersIcon from '@svg/ic_my_order.svg';
import MyAccountIcon from '@svg/ic_my_account.svg';
import GalleryIcon from '@svg/ic_gallery.svg';
import FeedbackIcon from '@svg/ic_feedback.svg';
import CartIcon from '@svg/icon_home.svg';
import Colors from '../Resources/Colors';
import {connect} from 'react-redux';
import * as customerActions from '../actions/customerActions';
import UserImage from '../Images/assets/user_profile.png';
import styles from './Styles/DrawerStyles';
import LogoutIcon from '@svg/ic_logout.svg';
import ContactUsIcon from '@svg/ic_contact.svg';
import PurchaserIcon from '@svg/ic_add_purchaser.svg';
import { StackActions } from '@react-navigation/native';

import {Constants} from '../Resources';
import * as loginActions from '../actions/loginActions';
import LoadingSpinner from '../components/LoadingSpinner';



class DrawerContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profileImage: '',
            userName: '',
            customer_type:'',
            gst_no:'',
            isLoading:false,

        };
    }

    componentDidMount(): void {
        const {getUserDetails, userId} = this.props;
        getUserDetails(userId);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {userDetail} = this.props;
        if (userDetail != prevProps.userDetail) {

            if (userDetail && userDetail.data) {
                 this.setState({
                    profileImage:userDetail.data.photo? 'http://lakshayfabrics.in/assets/uploads/users/' + userDetail.data.photo:'',
                    userName: userDetail.data.name,
                    customer_type:userDetail.data.customer_type,
                     gst_no:userDetail.data.gst_no
                });
            }
        }
    }


    showLogout = () => {

        Alert.alert(Constants.APP_NAME, 'Are you sure you want to logout?', [
            {
                text: 'Ok',
                onPress: () => {
                  this.callLogoutApi()
                },
                style: 'cancel',
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },

        ]);
    };


    callLogoutApi(){
        const {logout,userId}=this.props
        this.setState({isLoading:true})
        fetch(Constants.BASE_URL + `/users/logout/${userId}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading:false})
                  logout()
            })
            .catch((error) => {
                this.setState({isLoading:false})
                logout()
            });

    }

    render() {
        const {profileImage, userName,gst_no,customer_type,isLoading} = this.state;

        return (
            <DrawerContentScrollView {...this.props} style={styles.drawerContent}>

                {  isLoading &&<LoadingSpinner/>}
                <View>
                    <Image
                        source={HeaderBg}
                        style={{
                            //height: 120,
                            width: '100%',
                        }}/>

                    <Image
                        source={profileImage ? {uri: profileImage} : UserImage}
                        style={styles.profileImageStyle}
                    />
                    <Text style={styles.userNameStyles}>{userName}</Text>

                    <Drawer.Section style={styles.drawerSection}>
                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <CartIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="Home"
                                onPress={() => {
                                    this.props.navigation.navigate('HomeStackNavigator');
                                }}
                            />
                        </View>


                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <MyOrdersIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="My Orders"
                                onPress={() => {
                                    this.props.navigation.navigate('MyOrders',{
                                        order_id:18,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <GalleryIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="Product Gallery"
                                onPress={() => {
                                    this.props.navigation.navigate('Gallery');
                                }}
                            />
                        </View>

                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <MyAccountIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="My Account"
                                onPress={() => {
                                    this.props.navigation.navigate('AccountNavigator');
                                }}
                            />
                        </View>
                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <FeedbackIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="Feedback"
                                onPress={() => {
                                    this.props.navigation.navigate('FeedbackNavigator');
                                }}
                            />
                        </View>

                        {(customer_type=='owner' && gst_no.length>0) &&
                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <PurchaserIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="Purchaser  Request"
                                onPress={() => {
                                    this.props.navigation.navigate('PurchaserNavigator')
                                }}
                            />
                        </View>
                        }


                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <ContactUsIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="Contact Us"
                                onPress={() => {
                                     this.props.navigation.navigate('ContactUsNavigator')
                                }}
                            />
                        </View>



                        <View style={styles.card}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <LogoutIcon fill={Colors.rgb_e15517} width={size} height={size}/>
                                )}
                                labelStyle={styles.drawerLabelStyle}
                                label="Logout"
                                onPress={() => {
                                    this.showLogout()
                                    // showLogout(onLogout)
                                }}
                            />
                        </View>

                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
        );
    }
}


const mapStateToProps = (state) => ({
    userDetail: state.customerReducer.userDetail,
    errorMessage: state.customerReducer.errorMessage,
    isUserUpdated: state.customerReducer.isUserUpdated,
    userId: state.loginReducer.id,

});

const mapDispatchToProps = (dispatch) => ({
    getUserDetails: (user_id) => dispatch(customerActions.getUserDetails(user_id)),
    updateUserDetails: (userInfo) => dispatch(customerActions.updateUserDetails(userInfo)),
    logout: () => dispatch(loginActions.logOut(), customerActions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

