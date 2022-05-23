import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';
import colors from '../../../Resources/Colors';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    rootContainer: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: 'transparent',
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? 50 : 50,
    },

    photoContainer: {
        backgroundColor: Colors.rgb_e15517,
        height: 170,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },

    profileView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 100,
        backgroundColor: 'white',
        height: 100,
        width: 100,
        borderRadius: 50,
        elevation: 10,
        right: 0,
        zIndex: 9999,
        left: (Dimensions.get('window').width / 2) - 50,
    },

    closeIconStyle: {
        shadowRadius: 4,
         zIndex:9999,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        position: 'absolute',
        elevation: 10,
        top: 100,
        right: Dimensions.get('window').width / 2-50,
    },
    uploadAvatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    signin: {
        ...Fonts.style.semiBold_16,
        color: 'black',
        marginTop: 50,
        alignSelf: 'center',
    },

    parentView: {
        backgroundColor: 'white',
        borderRadius: 20,
        //  marginTop: 20,
        marginHorizontal: 30,
        padding: 20,
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 200 : 0,
    },
    textInputParent: {
        borderWidth: 2,
        borderColor: Colors.rgb_e15517,
        flexDirection: 'row',
        width: '100%',
        height: 40,
        alignItems: 'center',
        marginTop: 30,
    },
    email: {
        backgroundColor: Colors.rgb_f9f9f9,
        shadowColor: Colors.rgb_b9b9b9,
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),

        borderColor: Colors.rgb_e15517,
        borderWidth: 1,
        borderRadius: 3,
        width: '100%',
        paddingVertical:5,
        //height:40,
        marginTop: 20,
    },
    textInputStyle: {
        width: window.width / 2 + window.width / 7,
    },
    forgotPasswordTextStyle: {
        ...Fonts.semiBold_14,
        color: Colors.rgb_e15517,
        marginTop: 30,
    },

    shadowView: {},

    btnStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        width: '46%',
        backgroundColor: colors.rgb_e15517,
        alignItems: 'center',
        padding: 10,
    },
    textBtnStyle: {
        ...Fonts.style.bold_16,
        textAlign: 'center',
        color: 'white',

    },


});

export default styles;
