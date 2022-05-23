import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import HomeItem from './HomeItem';
import Colors from '../Resources/Colors';
import {Strings} from '../utils/Strings';
import CameraIcon from '@svg/camera';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Image',
    //customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class CameraCaptureImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
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


    showImagePicker() {
        if (Platform.OS != 'ios') {
            this.requestExternalStorageSavePermission().then((didGetPermission) => {
                if (didGetPermission) {
                    this.openCamera();
                }
            });
        } else {
            this.openCamera();
        }
    }

    openCamera() {
        // Launch Camera:
        const {onPress}=this.props
         ImagePicker.launchCamera(options, (response) => {
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

                 let obj={}
                 obj.data=response.data
                 let imagArr=[]
                 imagArr.push(obj)
                 onPress(imagArr)

                 /*this.setState({
                     image: source,
                     isImageSelected: true,
                 });*/



             }
         });
    }

    render() {
        return <HomeItem
            onPress={() => {
                this.showImagePicker(true);
            }}
            titleStyle={{color: Colors.rgb_e15517}}
            title={Strings.home.take_photos}
            icon={<CameraIcon width={50} height={50} fill={Colors.rgb_e15517}
                              style={{alignSelf: 'center'}}/>}
        />;
    }


}

export default CameraCaptureImage;
