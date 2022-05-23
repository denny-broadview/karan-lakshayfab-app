import messaging from '@react-native-firebase/messaging';

import CellIcon from '@svg/ic_telephone';
import PasswordIcon from '@svg/ic_pass';
import AddressIcon from '@svg/ic_address';
import UserIcon from '@svg/user';
import NumberIcon from '@svg/ic_number';
import FirmIcon from '@svg/ic_office_building';
import CalendarIcon from '@svg/ic_calendar';

import React, {Component} from 'react';

import {ScrollView, Text, Keyboard, Platform, TouchableOpacity, View, Alert, Dimensions} from 'react-native';

import {connect} from 'react-redux';

import moment from 'moment';

import DeviceInfo from 'react-native-device-info';

import VersionCheck from 'react-native-version-check';

import {Constants} from '../../Resources';
import styles from '../Login/styles';
import colors from '../../Resources/Colors';
import * as loginActions from '../../actions/loginActions';
import Button from '../../components/Button';
import CustomTextInput from '../../components/CustomTextInput';
import DateTimePicker from '../../components/DateTimePicker';
import LoadingSpinner from '../../components/LoadingSpinner';
import LogoImage from '../../components/LogoImage';
import ToastMessage from '../../components/ToastMessage';
import {Strings} from '../../utils/Strings';

const INPUT_FIELDS = [
    {
        name: 'gst_no',
        placeholder: Strings.signup.gst_placeholder,
        textContentType: 'familyName',
        icon: <NumberIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 15,
    },
    {
        name: 'firm_name',
        placeholder: Strings.signup.firm_name_placeholder,
        textContentType: 'familyName',
        icon: <FirmIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 50,
    },
    {
        name: 'agency_name',
        placeholder: Strings.signup.agency_name,
        textContentType: 'familyName',
        icon: <UserIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 50,
    },
    {
        name: 'address',
        placeholder: Strings.signup.address_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 100,
    },
    {
        name: 'landmark',
        placeholder: Strings.signup.landmark_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 50,
    },
    {
        name: 'city',
        placeholder: Strings.signup.city_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 38,
    },
    {
        name: 'state',
        placeholder: Strings.signup.state_placeholder,
        textContentType: 'familyName',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 38,
    },
    {
        name: 'zipcode',
        placeholder: Strings.signup.pincode_placeholder,
        textContentType: 'telephoneNumber',
        icon: <AddressIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 6,
    },
    {
        name: 'name',
        placeholder: Strings.signup.name_placeholder,
        textContentType: 'familyName',
        icon: <UserIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 50,
    },

    {
        name: 'owner_no',
        placeholder: Strings.signup.owner_number_placeholder,
        textContentType: 'telephoneNumber',
        icon: <CellIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 10,
    },
    {
        name: 'agent_mobile_no',
        placeholder: Strings.signup.vendor_number,
        textContentType: 'telephoneNumber',
        icon: <CellIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 10,
    },
    /*{
        name: 'purchaser_name',
        placeholder: Strings.signup.purchaser_name_placeholder,
        textContentType: 'familyName',
        icon: <UserIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 50,
    },
    {
        name: 'purchaser_no',
        placeholder: Strings.signup.purchaser_number_placeholder,
        textContentType: 'telephoneNumber',
        icon: <CellIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 10,
    },*/
    {
        name: 'password',
        placeholder: Strings.login.password_placeholder,
        textContentType: 'password',
        icon: <PasswordIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 15,

    },

];

class SignupScreen extends Component {
    constructor(props) {
        super(props);

        this.userInfo = {};
        this.dateType = '';
        this.today = new Date();

        let maximumDate = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());

        var inputFields = [];
        for (let i = 0; i < INPUT_FIELDS.length; i++) {
            inputFields[i] = {};
            if (i == 0) {
                this.focusedFieldIndex = i;
            }
            /* if(i==1){
                 this.userInfo[INPUT_FIELDS[i].name] = '03AAFCB3420K1Z';
             }else {
                this.userInfo[INPUT_FIELDS[i].name] = 'BROADVIEW INNOVATIONS ';
             }*/
            this.userInfo[INPUT_FIELDS[i].name] = '';
            inputFields[i].ref = React.createRef();
        }

