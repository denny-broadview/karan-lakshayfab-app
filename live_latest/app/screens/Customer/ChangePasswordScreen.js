import React, {Component} from 'react';
import {Alert, Keyboard, TouchableOpacity, ScrollView, TextInput, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Constants} from '@resources';

import styles from './Styles/ChangePasswordStyles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import CellIcon from '@svg/ic_telephone';
import * as loginActions from '../../actions/loginActions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ToastMessage from '../../components/ToastMessage';
import PasswordIcon from '@svg/ic_pass';
import TotalPrice from '../../components/TotalPrice';
import * as customerActions from '../../actions/customerActions';
import CustomTextInput from '../../components/CustomTextInput';

class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            oldPassword: '',
            newPassword: '',
            isLoading: false,
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props != prevProps && prevState.isLoading) {
            const {errorMessage, status} = this.props;

            this.setState({isLoading: false});
            ToastMessage(errorMessage);
            if (status == '200') {
                this.props.navigation.navigate('OtpVerificationScreen');
            }

        }
    }

    handleValidations = () => {
        const {oldPassword, newPassword} = this.state;
        Keyboard.dismiss();
        if (!oldPassword) {
            ToastMessage(Strings.login.old_password_error_message);
        } else if (!newPassword) {
            ToastMessage(Strings.login.new_password_error_message);
        } else {

            let json = {
                'user_id': this.props.id,
                'password': newPassword,
                'old_password': oldPassword,
            };

            this.changePasswordAPi(json);
        }

    };

    changePasswordAPi(data) {
        this.setState({isLoading: true});
        fetch(Constants.BASE_URL + '/users/change_password', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.setState({isLoading: false});
                if (status == '200') {

                    Alert.alert(
                        Constants.APP_NAME,
                        'Password has been changed successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    //this.props.navigation.goBack();
                                    this.props.logout()
                                },
                                style: 'cancel',
                            },

                        ],
                        {cancelable: false});

                } else {
                    ToastMessage(message);
                }

            })
            .catch((error) => {

                this.setState({isLoading: false});
                ToastMessage(error.message.toString());
            });

    }

    render() {
        const {
            isLoading,
            oldPassword,
            newPassword,
            phone,
        } = this.state;

        return (<ScrollView style={styles.container} keyboardShouldPersistTaps="always">
                {isLoading && <LoadingSpinner/>}
                    <TouchableOpacity activeOpacity={1}  onPress={()=>Keyboard.dismiss()}
                                      style={[styles.container,{margin:20,flex:1,}]}>

                        <View style={styles.textInputParentStyle}>

                            <PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                placeholderTextColor={colors.rgb_383431}
                                style={styles.textInputStyle}
                                ref={ref => this._passwordRef = ref}
                                placeholder={'Enter Your Old Password'}
                                icon={<CellIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                                onChangeText={(oldPassword) => this.setState({
                                    oldPassword,
                                })}
                                value={oldPassword}
                                secureTextEntry={true}
                                maxLength={20}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this._confirmpasswordRef.focus();
                                }}
                                blurOnSubmit={false}/>

                        </View>

                        <View style={styles.textInputParentStyle}>

                            <PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>

                            <TextInput
                                placeholderTextColor={colors.rgb_383431}
                                style={styles.textInputStyle}
                                ref={component => this._confirmpasswordRef = component}
                                placeholder={'Enter Your New Password'}
                                icon={<CellIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                                onChangeText={(newPassword) => this.setState({
                                    newPassword,
                                })}
                                onSubmitEditing={() => {
                                    this.handleValidations();
                                }}
                                value={newPassword}
                                secureTextEntry={true}
                                maxLength={20}
                                blurOnSubmit={false}/>

                        </View>

                       {/* <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: 20,
                            alignSelf: 'center',
                            marginTop: 30,
                        }}>
                            <TotalPrice style={{width: '48%', alignSelf: 'center'}}
                                        press={() => this.handleValidations()} t2={Strings.login.change} t1={''}
                                        t3={''}/>

                            <TotalPrice
                                textStyle={{color: colors.rgb_e15517}}
                                style={{width: '48%', alignSelf: 'center', backgroundColor: 'white'}}
                                press={() => this.props.navigation.goBack()} t2={Strings.login.cancel} t1={''}
                                t3={''}/>

                        </View>*/}

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            marginHorizontal: 20,
                            marginTop: 30,
                        }}>

                            <TouchableOpacity style={styles.btnStyle} onPress={() => this.handleValidations()}>

                                <Text style={styles.textBtnStyle}>{Strings.login.change}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnStyle, {backgroundColor: 'white'}]}
                                              onPress={() => this.props.navigation.goBack()}>

                                <Text style={[styles.textBtnStyle, {color: colors.rgb_e15517}]}>{Strings.login.cancel}</Text>
                            </TouchableOpacity>

                        </View>

                    </TouchableOpacity>

            </ScrollView>

        );
    }

}

const mapStateToProps = (state) => ({
    status: state.loginReducer.status,
    errorMessage: state.loginReducer.errorMessage,
    id: state.loginReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
    forgot: (phone) => dispatch(loginActions.requestForgotPassword(phone)),
    logout:()=>dispatch(loginActions.logOut(),customerActions.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);
