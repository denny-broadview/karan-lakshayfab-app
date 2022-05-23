import messaging from '@react-native-firebase/messaging';

import CellIcon from '@svg/ic_telephone';
import PasswordIcon from '@svg/ic_pass';

import React from 'react';

import {Keyboard, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {connect} from 'react-redux';

import * as loginActions from 'app/actions/loginActions';

import DeviceInfo from 'react-native-device-info';

import VersionCheck from 'react-native-version-check';

import Colors from '../../Resources/Colors';
import Button from '../../components/Button';
import CustomTextInput from '../../components/CustomTextInput';
import LoadingSpinner from '../../components/LoadingSpinner';
import LogoImage from '../../components/LogoImage';
import ToastMessage from '../../components/ToastMessage';
import {Strings} from '../../utils/Strings';

import styles from './styles';


class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            phone: '',
            phoneError: false,
            password: '',
            phoneErrorMessage: '',
            passwordError: false,
            passwordErrorMessage: '',
        };

        this.location = '';
    }

    componentDidMount(): void {
        messaging().getToken().then((result) => {
            console.log(JSON.stringify(result));
            this.setState({fcm_token: result});
        });

        DeviceInfo.getDeviceName().then(deviceName => {

            this.setState({deviceName});
        });
        this.requestUserPermission().then()
    }

    async  requestUserPermission() {
        const authStatus = await messaging().requestPermission({
            alert: true,
            announcement: false,
            badge: true,
            carPlay: true,
            provisional: false,
            sound: true,
        });

        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('User has notification permissions enabled.');
            const fcmToken = await messaging().getToken();
            console.log(fcmToken);
            // this.setState({fcm_token:fcmToken})
        } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            console.log('User has provisional notification permissions.');
        } else {
            console.log('User has notification permissions disabled');
        }
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {loginData, status, errorMessage} = this.props;

        if (this.props != prevProps && prevState.isLoading) {
            this.setState({isLoading: false});
            if (status==402){
                this.props.navigation.navigate('SignupScreen')
            }
            else if (errorMessage) {
                ToastMessage(errorMessage);
            }
        }
    }


    _doLogin = (phone, password) => {
        const {
            deviceName,
            fcm_token,
        } = this.state;

        if (!phone) {
            //this.setState({phoneError:true,passwordError:false,phoneErrorMessage:Strings.login.phone_number_error_message})
            ToastMessage(Strings.login.phone_number_error_message);

        } else if (phone.length < 10) {
            ToastMessage(Strings.login.phone_number_len_error_message);
            // this.setState({phoneError:true,passwordError:false,phoneErrorMessage:Strings.login.phone_number_len_error_message})
        } else if (!password) {
            // this.setState({phoneError:false,passwordError:true,passwordErrorMessage:Strings.login.password_error_message})
            ToastMessage(Strings.login.password_error_message);
        } else {
            //  this.setState({phoneError:false,passwordError:false,isLoading:true})
           Keyboard.dismiss();
            this.setState({isLoading: true});

            let device_id = DeviceInfo.getUniqueId();

            let data = {
                phone,
                password,
                device_id,
                fcm_token,
                device_type: Platform.OS,
                device_name: deviceName,
                version:VersionCheck.getCurrentVersion()
            };
            this.props.login(data);

        }

    };


    render() {
        const {
            isLoading,
            phone,
            password,
        } = this.state;

        return (
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

                <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={styles.container}>

                    <Text style={styles.signin}>{Strings.login.signin}</Text>
                    <View style={styles.parentView}>
                        <LogoImage/>

                        <CustomTextInput
                            inputRef={component => this._phoneRef = component}
                            style={styles.email}
                            inputStyle={styles.textInputStyle}
                            placeholder={Strings.login.phone_no_password}
                            icon={<CellIcon width={23} height={23} fill={Colors.rgb_e15517}/>}
                            //autoFocus={!isValidEmail}
                            //textContentType='phone'
                            onChangeText={(index, phone) => this.setState({
                                phone,
                            })}
                            value={phone}
                            maxLength={10}
                            returnKeyType={'done'}
                            keyboardType={'number-pad'}
                            onSubmitEditing={() => {
                                this._passwordRef.focus();
                            }}
                            blurOnSubmit={false}
                        />

                        <CustomTextInput
                            inputRef={component => this._passwordRef = component}
                            style={[styles.email, {marginTop: 30}]}
                            inputStyle={styles.textInputStyle}
                            placeholder={Strings.login.password_placeholder}
                            icon={<PasswordIcon width={23} height={23} fill={Colors.rgb_e15517}/>}
                            maxLength={20}
                            value={password}
                            returnKeyType={'done'}
                            textContentType='password'
                            onChangeText={(index, password) => this.setState({
                                password,
                            })}
                            // error={passwordError}
                            onSubmitEditing={() => {
                                this._doLogin(phone, password);

                            }}
                        />

                        <Button title={Strings.login.login} onPress={() => {this._doLogin(phone, password);
                        }} style={{marginTop: 30}}/>
                        <Text style={styles.forgotPasswordTextStyle}
                              onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>{Strings.login.forgot_password}</Text>
                        <TouchableOpacity style={{flexDirection: 'row'}}
                                          onPress={() => this.props.navigation.navigate('SignupScreen')}>
                            <Text
                                style={[styles.forgotPasswordTextStyle, {color: Colors.rgb_383431}]}>{Strings.login.dont_have_Account}</Text>
                            <Text style={styles.forgotPasswordTextStyle}>{' ' + Strings.signup.signup}</Text>
                        </TouchableOpacity>

                    </View>
                    {isLoading && <LoadingSpinner/>}

                </TouchableOpacity>
            </ScrollView>

        );
    }

}

const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    role: state.loginReducer.role,
    errorMessage: state.loginReducer.errorMessage,
    id: state.loginReducer.id,
    isLoggedIn: state.loginReducer.isLoggedIn,
    status:state.loginReducer.status

});

const mapDispatchToProps = (dispatch) => ({
    login: (input) => dispatch(loginActions.requestLogin(input)),

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
