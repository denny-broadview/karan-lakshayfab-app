import React, {Component} from 'react';
import {
    Keyboard,
    Platform,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import {connect} from 'react-redux';

import moment from 'moment';
import LoadingSpinner from '../../components/LoadingSpinner';
import CellIcon from '@svg/ic_telephone';
import * as customerActions from '../../actions/customerActions';
import CalendarIcon from '@svg/ic_calendar';
import FirmIcon from '@svg/ic_office_building';

import UserIcon from '@svg/user';
import  NumberIcon from '@svg/ic_number';
import styles from './Styles/UpdatePersonalDetailsStyles';
import {Strings} from '../../utils/Strings';
import colors from '../../Resources/Colors';
import CustomTextInput from '../../components/CustomTextInput';
import {Constants} from '../../Resources';
import DateTimePicker from '../../components/DateTimePicker';
import ToastMessage from '../../components/ToastMessage';
import HeaderTitle from '../../components/HeaderTitle';
import NavigationService from '../../navigation/NavigationService';
import {HeaderBackButton} from '@react-navigation/stack';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import UserImage from '../../Images/assets/user_profile.png'
import CloseIcon from '@svg/close';
import ImageSelectionModal from '../../components/ImageSelectionModal';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Image',
    //customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const INPUT_FIELDS = [
    {
        name: 'gst_no',
        placeholder: Strings.signup.gst_placeholder,
        textContentType: 'familyName',
        icon: <NumberIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: false,
        maxLength: 15,
    },
    {
        name: 'name',
        placeholder: Strings.signup.name_placeholder,
        textContentType: 'familyName',
        icon: <UserIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 20,
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
        name: 'firm_name',
        placeholder: Strings.signup.firm_name_placeholder,
        textContentType: 'familyName',
        icon: <FirmIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 30,
    },
    /*{
        name: 'purchaser_name',
        placeholder: Strings.signup.purchaser_name_placeholder,
        textContentType: 'familyName',
        icon: <UserIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 30,
    },*/
    {
        name: 'owner_no',
        placeholder: Strings.signup.owner_number_placeholder,
        textContentType: 'telephoneNumber',
        icon: <CellIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 10,
    },
   /* {
        name: 'purchaser_no',
        placeholder: Strings.signup.purchaser_number_placeholder,
        textContentType: 'telephoneNumber',
        icon: <CellIcon width={23} height={23} fill={colors.rgb_e15517}/>,
        editable: true,
        maxLength: 10,
    },*/
];

class UpdatePersonalDetailsScreen extends Component {
    constructor(props) {
        super(props);

        this.userInfo = {};
        this.dateType = '';
        this.isImageChanged=false
        this.today = new Date();

        var maximumDate = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
        this.marriageAnn=maximumDate

        var inputFields = [];
        for (var i = 0; i < INPUT_FIELDS.length; i++) {
            inputFields[i] = {};
            if (i === 0) {
                this.focusedFieldIndex = i;
            }
            this.userInfo[INPUT_FIELDS[i].name] = '';
            inputFields[i].ref = React.createRef();
        }

        this.state = {
            inputFields,
            maximumDate,
            weekly_off_day: '',
            isLoading: false,
            imagePickerModal:false
        };
    }

