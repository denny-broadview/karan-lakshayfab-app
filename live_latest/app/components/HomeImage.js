import React, {useState} from 'react';
import { Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './Styles/FastImageStyles';
import {formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import NoProductImage from '../Images/gif/placeholder.gif';


const HomeImage = (props) => {
    const {image,imageStyle, type,imageUri} = props;
    let imageUrl = imageUri?imageUri:formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, type, image);
    const [imageLoad, SetImageLoad] = useState(false);
    return <View style={[Styles.homeImageStyle]}>

        <FastImage
            style={[Styles.homeImageStyle,imageStyle]}
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

        {!imageLoad && <Image
            resizeMode={'contain'}
            style={[Styles.homeImageStyle, {position: 'absolute',alignSelf:'center'}]}
           source={require('../Images/gif/placeholder.gif')}
            cache={FastImage.cacheControl.immutable}


        />
        }
    </View>;
};

export default HomeImage;
