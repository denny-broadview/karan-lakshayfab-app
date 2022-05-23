import {StyleSheet} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

export default StyleSheet.create({

    drawerContent: {
        flex: 1,
        backgroundColor: Colors.rgb_e6e6e6,
        marginTop: -5,
    },

    profileImageStyle: {

        width: 100,
        height: 100,
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: -50,
        backgroundColor: 'white',
        // /marginBottom: 50,
    },

    userNameStyles: {

        alignSelf: 'center',
        marginTop: 20,
        color: 'black',
        marginBottom: 20,
     //   marginHorizontal:10,
        ...Fonts.style.semiBold_14,
        textAlign: 'center'
    },

    drawerLabelStyle: {
       ...Fonts.style.regular_14,
        marginLeft:-15,

    },

    card: {
        marginBottom: 1,
        //borderRadius: 5,
        //height: 50,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    drawerSection: {
        marginTop: 15,
        paddingBottom: 100,
        //backgroundColor:'red'
    },

});
