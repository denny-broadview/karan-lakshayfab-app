import React, {Component} from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    PermissionsAndroid,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/UploadAlbumStyles';
import LoadingSpinner from '../../components/LoadingSpinner';
import ImagePicker from 'react-native-image-crop-picker';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import PhotoIcon from '@svg/ic_photo';
import Colors from '../../Resources/Colors';
import CloseIcon from '@svg/close';
import NoImage from '../../Images/assets/no_product.jpg';
import {Strings} from '../../utils/Strings';
import ImageSelectionModal from '../../components/ImageSelectionModal';

const DEVICE_WIDTH = Dimensions.get('window').width;


// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Image',
    //customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class UploadAlbumScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerList: '',
            isLoading: false,
            image: '',
            isImageSelected: false,
            album_name: '',
            isEditScreen: false,
            id: '',
            imagePickerModal: false,
        };
        this.pageNumber = 1;
    }


    componentDidMount(): void {
        const {params} = this.props.route;
        if (params == undefined) {
            this.setState({isEditScreen: false});
        } else {
            const {album_name, id, imageUrl} = params;
            this.setState({isEditScreen: true, album_name, id, image: imageUrl, isImageSelected: true});
        }


    }


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
                    if (camera) {
                        this.openCamera();
                    } else {
                        this.openGallery();
                    }

                }
            });
        } else {
            if (camera) {
                this.openCamera();
            } else {
                this.openGallery();
            }

        }
    }

    openCamera() {
        this.count = 0;
        this.retryCount = 0;
        ImagePicker.openCamera({
            multiple: false,
            includeBase64: true,
            includeExif: true,
            // width: 300,
            //  height: 400,
            //cropping:true
        }).then(images => {
            this.isImageChanged = true;

            const source = 'data:image/jpeg;base64,' + images.data;

            this.setState({
                image: images.path,
                base64:source,
                //imagePath:
                isImageSelected: true,
            });
        }).catch((e) => {
            alert(e);
        });
        // Launch Camera:
        /* ImagePicker.launchCamera(options, (response) => {
             // Same code as in above section!

             if (response.didCancel) {
                 console.log('User cancelled image picker');
             } else if (response.error) {
                 console.log('ImagePicker Error: ', response.error);
             } else if (response.customButton) {
                 console.log('User tapped custom button: ', response.customButton);
             } else {
                 //const source = { uri: response.uri };
                 this.isImageChanged = true;

                 // You can also display the image using data:
                 const source = 'data:image/jpeg;base64,' + response.data;

                 this.setState({
                     image: source,
                     isImageSelected: true,
                 });


             }
         });*/
    }

    openGallery() {
        this.count = 0;
        this.retryCount = 0;

        ImagePicker.openPicker({
            multiple: false,
            includeBase64: true,
            //cropping:true

        }).then(images => {
            console.log(images);
            this.isImageChanged = true;

            // You can also display the image using data:
            const source = 'data:image/jpeg;base64,' + images.data;
            console.log(images.path);
            this.setState({
                base64:source,
                image: images.path,
                isImageSelected: true,

            });

            // this.uploadImage()
        }).catch((e) => {
            this.setState({imagePickerModal: false});
        });

    }


    uploadImage() {

        const {base64, album_name} = this.state;

        if (!album_name) {
            ToastMessage('Please enter album name');
            return;
        } else if (!base64) {
            ToastMessage('Please select image');
            return;
        }

        let data = {
            image:base64,
            album_name,
        };
        Keyboard.dismiss();

        this.setState({isLoading: true});


        fetch(Constants.BASE_URL + '/users/add_new_album', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.setState({isLoading: false});
                console.log(responseJson);
                if (status == '200') {
                    Alert.alert(
                        Constants.APP_NAME,
                        Strings.gallery.album_success_msg,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    this.props.navigation.goBack();
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


    updateImage() {

        const {base64, album_name, id} = this.state;

        if (!album_name) {
            ToastMessage('Please enter album name');
            return;
        }
        let data = {
            album_id: id,
            album_name,
        };
        if (base64 && base64.startsWith('data')) {

            data['image'] = base64;
        }

        // console.log(data)

        Keyboard.dismiss();

        this.setState({isLoading: true});


        fetch(Constants.BASE_URL + '/users/update_album', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.setState({isLoading: false});
                console.log(responseJson);
                if (status == '200') {
                    Alert.alert(
                        Constants.APP_NAME,
                        Strings.gallery.album_success_msg,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    this.props.navigation.goBack();
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

    showImageSelectionPopup() {
        Alert.alert(
            Constants.APP_NAME,
            'Select Image',
            [
                {
                    text: 'Camera',
                    onPress: () => {
                        //this.showImagePicker(true);
                    },
                    style: 'cancel',

                },
                {
                    text: 'Gallery',
                    onPress: () => {

                        //  this.showImagePicker(false);
                    },
                    style: 'cancel',

                },

            ],
            {cancelable: true},
        );

    }

    render() {
        const {isLoading, isImageSelected, album_name, isEditScreen, image, imagePickerModal} = this.state;
        return (<ScrollView style={{marginBottom: 20}} keyboardShouldPersistTaps="always">
                <TouchableOpacity style={styles.MainContainer} activeOpacity={1} onPress={()=>Keyboard.dismiss()}>
                    {isLoading && <LoadingSpinner/>}

                    {imagePickerModal && <ImageSelectionModal chooseGallery={() => {

                        this.setState({imagePickerModal: false}, () => {
                            setTimeout(() => {
                                this.showImagePicker(false);
                            }, 800);
                        });


                    }} takePhoto={() => {
                        this.setState({imagePickerModal: false});
                        this.showImagePicker(true);
                    }
                    }
                                                              cancelModal={() => this.setState({imagePickerModal: false})}
                                                              modalVis={imagePickerModal}/>
                    }


                    <View style={styles.subcontainer}>
                        {!isImageSelected &&
                        <TouchableOpacity onPress={() => {
                            Keyboard.dismiss()
                            this.setState({imagePickerModal: true});
                        }}>

                            <PhotoIcon width={150} height={200} fill={Colors.rgb_e15517}
                                       style={styles.imageUploadStyle}/>

                        </TouchableOpacity>
                        }

                        {isImageSelected &&
                        <View>
                            <Image source={image ? {uri: image} : NoImage} style={styles.imageUploadStyle}/>
                            <TouchableOpacity style={styles.closeIconStyle} onPress={() => {
                                this.setState({image: '', isImageSelected: !isImageSelected});
                            }}>
                                <CloseIcon width={23} height={23} fill={Colors.rgb_e15517}/>
                            </TouchableOpacity>

                        </View>
                        }
                        <Text style={styles.text2}>{isEditScreen ? 'Update Album' : 'Create New Album'}</Text>


                        <View style={styles.textInputParentStyle}>

                            <PhotoIcon width={23} height={23} fill={Colors.rgb_e15517} style={{marginLeft: 10}}/>

                            <TextInput
                                style={{marginLeft: 5, width: '80%', paddingLeft: 10}}
                                ref={ref => this._passwordRef = ref}
                                placeholder={'Album Name'}
                                onChangeText={(album_name) => this.setState({
                                    album_name,
                                })}
                                value={album_name}
                                secureTextEntry={false}
                                maxLength={30}
                                returnKeyType={'done'}
                                onSubmitEditing={() => {
                                    this.uploadImage();
                                }}

                                blurOnSubmit={false}/>

                        </View>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                isEditScreen ? this.updateImage() : this.uploadImage();

                            }}
                            activeOpacity={1}>
                            <Text style={styles.text5}>{isEditScreen ? 'Update' : 'Add'}</Text>
                        </TouchableOpacity>




                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }

}


export default connect(null, null)(UploadAlbumScreen);
