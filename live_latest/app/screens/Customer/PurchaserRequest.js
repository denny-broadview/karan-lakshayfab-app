import React, {Component} from 'react';
import {Alert, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Constants} from '@resources';

import styles from './Styles/ChangePasswordStyles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import * as loginActions from '../../actions/loginActions';
import LoadingSpinner from '../../components/LoadingSpinner';
import ToastMessage from '../../components/ToastMessage';
import PasswordIcon from '@svg/ic_pass';
import CellIcon from '@svg/ic_telephone';
import UserIcon from '@svg/user';

import TotalPrice from '../../components/TotalPrice';
import * as customerActions from '../../actions/customerActions';
import CustomTextInput from '../../components/CustomTextInput';

class PurchaserRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaser_no: '',
            purchaser_name:'',
            purchaser_password: '',
            isLoading: false,
        };
    }


    handleValidations = () => {
        const {purchaser_password, purchaser_name,purchaser_no} = this.state;
        Keyboard.dismiss();
        if (!purchaser_name) {
            ToastMessage(Strings.purchaser_request.purchaser_name_error);
        } else if (!purchaser_no) {
            ToastMessage(Strings.purchaser_request.purchaser_no_error);
        }
        else if (!purchaser_password) {
            ToastMessage(Strings.login.password_error_message);
        }
        else {

            let json = {
                purchaser_no ,
                purchaser_name,
                purchaser_password,
                "user_id" : this.props.id
            }

            this.changePasswordAPi(json);
        }

    };

    changePasswordAPi(data) {
        this.setState({isLoading: true});
        fetch(Constants.BASE_URL + '/users/purchase_request', {
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
                        'Purchaser Request Send Successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    this.props.navigation.goBack()
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
            purchaser_no,
            purchaser_name,
            purchaser_password
        } = this.state;

        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
                {isLoading && <LoadingSpinner/>}
                <TouchableOpacity activeOpacity={1}  onPress={()=>Keyboard.dismiss()}
                                  style={[styles.container,{margin:20,flex:1,}]}>

                    <View style={styles.textInputParentStyle}>

                        <UserIcon width={23} height={23} fill={colors.rgb_e15517}/>

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={'Purchaser Name'}
                            placeholderTextColor={colors.rgb_383431}
                            onChangeText={(purchaser_name) => this.setState({
                                purchaser_name,
                            })}
                            value={purchaser_name}
                            secureTextEntry={false}
                            maxLength={20}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                this._noRef.focus();
                            }}
                            blurOnSubmit={false}/>

                    </View>
                    <View style={styles.textInputParentStyle}>

                        <CellIcon width={23} height={23} fill={colors.rgb_e15517}/>

                        <TextInput
                            style={styles.textInputStyle}
                            ref={ref => this._noRef = ref}
                            placeholder={'Purchaser Mobile Number'}
                            onChangeText={(purchaser_no) => this.setState({
                                purchaser_no,
                            })}
                            placeholderTextColor={colors.rgb_383431}
                            keyboardType={'number-pad'}
                            value={purchaser_no}
                            secureTextEntry={false}
                            maxLength={10}
                            returnKeyType={'done'}
                            onSubmitEditing={() => {
                                this._passwordRef.focus();
                            }}
                            blurOnSubmit={false}/>

                    </View>

                    <View style={styles.textInputParentStyle}>

                        <PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>

                        <TextInput
                            style={styles.textInputStyle}
                            ref={component => this._passwordRef = component}
                            placeholder={'Enter Your Password'}
                            placeholderTextColor={colors.rgb_383431}
                            returnKeyType={'done'}
                            onChangeText={(purchaser_password) => this.setState({
                                purchaser_password,
                            })}
                            onSubmitEditing={() => {
                                this.handleValidations();
                            }}
                            value={purchaser_password}
                            secureTextEntry={true}
                            maxLength={20}
                            blurOnSubmit={false}/>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        alignSelf: 'center',
                        marginTop: 30,
                    }}>

                        <TouchableOpacity style={[styles.btnStyle,{width:'55%'}]} onPress={() => this.handleValidations()}>
                            <Text style={styles.textBtnStyle}>{'Submit Request'}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PurchaserRequest);
