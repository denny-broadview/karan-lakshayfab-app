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

class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            isLoading:false
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props != prevProps && prevState.isLoading) {
            const {errorMessage,status, forgotOTP}=this.props
            this.setState({isLoading:false})
            if (status=='200'){
                console.log(forgotOTP)
                const {phone}=this.state

                Alert.alert(
                    Constants.APP_NAME,
                    Strings.login.otp_send_message,
                    [
                        {
                            text: "Ok",
                            onPress: () => {
                                this.props.navigation.navigate('OtpVerificationScreen',{phone, forgotOTP})
                            },
                            style: "cancel"
                        }

                    ],
                    { cancelable: false })

            }else{
                ToastMessage(errorMessage)
            }

        }
    }

    _doLogin = (phone) => {
        if (!phone){
            ToastMessage(Strings.login.phone_number_error_message)
        }else if (phone.length<10){
            ToastMessage(Strings.login.phone_number_len_error_message)
        }else {
            Keyboard.dismiss()
            this.setState({isLoading:true})
            let res = this.props.forgot(phone)
            console.log('OTP RES :: ', res)
        }

    };

    render() {
        const {
            isLoading,
            phone,
        } = this.state;

        return (
            <ImageBackground source={require('../../Images/assets/bg.png')} resizeMode="cover"
                             style={styles.scrollView}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">


                <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()}  style={styles.container}>
                    {/*    <Text style={styles.signin}>{Strings.login.forgot_password_}</Text>*/}
                    <View style={[styles.parentView, {marginTop: 80}]}>
                        <LogoImage/>
                        <CustomTextInput
                            inputRef={component => this._phoneRef = component}
                            style={styles.email}
                            inputStyle={styles.textInputStyle}
                            placeholder={Strings.login.phone_no_password}
                            icon={<CellIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                            onChangeText={(index, phone) => this.setState({
                                phone,
                            })}
                            value={phone}
                            blurOnSubmit={false}
                            maxLength={10}
                            keyboardType={'number-pad'}
                            onSubmitEditing={() => {
                                this._doLogin(phone);
                            }}

                        />

                        <Button title={Strings.login.send} onPress={() => {
                            this._doLogin(phone);
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
    forgotOTP: state.loginReducer.forgotOTP
});

const mapDispatchToProps = (dispatch) => ({
    forgot: (phone) => dispatch(loginActions.requestForgotPassword(phone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