        this.state = {
            inputFields,
            maximumDate,
            isLoading: false,
          
        };
    }

    componentDidMount(): void {

        messaging().getToken().then((result) => {
            console.log(JSON.stringify(result));
            this.setState({fcm_token: result});
        });
        DeviceInfo.getDeviceName().then(deviceName => {

            this.setState({deviceName});
        });
    }


    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {errorMessage, status, navigation, isSignedIn} = this.props;
        if (isSignedIn != prevProps.isSignedIn && prevState.isLoading) {
            console.log('props-- ', this.props);
            this.setState({isLoading: false});

            if (status == '200' || status == 200) {
                Alert.alert(
                    Constants.APP_NAME,
                    'User has been created successfully.',
                    [
                        {
                            text: 'Ok',
                            onPress: () => navigation.goBack(),
                            style: 'cancel',
                        },

                    ],
                    {cancelable: false});

            } else {
                if (errorMessage) {
                    ToastMessage(errorMessage);
                }
            }

        }
    }

    _getGstDetails = (gst) => {
        console.log(gst);
        this.setState({isLoading: true});
        fetch(Constants.BASE_URL + `/users/getGST?gst=${gst}`, {
            method: 'GET',

        })
            .then(res => res.json())
            .then(
                (result) => {

                    const {taxpayerInfo, message} = result;


                    if (taxpayerInfo) {
                        const {addr} = taxpayerInfo.pradr;
                        if (addr) {
                            const {st, bnm, pncd, loc, stcd} = addr;
                            this.userInfo['address'] = st;
                            this.userInfo['landmark'] = bnm;
                            this.userInfo['zipcode'] = pncd;
                            this.userInfo['city'] = loc;
                            this.userInfo['state'] = stcd;
                            this.userInfo['firm_name'] = taxpayerInfo.tradeNam;
                            this.userInfo['name'] = taxpayerInfo.lgnm;
                            this.setState({isLoading: false});
                        } else {
                            this.setState({isLoading: false});
                        }
                    } else {
                        // this.userInfo['gst_no']
                        console.log('Gst error--',message)
                        this.setState({isLoading: false});
                        /*if (message) {
                            ToastMessage(message);
                        }*/
                    }
                },

                (error) => {
                    this.setState({isLoading: false});
                 //   alert(error);
                },
            );
    };


    _doSignUp() {

        const {name, firm_name,purchaser_name, gst_no, address, city, state, zipcode, owner_no, agent_mobile_no, password} = this.userInfo;
        if (gst_no && gst_no.length < 15 && gst_no.length > 0) {
            ToastMessage(Strings.signup.gst_error_message);
        } else if (!firm_name) {
            ToastMessage(Strings.signup.firm_name_error_message);
        } else if (!address) {
            ToastMessage(Strings.signup.address_error_message);
        } else if (!city) {
            ToastMessage(Strings.signup.city_error_message);
        } else if (!state) {
            ToastMessage(Strings.signup.state_error_message);
        } else if (!zipcode) {
            ToastMessage(Strings.signup.pincode_error_message);
        } else if (zipcode.length < 6) {
            ToastMessage(Strings.signup.pincode_len_error_message);
        } else if (!name) {
            ToastMessage(Strings.signup.name_error_message);
        } else if (!owner_no) {
            ToastMessage(Strings.signup.owner_number_error_message);
        } else if (owner_no.length < 10) {
            ToastMessage(Strings.login.phone_number_len_error_message);
        } else if (!agent_mobile_no) {
            ToastMessage(Strings.signup.vendor_number_error_message);
        } else if (agent_mobile_no.length < 10) {
            ToastMessage(Strings.login.phone_number_len_error_message);
        } /*else if ( purchaser_no && purchaser_no.length < 10) {
            ToastMessage(Strings.login.phone_number_len_error_message);
        }*/ else if (!password) {
            ToastMessage(Strings.login.password_error_message);
        } else if (password.length < 6) {
            ToastMessage(Strings.signup.password_len_error_message);
        } else {
            this.userInfo.device_type = Platform.OS;
            this.userInfo.fcm_token = this.state.fcm_token;
            this.userInfo.device_name = this.state.deviceName;
            this.userInfo.device_id = DeviceInfo.getUniqueId();
            this.userInfo.version=VersionCheck.getCurrentVersion();

            console.log('--userInfo', this.userInfo);
            Keyboard.dismiss();
            this.setState({isLoading: true});
            this.signUp(this.userInfo);
        }

    }

    signUp(userInfo) {
       
        fetch(Constants.BASE_URL + '/users/signup', {
            method: 'POST',
            body: JSON.stringify(userInfo),
        })
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({isLoading: false});
                    const {status, message} = result;


                    if (status == '200' || status == 200) {

                        Alert.alert(
                            Constants.APP_NAME,
                            'User has been created successfully.',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => this.props.navigation.goBack(),
                                    style: 'cancel',
                                },

                            ],
                            {cancelable: false});

                    } else {
                        if (message) {
                            ToastMessage(message);
                        }
                    }
                },

                (error) => {
                    this.setState({isLoading: false});
                    alert(error);
                },
            );
    }


    _onSubmitEditing = async (index, text) => {
        await this._onNext();
    };


    _onNext = async () => {
        if (this.focusedFieldIndex + 1 >= INPUT_FIELDS.length) {
            Keyboard.dismiss();
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

        if (fieldName == 'dob') {
            if (!showDateTimePicker) {
                this.setState({
                    showDateTimePicker: true,
                });
            }

        }
        this._onFocus(index, this.userInfo[fieldName]);
        if (inputFields[index].ref && inputFields[index].ref.current) {
            inputFields[index].ref.current.focus();
        }
    };

    _handleSelectedDate = (selectedDate) => {
        switch (this.dateType) {
            case Constants.SIGN_UP_TYPES.WEEKLY_OFF_DAY:
                this.setState({weeklyOffDay: selectedDate});
                this.userInfo['weekly_off_day'] = selectedDate;
                break;
            case Constants.SIGN_UP_TYPES.DOB:
                this.setState({dob: selectedDate});
                this.userInfo['dob'] = selectedDate;
                break;
            case Constants.SIGN_UP_TYPES.MARRIAGE_ANNIVERSARY:
                this.setState({marriageAnn: selectedDate});
                this.userInfo['marriage_anniversary'] = selectedDate;
                break;
        }
    };

    _onChangeText = (index, text) => {
        if (text != this.userInfo[INPUT_FIELDS[index].name]) {
            this.userInfo[INPUT_FIELDS[index].name] = text.trim();
            if (index == 0 && text.length == 15) {
                Keyboard.dismiss();
                this._getGstDetails(text.trim());
            }
        }

    };


    showDatePicker = () => {
        this.setState({showDateTimePicker: true});
    };

    hideDatePicker = () => {
        this.setState({showDateTimePicker: false});
    };

    

    render() {
        const {
            isLoading,
            showDateTimePicker,
            inputFields,
            maximumDate,
            dob,
            weeklyOffDay,
            marriageAnn
        } = this.state;

        return (
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

                <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={styles.container}>
                    <Text style={styles.signin}>{Strings.signup.signin}</Text>

                    <View style={styles.parentView}>

                        <LogoImage/>
                        {
                            INPUT_FIELDS.map((field, index) => {
                                return (
                                    <View style={{width: '100%'}} key={index}>
                                        {field.name == 'owner_no'
                                         ? (
                                         <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',width: '100%',}}>
                                            <CustomTextInput
                                                inputRef={inputFields[index].ref}
                                                key={index}
                                                index={index}
                                                style={[styles.email]}
                                                icon={field.icon}
                                                maxLength={field.maxLength}
                                                // inputStyle={[styles.textInputStyle]}
                                                inputStyle={{width: Dimensions.get('window').width / 2 - 10}}
                                                placeholder={field.placeholder}
                                                textContentType={field.textContentType}
                                                editable={field.editable}
                                                value={this.userInfo[INPUT_FIELDS[index].name]}
                                                onFocus={this._onFocus}
                                                isSignUp={true}
                                                onBlur={this._onBlur}
                                                onChangeText={this._onChangeText}
                                                onSubmitEditing={this._onSubmitEditing}
                                                blurOnSubmit={index + 1 > INPUT_FIELDS.length && !inputFields[index].error}
                                                onPress={() => {
                                                    this.focusedFieldIndex = index;
                                                }}
                                            />
                                           
                                           {this.props.route.params != null && this.props.route.params.OPTVer == true ?
                                            <TouchableOpacity disabled style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('OTPScreen', {phone: this.userInfo[INPUT_FIELDS[index].name]})}>
                                            <Text style={styles.buttonText}>Verified</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('OTPScreen', {phone: this.userInfo[INPUT_FIELDS[index].name]})}>
                                        <Text style={styles.buttonText}>Send OTP</Text>
                                    </TouchableOpacity>
                            }
                                        </View>
                                        )
                                         :(<CustomTextInput
                                            inputRef={inputFields[index].ref}
                                            key={index}
                                            index={index}
                                            style={[styles.email]}
                                            icon={field.icon}
                                            maxLength={field.maxLength}
                                            inputStyle={[styles.textInputStyle]}
                                            placeholder={field.placeholder}
                                            textContentType={field.textContentType}
                                            editable={field.editable}
                                            value={this.userInfo[INPUT_FIELDS[index].name]}
                                            onFocus={this._onFocus}
                                            isSignUp={true}
                                            onBlur={this._onBlur}
                                            onChangeText={this._onChangeText}
                                            onSubmitEditing={this._onSubmitEditing}
                                            blurOnSubmit={index + 1 > INPUT_FIELDS.length && !inputFields[index].error}
                                            onPress={() => {
                                                this.focusedFieldIndex = index;
                                            }}
                                        />)}

                                        <DateTimePicker visible={showDateTimePicker}
                                                        handleConfirm={(clickedDate) => {
                                                            let dd = moment(clickedDate).format('YYYY-MM-DD');
                                                            this._handleSelectedDate(dd);

                                                        }}
                                                        value={maximumDate}
                                                        cancelDatePicker={() => console.log('ss')}

                                            // minimumDate={this.today}
                                                        maximumDate={maximumDate}
                                                        hideDatePicker={(status) => {
                                                            this.setState({showDateTimePicker: status});
                                                        }}/>

                                    </View>
                                );
                            })
                        }

                        {/*<View style={[styles.email]}>

                            <CustomTextInput
                                inputRef={component => this._DOBRef = component}
                                style={styles.textInputStyle}
                                icon={<CalendarIcon width={23} height={23} fill={colors.rgb_e15517}/>}

                                maxLength={20}
                                inputStyle={styles.textInputStyle}
                                placeholder={Strings.signup.weekly_off_day_placeholder}
                                editable={false}
                                value={weeklyOffDay}
                                onFocus={this._onFocus}
                                onBlur={this._onBlur}
                                onChangeText={this._onChangeText}
                                onSubmitEditing={this._onSubmitEditing}

                                onPress={() => {
                                    let maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

                                    this.dateType = Constants.SIGN_UP_TYPES.WEEKLY_OFF_DAY;
                                    this.setState({showDateTimePicker: true, maximumDate: maxDate});
                                }}
                            >
                            </CustomTextInput>
                        </View>*/}

                         <View style={[styles.email,{width: '100%'}]}>
                            <CustomTextInput
                                inputRef={component => this._DOBRef = component}
                                icon={<CalendarIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                                maxLength={20}
                                inputStyle={styles.textInputStyle}
                                placeholder={Strings.signup.dob_placeholder}
                                editable={false}
                                value={dob}
                                onFocus={this._onFocus}
                                onBlur={this._onBlur}
                                onChangeText={this._onChangeText}
                                onSubmitEditing={this._onSubmitEditing}
                                onPress={() => {
                                    let maxDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
                                    this.dateType = Constants.SIGN_UP_TYPES.DOB;
                                    this.setState({showDateTimePicker: true, maximumDate: maxDate});

                                }}
                            />
                        </View>
                        <View style={[styles.email,{width: '100%'}]}>
                            <CustomTextInput
                                inputRef={component => this._marriageAnniRef = component}

                                icon={<CalendarIcon width={23} height={23} fill={colors.rgb_e15517}/>}
                                maxLength={20}
                                inputStyle={styles.textInputStyle}
                                placeholder={Strings.signup.marriage_anni_placeholder}
                                editable={false}
                                value={marriageAnn}
                                onFocus={this._onFocus}
                                onBlur={this._onBlur}
                                onChangeText={this._onChangeText}
                                onSubmitEditing={this._onSubmitEditing}
                                onPress={() => {
                                    let maxDate = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
                                    this.dateType = Constants.SIGN_UP_TYPES.MARRIAGE_ANNIVERSARY;
                                    this.setState({showDateTimePicker: true, maximumDate: maxDate});
                                }}
                            />
                            <View>
                            </View>
                        </View>
                        <Button 
                            disabled={this.props.route.params?.OPTVer != undefined && this.props.route.params.OPTVer == true ? false : true}
                            title={Strings.signup.signin} onPress={() => {
                           this._doSignUp();
                        }} style={{marginTop: 30}}/>
                        
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.goBack()}>
                            <Text
                                style={[styles.forgotPasswordTextStyle, {color: colors.rgb_383431}]}>{Strings.signup.have_An_Account}</Text>
                            <Text style={styles.forgotPasswordTextStyle}>{' ' + Strings.login.signin}</Text>
                        </TouchableOpacity>

                    </View>
                    {isLoading && <LoadingSpinner/>}

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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
