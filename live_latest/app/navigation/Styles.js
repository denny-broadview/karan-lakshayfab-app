import { StyleSheet } from 'react-native'
import {
    Colors,
    Fonts,
    ApplicationStyles
} from '@resources'

export default StyleSheet.create({
    tabBarContainer: {
        flex: 1,
        height:38,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.rgb_e15517,
        //marginHorizontal:2,
        marginVertical:10,
        borderRadius: 2,
        shadowColor: Colors.rgb_b9b9b9,
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderColor:Colors.rgb_e15517,
        borderWidth:1
    },

    adminTabBarContainer: {
        flex: 1,
       // height:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.rgb_e15517,
        paddingVertical:5

    },
    tabBarTextStyle:{
        ...Fonts.style.semiBold_12,
        alignSelf: 'center',
        textAlign: 'center'
       //semi bold_13
    },
    adminTabsTextStyle:{
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 5,
        ...Fonts.style.regular_12,

    }

})
