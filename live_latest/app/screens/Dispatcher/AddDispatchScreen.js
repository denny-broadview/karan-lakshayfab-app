import React, {Component} from 'react';
import {Alert, Keyboard, Platform, ScrollView, TouchableOpacity, TextInput, View} from 'react-native';
import {connect} from 'react-redux';

import moment from 'moment';
import LoadingSpinner from '../../components/LoadingSpinner';
import TransportIcon from '@svg/ic_transportname';
import CalendarIcon from '@svg/ic_calendar';
import OtherNotesIcon from '@svg/ic_othernotes';

import CellIcon from '@svg/ic_telephone';
import NumberIcon from '@svg/ic_number';
import AddressIcon from '@svg/ic_address';
import UserIcon from '@svg/user';

import styles from './Styles/AddDispatchstyles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import * as loginActions from '../../actions/loginActions';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import TotalPrice from '../../components/TotalPrice';
import DateTimePicker from '../../components/DateTimePicker';
import {exp} from 'react-native-reanimated';

class AddDispatchScreen extends Component {
    constructor(props) {
        super(props);

        this.dateType = '';
        this.userInfo = {};
        this.today = new Date();
        let minimumDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
        this.state = {
            transportation_name: '',
            LR_number: '',
            bill_number: '',
            notes: '',
            expected_delivery_date: '',
            dispatch_date:'',
            minimumDate,
            isLoading: false,
            oldPassword: '',
        };
    }


    handleValidations() {
        const {
            isLoading,
            showDateTimePicker,
            transport_name,
            LR_number,
            bill_number,
            expected_delivery_date,
            weeklyOffDay,
            minimumDate,
            dispatch_date,
            notes,
            type, oldPassword,
        } = this.state;

        if (!transport_name) {
            ToastMessage('Please enter Transport name');
        } else if (!LR_number) {
            ToastMessage('Please enter LR number');
        } else if (!bill_number) {
            ToastMessage('Please enter Bill number');
        }else if (!dispatch_date) {
            ToastMessage('Please enter Dispatched date');
        } else if (!expected_delivery_date) {
            ToastMessage('Please enter Expected Delivery date');
        } else if (!notes) {
            ToastMessage('Please enter notes');
        } else {
            let dd = {
                transportation_name:transport_name,
                LR_number,
                bill_number,
                expected_delivery_date,
                shipping_date:dispatch_date,
                notes,
                order_id: this.props.route.params.order_id,
            };
            this.callApi(dd);
        }

    }

