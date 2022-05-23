import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './Styles/FastImageStyles';
import {formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import NoProductImage from '../Images/gif/placeholder.gif';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

const FabricImage = (props) => {
    const {image, imageStyle, type, imageUri, onPressItem, disabled } = props;
    let imageUrl = imageUri ? imageUri : formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, type, image);
    const [imageLoad, SetImageLoad] = useState(false);
    if (type==Constants.IMAGES_TYPES.product){
        //console.log('ImageUrl---',imageUrl)
    }

    console.log(disabled)

    return isTablet ? <View style={[Styles.tabletImageStyles, imageStyle]}>
        <TouchableOpacity disabled={disabled} onPress={() => {onPressItem && onPressItem()}}>
        <FastImage
            style={[Styles.tabletImageStyles, imageStyle]}
            source={imageUrl ? {
                uri: imageUrl,
            } : NoProductImage}
            onLoad={() => {
                SetImageLoad(true);
            }}
            resizeMode={FastImage.resizeMode.cover}
            fallback
            defaultSource={NoProductImage}
        />
        </TouchableOpacity>

        {!imageLoad && <Image
            resizeMode={'contain'}
            style={[Styles.tabletImageStyles, imageStyle, {position: 'absolute'}]}
            source={require('../Images/gif/placeholder.gif')}
            cache={FastImage.cacheControl.immutable}


        />
        }
    </View> : <View style={[Styles.imageStyles, imageStyle]}>
    <TouchableOpacity onPress={() => {onPressItem && onPressItem()}}>
        <FastImage
            style={[Styles.imageStyles, imageStyle]}
            source={imageUrl ? {
                uri: imageUrl,
            } : NoProductImage}
            onLoad={() => {
                SetImageLoad(true);
            }}
            resizeMode={FastImage.resizeMode.cover}
            fallback
            defaultSource={NoProductImage}
        />
        </TouchableOpacity>

        {!imageLoad && <Image
            resizeMode={'contain'}
            style={[Styles.imageStyles, imageStyle, {position: 'absolute'}]}
            source={require('../Images/gif/placeholder.gif')}
            cache={FastImage.cacheControl.immutable}


        />
        }
    </View>;
};

export default FabricImage;
