import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;


export default StyleSheet.create({
    imageStyles: {
       /* width: width - 25,
        height: 500,*/
        width: width-30,
        height:width+(width*33/100),
        marginBottom: 5,
    },
    galleryImageStyles: {
        width: '100%', height: '100%', borderRadius: 5,
    },
    homeImageStyle: {
        flex: 1,
    },

    tabletImageStyles: {
        width: width-30,
        height:width+(width*33/100),
        marginBottom: 5,
    },
    tabletGalleryImageStyles: {
        width: '100%', height: '100%', borderRadius: 5,
    },
    tabletHomeImageStyle: {
        flex: 1,
    },

});
