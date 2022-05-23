import React, {Component} from 'react';
import {
    Alert,
    Image, Keyboard,
    PermissionsAndroid,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/UploadImageStyles';
import LoadingSpinner from '../../components/LoadingSpinner';
/*
import ImagePicker from 'react-native-image-picker';
*/
import ImagePicker from 'react-native-image-crop-picker';

import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import PhotoIcon from '@svg/ic_photo';
import CameraIcon from '@svg/camera';
import Colors from '../../Resources/Colors';
import HomeItem from '../../components/HomeItem';
import {Strings} from '../../utils/Strings';
import NoImage from '../../Images/assets/no_product.jpg';
import CloseIcon from '@svg/close';


// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Image',
    //customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class UploadImageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerList: '',
            isLoading: false,
            image: '',
            isImageSelected: false,
            gallery_name:'',
            isVisible: false,
            gallery_name_arr: [],
            gallery_price_arr: [],
            gallery_barcode_arr: [],
        };
        this.pageNumber = 1;
        this.count = 0;
        this.retryCount = 0;
    }


    componentDidMount(): void {
        const {requestMyCustomers} = this.props;

        //console.log(JSON.stringify(this.props))

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
            multiple: true,
            maxFiles: 5,
            includeBase64: true,
            includeExif: true,
            // width: 300,
            //  height: 400,
            //cropping:true
        }).then(images => {
            let obj = {};
            obj.data = images.data;
            let imagArr = [];
            imagArr.push(obj);
            // alert(JSON.stringify(images));
            const source = 'data:image/jpeg;base64,' + images.data;

            this.setState({
                image: imagArr,
                isImageSelected: true,
                isVisible: true
            });

            // this.uploadImage(imagArr, 0);
        }).catch((e) => {
            alert(e);
        });

    }

    openGallery() {
        this.count = 0;
        this.retryCount = 0;
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 5,
            includeBase64: true,

        }).then(images => {
            console.log(images);
            this.setState({isVisible: true, image: images})
            // if (images.length > 0) {
            //     this.uploadImage(images, 0);
            // }
        }).catch((e) => {
            console.log(e)
        });

    }


    openImagePicker() {

    }


    uploadImage(images, index) {


        const {image,gallery_name,gallery_name_arr, gallery_price_arr, gallery_barcode_arr} = this.state;
        const {album_id} = this.props.route.params;
        /*

                if (!image) {
                    ToastMessage('Please select image');
                    return;
                }
        */
        this.setState({isLoading: true});


        let data = {
            image: 'data:image/jpeg;base64,' + images[index].data,
            album_id,
            gallery_name: gallery_name_arr[index],
            gallery_price: gallery_price_arr[index],
            gallery_barcode: gallery_barcode_arr[index],
        };



        fetch(Constants.BASE_URL + '/users/add_new_gallery', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.count++;
                this.retryCount = 0;
                if (this.count < images.length) {  // 5<5
                    this.uploadImage(images, this.count);
                } else {
                    this.setState({isLoading: false});
                    console.log(responseJson);
                    if (status == '200') {
                        Alert.alert(
                            Constants.APP_NAME,
                            'Image uploaded Successfully',
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
                }


            })
            .catch((error) => {
                this.setState({isLoading: false});
                this.retryCount++;


                if (this.retryCount < 4 && this.count < images.length) {  // 5<5
                    this.uploadImage(images, this.count);
                } else {
                    ToastMessage(error.message.toString());

                }

            });

    }


    modalView() {

        const {isVisible,image,gallery_name,gallery_name_arr,gallery_barcode_arr} = this.state
        
        console.log('image', image)
        return (
            <Modal
                visible={isVisible}
                onRequestClose={() => {
                    this.setState({isVisible: !isVisible})
                }}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <View style={{flex: 1}}>
                            <FlatList 
                            style={{width: '100%',marginBottom: 0}}
                            keyboardShouldPersistTaps='always'
                            data={image}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => {
                                console.log(item)
                                let imageURI = 'data:image/jpeg;base64,' + image[index].data
                                console.log('imageURI ', imageURI)
                                return (
                                    <View>
                                        <Image source={{uri: imageURI}} style={[styles.imageStyle,{marginTop: index != 0 ? 14 : 0}]} />
                                        <Text style={styles.uploadText}>{'Enter Image Name'}</Text>
                                        <TextInput 
                                            style={[styles.inputStyle,{marginBottom: 0}]}
                                            placeholder={'Enter Image Name'}
                                            value={gallery_name_arr[index]}
                                            onChangeText={(text) => {
                                                this.state.gallery_name_arr.splice(index,0,text)
                                                console.log(this.state.gallery_name_arr)
                                            }}
                                        />
                                        <Text style={styles.uploadText}>{'Enter Price'}</Text>
                                        <TextInput 
                                            style={[styles.inputStyle,{marginBottom: 0}]}
                                            placeholder={'Enter Price'}
                                            value={gallery_name_arr[index]}
                                            onChangeText={(text) => {
                                                this.state.gallery_price_arr.splice(index,0,text)
                                                console.log(this.state.gallery_price_arr)
                                            }}
                                        />
                                        <Text style={styles.uploadText}>{'Enter Barcode'}</Text>
                                        <TextInput 
                                            style={[styles.inputStyle,{marginBottom: 0}]}
                                            placeholder={'Enter Barcode'}
                                            value={gallery_barcode_arr[index]}
                                            onChangeText={(text) => {
                                                this.state.gallery_barcode_arr.splice(index,0,text)
                                                console.log(this.state.gallery_barcode_arr)
                                            }}
                                        />
                                    </View>
                                )
                            }}
                            showsHorizontalScrollIndicator={false}
                        />
                        </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity 
                            style={styles.submitButton}
                            onPress={() => this.uploadImage(image, 0)}
                        >
                            <Text style={styles.submitText}>{'Submit'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.submitButton}
                            onPress={() => this.setState({image: '',isVisible: false})}
                        >
                            <Text style={styles.submitText}>{'Cancel'}</Text>
                        </TouchableOpacity>
                    </View>
                    
                    </View>
                    
                </View>
            </Modal>
        )
    }

    render() {
        const {isLoading, isImageSelected, gallery_name} = this.state;
        return (<ScrollView style={styles.mainContainer}>

                <View style={styles.mainContainer}>
                    {isLoading && <LoadingSpinner/>}

                    <View style={{marginTop: 50}}>

                        {!isImageSelected &&
                        <PhotoIcon width={100} height={100} fill={Colors.rgb_e15517} style={styles.imageUploadStyle}/>

                        }

                        <Text style={styles.text2}>{'Our Gallery'}</Text>


                        {/*<View style={styles.textInputParentStyle}>

                            <PhotoIcon width={23} height={23} fill={Colors.rgb_e15517} style={{marginLeft: 10}}/>

                            <TextInput
                                style={{marginLeft: 5, width: '80%', paddingLeft: 10}}
                                ref={ref => this._passwordRef = ref}
                                placeholder={'Album Name'}
                                onChangeText={(gallery_name) => this.setState({
                                    gallery_name,
                                })}
                                value={gallery_name}
                                secureTextEntry={false}
                                maxLength={30}
                                returnKeyType={'done'}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss()
                                }}
                                blurOnSubmit={false}/>

                        </View>*/}

                        <View style={styles.parentView}>
                            <HomeItem
                                onPress={() => {
                                    this.showImagePicker(true);
                                }}
                                titleStyle={{color: Colors.rgb_e15517}}
                                title={Strings.home.take_photos}
                                icon={<CameraIcon width={50} height={50} fill={Colors.rgb_e15517}
                                                  style={{alignSelf: 'center'}}/>}
                            />


                            <HomeItem
                                onPress={() => {
                                    this.showImagePicker(false);
                                }}
                                titleStyle={{color: Colors.rgb_e15517}}
                                title={Strings.home.from_phone}
                                icon={<PhotoIcon width={50} height={50} fill={Colors.rgb_e15517}
                                                 style={{alignSelf: 'center'}}/>}
                            />

                        </View>


                        {/* <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.uploadImage();
                            }}
                            activeOpacity={1}>
                            <Text style={styles.buttonStyle}>{'Add'}</Text>
                        </TouchableOpacity>*/}
                    </View>
                </View>
                {this.modalView()}
            </ScrollView>
        );
    }


}


export default connect(null, null)(UploadImageScreen);
