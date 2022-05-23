import {Dimensions, StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'white'
    },
    text2: {
        ...Fonts.style.semiBold_14,
        marginVertical: 30,
        color: '#E15517',
        textAlign: 'center',
    },
    parentView: {
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    itemParentView: {
        ...ApplicationStyles.shadowBoxCard.container,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 7,
        elevation: 5,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 10,
        alignItems: 'center',
    },
    button: {
        ...ApplicationStyles.shadowBoxCard.container,
        ...Fonts.style.semiBold_14,
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E15517',
        height: 40,
        paddingHorizontal:80,
        borderRadius: 5,
        zIndex: 100,
    },
    buttonStyle:{
        ...Fonts.style.semiBold_14,
        marginVertical: 30,
        color: 'white',
        textAlign: 'center',
    },


    imageUploadStyle: {
        width: '80%',
        height: 300,
        alignSelf: 'center',

    },

    closeIconStyle: {
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        position: 'absolute',
        elevation: 10,
        top:-12,
        right: '7%',
    },
    textInputParentStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
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
        marginVertical:20
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        height: DEVICE_HEIGHT / 1.6,
        width: DEVICE_WIDTH / 1.2,
        borderRadius: 6,
        padding: 8,
        backgroundColor: '#fff'
    },
    imageStyle: {
        height: DEVICE_HEIGHT / 2.2,
        width: '100%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    uploadText: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_e15517,
        marginTop: 4
    },
    inputStyle: {
        ...Fonts.style.regular_14,
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.rgb_e15517,
        marginTop: 4
    },
    submitButton: {
        width: '40%',
        height: 42,
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: Colors.rgb_e15517,
        justifyContent: 'center',
        alignItems:'center'
    },
    submitText: {
        ...Fonts.style.semiBold_14,
        color: '#fff'
    }




});
