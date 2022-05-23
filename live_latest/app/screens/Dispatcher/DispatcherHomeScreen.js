import React, {Component} from 'react';
import {ScrollView, View, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import LogoutIcon from '@svg/ic_logout.svg'

import {Strings} from '../../utils/Strings';
import Button from '../../components/Button';

import styles from '../Home/styles';
import Header from '../../components/Header';
import * as loginActions from '../../actions/loginActions';
import {Constants} from '../../Resources';
import colors from '../../Resources/Colors';

class DispatcherHomeScreen extends Component {


    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    logoutAlert() {
        const {logOut} = this.props;
        Alert.alert(Constants.APP_NAME, 'Are you sure you want to logout?', [
            {
                text: 'Ok',
                onPress: () => {
                    logOut();
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

    renderItem(item) {
        return <View style={styles.itemParentView}>
            <View style={styles.itemView}>
                <Text style={styles.orderTextStyle}> {'Order No GC 02034'}</Text>
                <Text style={styles.amountTextStyle}> {'Rs. 2160'}</Text>
            </View>
            <View style={styles.itemView}>
                <Text style={styles.shippingTextStyle}> {Strings.home.shipping_date}</Text>
                <Text style={styles.shippingDateTextStyle}> {'04/12/2020'}</Text>
            </View>
            <View style={styles.itemView}>
                <Button onPress={() => alert('Coming Soon')} title={Strings.home.view_details}
                        style={styles.viewDetailsButtonStyles}
                        textStyles={styles.viewDetailsTextStyle}/>
                <Text style={styles.shippingStatusTextStyle}> {'Under Shipping'}</Text>
            </View>

        </View>;
    }


    render() {

        return (
            <View style={{flex: 1}}>
                <Header title={'Dispatcher'}
                        icon={ <LogoutIcon fill={colors.white} width='62.5%' height='62.5%' />}
                        pressIcon={() => this.logoutAlert()}
                />

                <View style={[styles.container, {marginTop: 5}]}>
                    {this.renderItem()}
                    {this.renderItem()}
                    {this.renderItem()}
                </View>

            </View>);

    }

}

const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    role: state.loginReducer.role,
    errorMessage: state.loginReducer.errorMessage,
    id: state.loginReducer.id,
    isLoggedIn: state.loginReducer.isLoggedIn,

});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(loginActions.logOut()),

});
export default connect(mapStateToProps, mapDispatchToProps)(DispatcherHomeScreen);