    componentDidMount(): void {
        const {getUserDetails, route} = this.props;
        getUserDetails(route.params.user_id);
        console.log('userId--->>', route.params.user_id);
        this.setState({isLoading: true});
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {errorMessage, getUserDetails, route,status, isUserUpdated, navigation, userDetail} = this.props;

        if (isUserUpdated && isUserUpdated != prevProps.isUserUpdated && prevState.isLoading) {
            this.setState({isLoading:false})

            Alert.alert(
                Constants.APP_NAME,
                'Profile has been updated successfully',
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            getUserDetails(route.params.user_id);
                            navigation.goBack();
                        },
                        style: 'cancel',
                    },

                ],
                {cancelable: false});

        }
        if (userDetail != prevProps.userDetail && prevState.isLoading) {
            this.setState({isLoading: false});
            const {status, message} = userDetail;
            if (status == '200' || status == 200) {
                console.log(JSON.stringify(userDetail.data));
                const {data} = userDetail;
                for (let i = 0; i < INPUT_FIELDS.length; i++) {
                    // inputFields[i] = {};
                    if (i === 0) {
                        this.focusedFieldIndex = i;
                    }
                    this.userInfo[INPUT_FIELDS[i].name] = data[INPUT_FIELDS[i].name];

                }

                this.userInfo['date_of_birth'] = data.date_of_birth;
                //  alert(data.image)

                let annivDate = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());


                if (data.photo){
                    this.setState({isImageChanged:true})
                }else {
                     this.setState({isImageChanged:false})
                }
                this.setState({
                    dob: data.date_of_birth=="0000-00-00"?annivDate: data.date_of_birth,
                    marriageAnn:data.marriage_anniversary=="0000-00-00"?annivDate: data.marriage_anniversary,
                    weekly_off_day: data.weekly_off_day,
                    image: data.photo?'http://lakshayfabrics.in/assets/uploads/users/' + data.photo:'',
                });
                this.userInfo['marriage_anniversary'] = data.marriage_anniversary;
                this.userInfo['weekly_off_day'] = data.weekly_off_day;

                console.log('Top--', data.date_of_birth);
            } else {
                ToastMessage(errorMessage);
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
                        this.userInfo['firm_name'] = taxpayerInfo.tradeNam;
                        this.userInfo['name'] = taxpayerInfo.lgnm;
                        this.setState({isLoading: false});
                        if (addr) {
                            const {st, bnm, pncd, loc, stcd} = addr;
                            /*this.userInfo['address'] = st;
                            this.userInfo['landmark'] = bnm;
                            this.userInfo['zipcode'] = pncd;
                            this.userInfo['city'] = loc;
                            this.userInfo['state'] = stcd;*/
                            this.userInfo['firm_name'] = taxpayerInfo.tradeNam;
                            this.userInfo['name'] = taxpayerInfo.lgnm;
                            this.setState({isLoading: false});
                        } else {
                            this.setState({isLoading: false});
                        }
                    } else {
                        // this.userInfo['gst_no']
                        this.setState({isLoading: false});
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
    };

    _doSignUp() {

        const {name, firm_name, owner_no, purchaser_no} = this.userInfo;
        if (!name) {
            ToastMessage(Strings.signup.name_error_message);
        } else if (!firm_name) {
            ToastMessage(Strings.signup.firm_name_error_message);
        } else if (!owner_no) {
            ToastMessage(Strings.signup.owner_number_error_message);
        } else if (owner_no.length < 10) {
            ToastMessage(Strings.login.phone_number_len_error_message);
        } /*else if (!purchaser_no) {
            ToastMessage(Strings.signup.purchase_number_error_message);
        } else if (purchaser_no.length < 10) {
            ToastMessage(Strings.login.phone_number_len_error_message);
        }*/ else {
            const {base64,image}=this.state

            if (image && image.startsWith('http')){
            }else {
                this.userInfo['remove_image'] = !base64;
                this.userInfo['image'] = base64;
                //this.userInfo['remove_image'] = false;
            }

            this.userInfo['user_id'] = this.props.route.params.user_id;
            console.log('--userInfo', this.userInfo);
            Keyboard.dismiss();
            this.setState({isLoading: true});

            const {updateUserDetails} = this.props;
            updateUserDetails(this.userInfo);
        }

    }

    _onSubmitEditing = async (index, text) => {
        await this._onNext();
    };


    _onNext = async () => {
        if (this.focusedFieldIndex + 1 >= INPUT_FIELDS.length) {

            Keyboard.dismiss();
          //  this._doSignUp();

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
            case Constants.SIGN_UP_TYPES.DOB:
                this.setState({dob: selectedDate});
                this.userInfo['date_of_birth'] = selectedDate;
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


    showActionSheet = () => {
        this.actionSheet.show();
    };

    async requestExternalStorageSavePermission() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Your application Storage Permission',
                message:
                    'Required message',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }


    showImagePicker(camera) {
        if (Platform.OS != 'ios') {
            this.requestExternalStorageSavePermission().then((didGetPermission) => {
                if (didGetPermission) {
                    if(camera){
                        this.openCamera();
                    }else {
                        this.openGallery();
                    }

                }
            });
        } else {
          //  this.openImagePicker();

            if(camera){
                this.openCamera();
            }else {
                this.openGallery();
            }

        }
    }


    openCamera() {
        this.count = 0;
        this.retryCount=0
        ImagePicker.openCamera({
            multiple: false,
            includeBase64: true,
            includeExif: true,
            width: 300,
             height: 400,
            cropping:true
        }).then(images => {
            this.isImageChanged = true;
            // You can also display the image using data:
            const source = 'data:image/jpeg;base64,' + images.data;
            this.isImageChanged = true;
            this.setState({
                base64:source,
                image: images.path,
                isImageChanged: true,

            });
        }).catch((e) => {
            alert(e);
        });
    }


    openGallery() {
        this.count = 0;
        this.retryCount=0
        ImagePicker.openPicker({
            multiple: false,
            includeBase64: true,
            width: 300,
            height: 400,
            cropping: true
            //cropping:true

        }).then(images => {
            console.log(images);
            this.isImageChanged = true;

            // You can also display the image using data:
            const source = 'data:image/jpeg;base64,' + images.data;
            console.log(source)
            this.isImageChanged = true;

            this.setState({
                    image: images.path,
                base64:source,
                isImageChanged: true,

            });

            // this.uploadImage()
        }).catch((e) => {

        });

    }

    render() {
        const {
            isLoading,
            showDateTimePicker,
            weekly_off_day,
            dob,
            marriageAnn,
            inputFields,
            isImageChanged,
            maximumDate,
            image,
            imagePickerModal
        } = this.state;


        return (
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

                <View style={styles.photoContainer}>
                    <View>
                        <HeaderBackButton
                            {...this.props}
                            labelVisible={false}
                            tintColor={'white'}
                            onPress={() => {
                                NavigationService.goBack();
                            }}
                        />

                    </View>
                    <HeaderTitle style={{marginTop: 10}} title={'Change Profile '}/>
                    <HeaderTitle style={{color: colors.rgb_e15517}} title={'Change'}/>
                </View>
                {isLoading && <LoadingSpinner/>}

                {imagePickerModal && <ImageSelectionModal chooseGallery={() => {
                    this.setState({imagePickerModal: false}, () => {
                        setTimeout(() => {
                            this.showImagePicker(false);
                        }, 500);
                    });


                }} takePhoto={() => {
                    this.setState({imagePickerModal: false});
                    this.showImagePicker(true);
                }
                }
                                                          cancelModal={() => this.setState({imagePickerModal: false})}
                                                          modalVis={imagePickerModal}/>
                }

                <TouchableOpacity style={styles.profileView} onPress={() => this.setState({imagePickerModal:true})}>
                    <Image
                        source={image ? {uri: image} : UserImage}
                        defulatSource={UserImage}
                        style={styles.uploadAvatar}/>
                </TouchableOpacity>

                { isImageChanged && <TouchableOpacity style={styles.closeIconStyle} onPress={() => {
                    this.setState({image: '',isImageChanged:!isImageChanged});
                }}>
                    <CloseIcon width={23} height={23} fill={'white'}/>
                </TouchableOpacity>
                }


                <TouchableOpacity style={styles.container} onPress={()=>Keyboard.dismiss()} activeOpacity={1}>
                    <Text style={styles.signin}>{Strings.signup.change_profile_photo}</Text>

                    <View style={styles.parentView}>

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
                                            inputStyle={styles.textInputStyle}
                                            placeholder={field.placeholder}
                                            textContentType={field.textContentType}
                                            editable={field.editable}
                                            returnKeyType={index==INPUT_FIELDS.length-1?'done':'next'}
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

                                        <DateTimePicker visible={showDateTimePicker}
                                                        handleConfirm={(clickedDate) => {
                                                            let dd = moment(clickedDate).format('YYYY-MM-DD');
                                                            this._handleSelectedDate(dd);

                                                        }}
                                                        value={maximumDate}
                                                        maximumDate={maximumDate}
                                                        hideDatePicker={(status) => {
                                                            this.setState({showDateTimePicker: status});
                                                        }}/>

                                    </View>
                                );
                            })
                        }

                        <View style={[styles.email]}>

                            <CustomTextInput
                                inputRef={component => this._DOBRef = component}
                                style={styles.textInputStyle}
                                icon={<CalendarIcon width={23} height={23} fill={colors.rgb_e15517}/>}

                                maxLength={20}
                                inputStyle={styles.textInputStyle}
                                placeholder={Strings.signup.weekly_off_day_placeholder}
                                editable={false}
                                value={weekly_off_day}
                                onFocus={this._onFocus}
                                onBlur={this._onBlur}
                                onChangeText={this._onChangeText}
                                onSubmitEditing={this._onSubmitEditing}
                                onPress={this.showActionSheet}
                            >
                            </CustomTextInput>
                        </View>

                        <View style={[styles.email]}>
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
                        <View style={[styles.email]}>
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

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            marginTop: 30,
                        }}>

                            <TouchableOpacity style={styles.btnStyle} onPress={() => this._doSignUp()}>
                                <Text style={styles.textBtnStyle}>{'Change'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnStyle, {backgroundColor: 'white'}]}
                                              onPress={() => this.props.navigation.goBack()}>

                                <Text style={[styles.textBtnStyle, {color: colors.rgb_e15517}]}>{'Cancel'}</Text>
                            </TouchableOpacity>

                        </View>


                    </View>



                    <ActionSheet
                        ref={o => this.actionSheet = o}
                        title={'Select Weekly Off day ?'}
                        options={Strings.weeks}
                        cancelButtonIndex={Strings.weeks.length - 1}
                        onPress={(index) => {
                            if (Strings.weeks.length - 1 == index) {
                                return;
                            }
                            let selectedDay = Strings.weeks[index];
                            this.userInfo['weekly_off_day'] = selectedDay;
                            this.setState({weekly_off_day: selectedDay});
                        }}
                    />
                </TouchableOpacity>


            </ScrollView>);
    }


}

const mapStateToProps = (state) => ({

    userDetail: state.customerReducer.userDetail,
    errorMessage: state.customerReducer.errorMessage,
    isUserUpdated: state.customerReducer.isUserUpdated,

});

const mapDispatchToProps = (dispatch) => ({
    getUserDetails: (user_id) => dispatch(customerActions.getUserDetails(user_id)),
    updateUserDetails: (userInfo) => dispatch(customerActions.updateUserDetails(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalDetailsScreen);
