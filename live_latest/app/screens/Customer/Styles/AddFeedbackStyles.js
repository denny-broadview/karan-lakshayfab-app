import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {
    ApplicationStyles,
    Colors,
    Fonts,
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

    signin: {
        ...Fonts.style.bold_20,
        color: 'white',
        marginTop: 50,
        alignSelf: 'center',
    },

    parentView: {

        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 50,
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

    textInputStyle: {
        width: window.width / 2 + window.width / 12,
        alignSelf: 'flex-start',
        marginTop:Platform.OS=='ios'?0:-10,
        paddingRight:20,

    },
    forgotPasswordTextStyle: {
        ...Fonts.style.semiBold_16,
        color: Colors.rgb_e15517,
        marginTop: 30,
    },
    textInputParentStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        marginHorizontal:14,
        backgroundColor: Colors.rgb_f9f9f9,
        alignItems: 'flex-start',
        marginTop: 15,
        paddingHorizontal:10,
        height: 200,
        //alignItems: 'center',
        padding: 10,
        margin:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:colors.rgb_e15517,
        flexDirection:'row'
    },

    shadowView: {
        flex:1,
        margin:20,
    },

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
