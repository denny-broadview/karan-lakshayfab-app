import {StyleSheet, Dimensions} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';
import DeviceInfo from 'react-native-device-info';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const isTablet = DeviceInfo.isTablet();

const DEVICE_WIDTH = Dimensions.get('window').width;

const DEVICE_HEIGHT = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    MainContainer: {
        alignItems: 'center',
        flex: 1,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E15517',
        height: 30,
        width: 90,
        borderRadius: 5,
        zIndex: 100,
    },
    text5: {
        //fontWeight: 'bold',
        color: '#ffff',
        fontSize: 12,
        backgroundColor: 'transparent',
    },
    text1: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
        left: 20,
    },
    view1: {
        flexDirection: 'row',
        width: DEVICE_WIDTH,
        alignSelf: 'center',
        borderColor: '#aaa',
        borderWidth: 2,
    },
    view2: {
        flexDirection: 'row',
        paddingVertical: 10,
        position: 'absolute',
        zIndex: 9999,
        right: 5,
        //top:5
        //paddingH
        // height: '8%',
    },
    view3: {
        width: '60%',
        height: 100,
        borderColor: '#aaa',
        borderWidth: 2,
    },
    image: {
        alignSelf: 'center',
        height: 50,
    },
    image1: {
        alignSelf: 'center',
        marginTop: '10%',
        height: 50,
    },
    subview: {
        flexDirection: 'column',
        width: '40%',
    },
    buttonview: {
        right: 20,
        position: 'absolute',
        alignSelf: 'center',
    },
    subview1: {
        borderColor: '#aaa',
        borderWidth: 2,
    },

    shopNow: {
        alignItems: 'center', alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        width: DEVICE_WIDTH - 15,
    },
    latestItemsView: {
        flex: 1,
        alignItems: 'center',
    },
    latestImageStyle: {
        width: DEVICE_WIDTH/2-20,
        height: ((DEVICE_WIDTH/2 - 20) * 134 / 100)
    },
    titleName:{
        color: Colors.rgb_e15517,
        ...Fonts.style.semiBold_16,
        marginHorizontal: 5
    },

    latestItemTextStyle: {
       // fontWeight: 'bold',
        color: Colors.rgb_e15517,
        ...Fonts.style.semiBold_16,
        marginHorizontal:10,
        marginTop:15,
        marginBottom:10,
        backgroundColor: 'transparent',
    },
});