    callApi(data) {
        this.setState({isLoading: true});
        console.log('json--',data)
        fetch(Constants.BASE_URL + '/orders/add-shipment', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.setState({isLoading: false});
                if (status == '200') {
                    //  clearCart()
                    this.props.navigation.goBack();
                } else {
                    ToastMessage(message);
                }


            })
            .catch((error) => {

                this.setState({isLoading: false});
                ToastMessage(error.message.toString());
            });
    }



    _handleSelectedDate = (selectedDate) => {
        switch (this.dateType) {
            case Constants.SIGN_UP_TYPES.DISPATCHED_DATE:
                this.setState({dispatch_date: selectedDate});

                break;
            case Constants.SIGN_UP_TYPES.DELIVERY_DATE:
                this.setState({expected_delivery_date: selectedDate});

                break;
        }
    };

    render() {
        const {
            isLoading,
            showDateTimePicker,
            transport_name,
            LR_number,
            bill_number,
            dispatch_date,
            expected_delivery_date,
            minimumDate,
            notes,
        } = this.state;

        return (
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
                <TouchableOpacity  activeOpacity={1} style={styles.container} onPress={()=>Keyboard.dismiss()}>
                    {isLoading && <LoadingSpinner/>}

                    <DateTimePicker visible={showDateTimePicker}
                                    handleConfirm={(clickedDate) => {
                                        let dd = moment(clickedDate).format('DD-MM-YYYY');
                                        this._handleSelectedDate(dd);
                                    }}
                                    value={minimumDate}

                                    minimumDate={minimumDate}
                        // maximumDate={maximumDate}
                                    hideDatePicker={(status) => {
                                        this.setState({showDateTimePicker: status});
                                    }}/>

                    <View style={{margin: 20}}>


                        <View style={styles.textInputParentStyle}>

                            <TransportIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInputStyle}
                                placeholder={'Transport Name'}
                                onChangeText={(transport_name) => this.setState({
                                    transport_name,
                                })}
                                value={transport_name}
                                maxLength={20}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this._LrNoRef.focus();
                                }}
                                blurOnSubmit={false}/>

                        </View>

                        <View style={styles.textInputParentStyle}>

                            <NumberIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInputStyle}
                                ref={ref => this._LrNoRef = ref}
                                placeholder={'LR No'}
                                onChangeText={(LR_number) => this.setState({
                                    LR_number,
                                })}
                                value={LR_number}
                                secureTextEntry={false}
                                maxLength={20}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this._billRef.focus();
                                }}
                                blurOnSubmit={false}/>

                        </View>
                        <View style={styles.textInputParentStyle}>

                            <NumberIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInputStyle}
                                ref={ref => this._billRef = ref}
                                placeholder={'Bill No'}
                                onChangeText={(bill_number) => this.setState({
                                    bill_number,
                                })}
                                value={bill_number}
                                secureTextEntry={false}
                                maxLength={20}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                }}
                                blurOnSubmit={false}/>

                        </View>

                        <TouchableOpacity style={styles.textInputParentStyle} onPress={() => {
                            this.setState({showDateTimePicker: true});
                            this.dateType=Constants.SIGN_UP_TYPES.DISPATCHED_DATE
                        }}>

                            <CalendarIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInputStyle}
                                ref={ref => this._passwordRef = ref}
                                placeholder={'Dispatch  Date'}
                                onChangeText={(dispatch_date) => this.setState({
                                    dispatch_date,
                                })}
                                value={dispatch_date}
                                secureTextEntry={false}
                                maxLength={20}
                                returnKeyType={'next'}
                                editable={false}
                                onSubmitEditing={() => {
                                    this._confirmpasswordRef.focus();
                                }}
                                blurOnSubmit={false}/>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.textInputParentStyle} onPress={() => {
                            this.dateType=Constants.SIGN_UP_TYPES.DELIVERY_DATE
                            this.setState({showDateTimePicker: true});

                        }}>

                            <CalendarIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInputStyle}
                                ref={ref => this._passwordRef = ref}
                                placeholder={'Expected Delivery Date'}
                                onChangeText={(expected_delivery_date) => this.setState({
                                    expected_delivery_date,
                                })}
                                value={expected_delivery_date}
                                secureTextEntry={false}
                                maxLength={20}
                                returnKeyType={'next'}
                                editable={false}
                                onSubmitEditing={() => {
                                    this._confirmpasswordRef.focus();
                                }}
                                blurOnSubmit={false}/>

                        </TouchableOpacity>

                        <View style={[styles.textInputParentStyle, {
                            height: 100,
                            alignItems: 'flex-start',
                            paddingTop: 10,
                        }]}>

                            <OtherNotesIcon width={23} height={23} fill={colors.rgb_e15517}/>
                            <TextInput
                                allowFontScaling={false}
                                style={[styles.textInputStyle, {justifyContent: 'center',paddingRight:20,paddingTop:-15}]}
                                placeholder={'Other Notes'}
                                onChangeText={(notes) => this.setState({
                                    notes,
                                })}
                                value={notes}
                                secureTextEntry={false}
                                multiline={true}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {

                                }}
                                blurOnSubmit={false}/>

                        </View>


                        <TotalPrice style={{width: '48%', alignSelf: 'center', marginTop: 20}}
                                    press={() => this.handleValidations()} t2={Strings.logs.submit} t1={''}
                                    t3={''}/>


                    </View>
                </TouchableOpacity>


            </ScrollView>);
    }


}

const mapStateToProps = (state) => ({
    signupData: state.loginReducer.signupData,
    role: state.loginReducer.role,
    errorMessage: state.loginReducer.errorMessage,
    id: state.loginReducer.id,
    isLoggedIn: state.loginReducer.isLoggedIn,
    status: state.loginReducer.status,
    isSignedIn: state.loginReducer.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (userInfo) => dispatch(loginActions.requestSignup(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDispatchScreen);
