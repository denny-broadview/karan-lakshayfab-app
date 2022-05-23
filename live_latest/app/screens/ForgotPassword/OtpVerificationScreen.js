import React, {Component} from 'react';
import {Alert, TouchableOpacity, ImageBackground, Keyboard, Platform, ScrollView, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty} from '@utils/TextUtils';
import {Constants} from '@resources';

import styles from '../Login/styles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import CustomTextInput from '../../components/CustomTextInput';
import CellIcon from '@svg/ic_telephone';
import * as loginActions from '../../actions/loginActions';
import Button from '../../components/Button';
import LogoImage from '../../components/LogoImage';
import LoadingSpinner from '../../components/LoadingSpinner';
import ToastMessage from '../../components/ToastMessage';
import RNOtpVerify from 'react-native-otp-verify'

class OtpVerificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            otp:'',
            isLoading:false
        };
    }

    componentDidMount() {
        let otp = this.props.route.params != undefined ? this.props.route.params.forgotOTP : ''
        
        RNOtpVerify.getHash()
        .then(val => {
            this.setState({otp})
            console.log('HASH VAL ',val)
        })

        // RNOtpVerify.getOtp()
        // .then(p => RNOtpVerify.addListener(this.otpHandler))
        // .catch(p => console.log(p))
    }

    otpHandler = (message) => {
        console.log('Message ', message)
        const otp = /(\d{6})/g.exec(message)[1];
        console.log('OTP ', otp);
        RNOtpVerify.removeListener()
    }

    componentWillUnmount() {
        RNOtpVerify.removeListener()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {isVerifyOtp,route,}=this.props
        if (isVerifyOtp != prevProps.isVerifyOtp && prevState.isLoading) {
            const {errorMessage,status}=this.props

            this.setState({isLoading:false})

            if (status=='200'){

                Alert.alert(
                    Constants.APP_NAME,
                    Strings.login.otp_verify_message,
                    [
                        {
                            text: "Ok",
                            onPress: () => {
                                this.props.navigation.navigate('ResetPasswordScreen',{
                                    phone:route.params.phone
                                })
                            },
                            style: "cancel"
                        }

                    ],
                    { cancelable: false })

            }else {
                ToastMessage(errorMessage)
            }
        }
    }

    _doLogin = (otp) => {
        if (!otp){
            ToastMessage(Strings.login.otp_error_message)
        }else if (otp.length<6){
            ToastMessage(Strings.login.otp_error_message)
        }else {
            Keyboard.dismiss()
            this.setState({isLoading:true})
            this.props.verifyOtp(this.props.route.params.phone,otp)

        }

    };

    render() {
        const {
            isLoading,
            phone,
            otp
        } = this.state;

        return (
            <ImageBackground source={require('../../Images/assets/bg.png')} resizeMode="cover"
                             style={styles.scrollView}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">



                <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={styles.container}>
                    {/*    <Text style={styles.signin}>{Strings.login.forgot_password_}</Text>*/}
                    <View style={[styles.parentView, {marginTop: 80}]}>
                        <LogoImage/>
                        <CustomTextInput
                            inputRef={component => this._phoneRef = component}
                            style={styles.email}
                            inputStyle={styles.textInputStyle}
                            placeholder={Strings.login.otp_placeholder}
                            icon={<CellIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                            onChangeText={(index, phone) => this.setState({
                                phone,
                            })}
                            value={otp.toString()}
                            maxLength={6}
                            keyboardType={'number-pad'}
                            onSubmitEditing={() => {
                                this._doLogin(phone);
                            }}

                        />

                        <Button title={Strings.login.send} onPress={() => {
                            this._doLogin(otp);
                        }} style={{width: '47%',marginTop:40,marginBottom:20}}/>

                    </View>
                    {isLoading && <LoadingSpinner/>}
                </TouchableOpacity>
            </ScrollView>
            </ImageBackground>

        );
    }

}

const mapStateToProps = (state) => ({
    status:state.loginReducer.status,
    errorMessage:state.loginReducer.errorMessage,
    isVerifyOtp:state.loginReducer.isVerifyOtp

});

const mapDispatchToProps = (dispatch) => ({
    verifyOtp: (phone,otp) => dispatch(loginActions.requestVerifyOtp(phone,otp)),
    forgot: (phone) => dispatch(loginActions.requestForgotPassword(phone))
});

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerificationScreen);
