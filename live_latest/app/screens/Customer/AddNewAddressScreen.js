import React, {Component} from 'react';
import {Alert, Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import LoadingSpinner from '../../components/LoadingSpinner';
import AddressIcon from '@svg/ic_address';

import styles from './Styles/UpdatePersonalDetailsStyles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import * as customerActions from '../../actions/customerActions';
import CustomTextInput from '../../components/CustomTextInput';
import Button from '../../components/Button';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';

const INPUT_FIELDS = [


    {
        name: 'house_no',
        placeholder: Strings.signup.address_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 30,
        text: '111',
    },
    {
        name: 'landmark',
        placeholder: Strings.signup.landmark_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 30,
    },
    {
        name: 'city',
        placeholder: Strings.signup.city_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 20,
    },
    {
        name: 'state',
        placeholder: Strings.signup.state_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 20,
    },
    {
        name: 'zipcode',
        placeholder: Strings.signup.pincode_placeholder,
        textContentType: 'telephoneNumber',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 6,
    },


];

class AddNewAddressScreen extends Component {
    constructor(props) {
        super(props);

        this.userInfo = {};
        this.dateType = '';
        this.today = new Date();

        let maximumDate = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());

        let inputFields = [];
        for (let i = 0; i < INPUT_FIELDS.length; i++) {
            inputFields[i] = {};
            if (i == 0) {
                this.focusedFieldIndex = i;
            }
            this.userInfo[INPUT_FIELDS[i].name] = '';
            inputFields[i].ref = React.createRef();
        }

        this.state = {
            inputFields,
            maximumDate,
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {errorMessage, status, isNewAddressAdded, navigation} = this.props;

        if (isNewAddressAdded != prevProps.isNewAddressAdded && prevState.isLoading) {

            this.setState({isLoading: false});
            if (status == '200') {

                Alert.alert(
                    Constants.APP_NAME,
                    'Address has been added successfully',
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                navigation.goBack();
                            },
                            style: 'cancel',
                        },

                    ],
                    {cancelable: false});

            } else {
                ToastMessage(errorMessage);
            }
        }
    }

    _doSignUp() {

        const {house_no, city, state, zipcode} = this.userInfo;

        if (!house_no) {
            ToastMessage(Strings.signup.address_error_message);
        } else if (!city) {
            ToastMessage(Strings.signup.city_error_message);
        } else if (!state) {
            ToastMessage(Strings.signup.state_error_message);
        } else if (!zipcode) {
            ToastMessage(Strings.signup.pincode_error_message);
        } else if (zipcode.length < 6) {
            ToastMessage(Strings.signup.pincode_len_error_message);
        } else {
            this.userInfo['user_id'] = this.props.id;
            this.setState({isLoading: true});
            this.props.addAddress(this.userInfo);
        }

    }


    _onSubmitEditing = async (index, text) => {
        await this._onNext();
    };


    _onNext = async () => {
        if (this.focusedFieldIndex + 1 >= INPUT_FIELDS.length) {
            Keyboard.dismiss()
            this._doSignUp();
        } else {
            this._focus(this.focusedFieldIndex + 1);
        }
    };

    _onFocus = async (index, text) => {
        this.focusedFieldIndex = index;
    };


    _focus = (index) => {
        const {
            showDateTimePicker,
            inputFields,
        } = this.state;
        const fieldName = inputFields[index].name;

        this._onFocus(index, this.userInfo[fieldName]);
        if (inputFields[index].ref && inputFields[index].ref.current) {
            inputFields[index].ref.current.focus();
        }
    };

    _onChangeText = (index, text) => {
        if (text != this.userInfo[INPUT_FIELDS[index].name]) {
            this.userInfo[INPUT_FIELDS[index].name] = text.trim();
        }

    };


    render() {
        const {
            isLoading,
            inputFields,
        } = this.state;

        return (
            <ScrollView style={[styles.scrollView, {backgroundColor: 'white'}]} keyboardShouldPersistTaps="always">

                <TouchableOpacity activeOpacity={1}  onPress={()=>Keyboard.dismiss()}
                                  style={styles.shadowView}>

                    <View style={[styles.parentView]}>

                        {
                            INPUT_FIELDS.map((field, index) => {
                                return (
                                    <View style={{width: '100%'}} key={index}>
                                        <CustomTextInput
                                            inputRef={inputFields[index].ref}
                                            key={index}
                                            index={index}
                                            style={styles.email}
                                            icon={field.icon}
                                            maxLength={field.maxLength}
                                            multi
                                            inputStyle={styles.textInputStyle}
                                            placeholder={field.placeholder}
                                            textContentType={field.textContentType}
                                            editable={field.editable}
                                            returnKeyType={index===INPUT_FIELDS.length-1?'done':'next'}
                                            //autoFocus={index == this.focusedFieldIndex}
                                            value={this.userInfo[INPUT_FIELDS[index].name]}
                                            onFocus={this._onFocus}
                                            onBlur={this._onBlur}
                                            onChangeText={this._onChangeText}
                                            onSubmitEditing={this._onSubmitEditing}
                                            blurOnSubmit={index + 1 > INPUT_FIELDS.length && !inputFields[index].error}
                                            onPress={() => {
                                                this.focusedFieldIndex = index;
                                            }}
                                        />

                                    </View>
                                );
                            })
                        }


                       {/* <Button title={Strings.cart.save_address} onPress={() => {
                            this._doSignUp();
                        }} style={{marginTop: 30}}/>*/}

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            marginTop: 30,
                        }}>

                            <TouchableOpacity style={[styles.btnStyle,{width:'60%'}]} onPress={() => this._doSignUp()}>
                                <Text style={styles.textBtnStyle}>{Strings.cart.save_address}</Text>
                            </TouchableOpacity>

                          {/*  <TouchableOpacity style={[styles.btnStyle, {backgroundColor: 'white'}]}
                                              onPress={() => this.props.navigation.goBack()}>

                                <Text style={[styles.textBtnStyle, {color: colors.rgb_e15517}]}>{'Cancel'}</Text>
                            </TouchableOpacity>*/}

                        </View>


                    </View>


                </TouchableOpacity>
                {isLoading && <LoadingSpinner/>}


            </ScrollView>);
    }


}

const mapStateToProps = (state) => ({
    errorMessage: state.customerReducer.errorMessage,
    id: state.loginReducer.id,
    status: state.customerReducer.status,
    isNewAddressAdded: state.customerReducer.isNewAddressAdded,
});

const mapDispatchToProps = (dispatch) => ({
    addAddress: (userInfo) => dispatch(customerActions.requestAddAddress(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddressScreen);
