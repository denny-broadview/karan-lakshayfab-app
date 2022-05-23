import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 export default StyleSheet.create({
    absoluteFill: {
        ...StyleSheet.absoluteFill,
        zIndex: 9999,
        height: 100,
        width: 100,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
      // backgroundColor: 'rgba(238,238,238,0.6)',
       //elevation:20,
        zIndex: 9999,
    },
    loadingChildView: {
        height: 100,
        padding: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(238,238,238,1)',
    },

    parentView: {
        ...StyleSheet.absoluteFill,
        zIndex: 999,
    },
});
