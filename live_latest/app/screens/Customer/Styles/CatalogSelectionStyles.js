import {StyleSheet,Dimensions} from 'react-native';
import {
    Colors,
    Fonts,
    ApplicationStyles,
} from '@resources';

const {width}=Dimensions.get('window')
const {height}=Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    itemStyle: {
        flex: 1,
        ...ApplicationStyles.shadowBoxCard.container,
        backgroundColor: 'white',
      //  flexDirection: 'row',
        marginHorizontal: 14,
        marginVertical: 7,
    },

    imageStyle: {
        width: width-25,
        height: 500,
        marginBottom:5
    },
    itemContentView: {
        alignItems: 'center',
        alignSelf: 'center',
    },

    textTitleStyle: {
        ...Fonts.style.semiBold_14,
        color: Colors.rgb_000000,
        textAlign: 'center',
    },
    textDescriptionStyle: {
        ...Fonts.style.regular_14,
        color: Colors.rgb_000000,
        marginVertical: 5,
        textAlign: 'center',

    },

    toggleButtonStyle: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
    banner: {
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.8)",
        position: "absolute",
        top: "50%",
      },
      bannerText: {
        ...Fonts.bold_20,
        color: Colors.rgb_000000,
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }
});
