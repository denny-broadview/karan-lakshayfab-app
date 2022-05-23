import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import Styles from './Styles/FastImageStyles';
import NoProductImage from '../Images/gif/placeholder.gif';
import FastImage from 'react-native-fast-image';

let url = 'https://media.giphy.com/media/JTzI2kM0ymlizRwyV2/giphy.gif';

const GalleryImage = (props) => {
    const {image, styles, type} = props;
    let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, type, image);

    const [imageLoad, SetImageLoad] = useState(false);

    return <View style={[Styles.galleryImageStyles, styles]}>
        <Image
            style={[Styles.galleryImageStyles, styles]}
            source={imageUrl ? {
                uri: imageUrl,
            } : NoProductImage}

            onLoad={() => {
                SetImageLoad(true);
            }}
            resizeMode={FastImage.resizeMode.cover}
            fallback
            cache={FastImage.cacheControl.immutable}
        />
        {!imageLoad && <Image
            resizeMode={'contain'}
            style={[Styles.galleryImageStyles, styles, {position: 'absolute'}]}
            source={require('../Images/gif/placeholder.gif')}
            cache={FastImage.cacheControl.immutable}

        />
        }

    </View>;
};

export default GalleryImage;
