import {Dimensions, StyleSheet, View} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    /* container: {
         flex: 1,
         backgroundColor: Colors.white,
         alignItems:'center'
     },*/
    uploadAvatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    MainContainer: {
        marginTop: 20,
        alignSelf: 'center',
        marginBottom: 20,

    },
    row: {
        borderRadius: 5,
        marginTop: 60,
        backgroundColor: '#E15517',
        width: DEVICE_WIDTH - 130,
        height: 60,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    col: {
        backgroundColor: '#E15517',
        alignSelf: 'center',
        paddingLeft: 30,
    },
    text5: {
        color: '#ffff',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 66,
    },
    text2: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E15517',
        textAlign: 'center',
    },
    container: {
        marginTop: 30,
        alignItems: 'center',
    },
    button: {
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E15517',
        height: 50,
        // width: '70%',
        borderRadius: 5,
        zIndex: 100,
    },

    row2: {
        width: DEVICE_WIDTH,
        borderBottomWidth: 1,
        borderColor: '#aaa',
        borderTopWidth: 1,
        marginTop: 20,
        flexDirection: 'column',
        height: 150,
        marginBottom: 50,
        alignSelf: 'center',
    },
    col1: {
        left: 30,
        marginTop: 20,
        borderTopWidth: 1,
        width: 120,
        borderColor: '#aaa',
        alignSelf: 'center',

    },
    row3: {
        width: DEVICE_WIDTH,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    subcontainer: {
        flexDirection: 'column',
        alignSelf: 'center',
    },

    textInputParentStyle: {
        //...ApplicationStyles.shadowBoxCard.container,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: Colors.rgb_f9f9f9,
        borderColor: Colors.rgb_e15517,
        flexDirection: 'row',
        marginHorizontal: 14,

        height: 50,
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 5,


    },
    imageUploadStyle: {
        width: DEVICE_WIDTH / 2,
        height: 300,
        alignSelf: 'center',
    },

    closeIconStyle: {
        //...ApplicationStyles.shadowBoxCard.container,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        position: 'absolute',
        elevation: 10,
        top: -12,
        left: DEVICE_WIDTH/2 +DEVICE_WIDTH/(5.6),

    },
});
