import { StyleSheet } from 'react-native'
import {
    Colors,
    Fonts,
    ApplicationStyles
} from '@resources'

export default StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop: 10,
        // paddingHorizontal: 96,
        width:'100%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    minimumItemStyle: {
        ...ApplicationStyles.shadowBoxCard.container,
        //flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 14,
        marginBottom: 6,
        padding: 10,
        justifyContent: 'space-between',

    },



})
