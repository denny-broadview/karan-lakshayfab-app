import React, {Component} from 'react';
import {Alert, Image, TouchableOpacity, Keyboard, Platform, ScrollView, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty} from '@utils/TextUtils';
import {Constants} from '@resources';

import styles from '../Login/styles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import CustomTextInput from '../../components/CustomTextInput';
import CellIcon from '@svg/ic_telephone';
import PasswordIcon from '@svg/ic_pass';

import * as loginActions from '../../actions/loginActions';
import Button from '../../components/Button';
import LogoImage from '../../components/LogoImage';
import LoadingSpinner from '../../components/LoadingSpinner';
import ToastMessage from '../../components/ToastMessage';

class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword:'',
            isLoading:false
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const{isUpdatePassword}=this.props
        if (isUpdatePassword != prevProps.isUpdatePassword && prevState.isLoading) {
            const {errorMessage,status}=this.props
            this.setState({isLoading:false})
            if (status == '200'){
                Alert.alert(
                    Constants.APP_NAME,
                    Strings.login.password_change_msg,
                    [
                        {
                            text: "Ok",
                            onPress: () => {
                                this.props.navigation.navigate('Login')
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

    _doLogin = (password,confirmPassword) => {
        if (!password){
            ToastMessage(Strings.login.password_error_message)
        }else if (!confirmPassword){
            ToastMessage(Strings.login.confirm_password_error_message)
        } else if(password!=confirmPassword){
            ToastMessage(Strings.login.confirm_password_match_error_message)
        }
        else {
            Keyboard.dismiss()
            this.setState({isLoading: true})
            this.props.updatePassword(this.props.route.params.phone,password)
        }

    };

    render() {
        const {
            isLoading,
            password,
            confirmPassword,
        } = this.state;

        return (
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">



                <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={styles.container}>
                    {/*    <Text style={styles.signin}>{Strings.login.forgot_password_}</Text>*/}
                    <View style={[styles.parentView, {marginTop: 80}]}>
                        <LogoImage/>
                        <CustomTextInput
                            inputRef={component => this._phoneRef = component}
                            style={styles.email}
                            inputStyle={styles.textInputStyle}
                            placeholder={Strings.login.new_password_placeholder}
                            icon={<PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                            onChangeText={(index, password) => this.setState({
                                password,
                            })}
                            blurOnSubmit={false}
                            maxLength={15}
                            value={password}
                            textContentType='password'

                            onSubmitEditing={() => {
                                this._ConfirmPasswordRef.focus()
                            }}

                        />

                        <CustomTextInput
                            inputRef={component => this._ConfirmPasswordRef = component}
                            style={styles.email}
                            inputStyle={styles.textInputStyle}
                            placeholder={Strings.login.confirm_password_placeholder}
                            icon={<PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                            onChangeText={(index, confirmPassword) => this.setState({
                                confirmPassword,
                            })}
                            value={confirmPassword}
                            textContentType='password'
                            blurOnSubmit={false}
                            maxLength={15}
                            onSubmitEditing={() => {
                                this._doLogin(password,confirmPassword);
                            }}

                        />
                        <Button title={Strings.login.reset} onPress={() => {
                            this._doLogin(password,confirmPassword);
                        }} style={{width: '47%',marginTop:40,marginBottom:20}}/>

                    </View>
                    {isLoading && <LoadingSpinner/>}
                </TouchableOpacity>
            </ScrollView>

        );
    }

}

const mapStateToProps = (state) => ({
    status:state.loginReducer.status,
    errorMessage:state.loginReducer.errorMessage,
    isUpdatePassword:state.loginReducer.isUpdatePassword
});

const mapDispatchToProps = (dispatch) => ({
    updatePassword: (phone,password) => dispatch(loginActions.requestUpdatePassword(phone,password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
