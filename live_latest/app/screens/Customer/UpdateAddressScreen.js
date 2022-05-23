import React, {Component} from 'react';
import {Alert, Keyboard, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddressIcon from '@svg/ic_address';

import styles from '../Login/styles';
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

class UpdateAddressScreen extends Component {
    constructor(props) {
        super(props);

        this.userInfo = {};
        this.dateType = '';
        this.today = new Date();

       let address=this.props.route.params.addressItem

        this.addressObj = Object.fromEntries(
            // convert to array, map, and then fromEntries gives back the object
            Object.entries(address).map(([key, value]) => [key.split("address_").pop(), value ])
        );

        let maximumDate = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());

        let inputFields = [];
        for (let i = 0; i < INPUT_FIELDS.length; i++) {
            inputFields[i] = {};
            if (i == 0) {
                this.focusedFieldIndex = i;
            }
            let key=INPUT_FIELDS[i].name
            this.userInfo[INPUT_FIELDS[i].name] = this.addressObj[key];
            inputFields[i].ref = React.createRef();
        }

        this.state = {
            inputFields,
            maximumDate,
        };
    }


    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {errorMessage, status, isAddressUpdated, navigation} = this.props;
        if (isAddressUpdated != prevProps.isAddressUpdated && prevState.isLoading) {
            this.setState({isLoading: false});
            if (status == '200') {
                Alert.alert(
                    Constants.APP_NAME,
                    'Address has been updated successfully',
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
            Keyboard.dismiss();
            this.userInfo['id'] = this.addressObj.id;
            this.userInfo['mobile_no']=this.addressObj.mobile_no
            console.log('userinfo',this.userInfo)
            this.setState({isLoading: true});
            this.props.updateAddress(this.userInfo);
        }

    }


    _onSubmitEditing = async (index, text) => {
        await this._onNext();
    };


    _onNext = async () => {
        if (this.focusedFieldIndex + 1 >= INPUT_FIELDS.length) {
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

                <View style={styles.shadowView}>

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


                        <Button title={Strings.cart.update_address} onPress={() => {
                            this._doSignUp();
                        }} style={{marginTop: 30}}/>

                    </View>


                </View>
                {isLoading && <LoadingSpinner/>}


            </ScrollView>);
    }


}

const mapStateToProps = (state) => ({
    errorMessage: state.customerReducer.errorMessage,
    id: state.loginReducer.id,
    status: state.customerReducer.status,
    isAddressUpdated: state.customerReducer.isAddressUpdated,
});

const mapDispatchToProps = (dispatch) => ({
    updateAddress: (userInfo) => dispatch(customerActions.requestUpdateAddress(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddressScreen);
