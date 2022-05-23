import React ,{useState}from 'react';
import {Image, TouchableOpacity, View, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Colors from '../../Resources/Colors';
import CloseIcon from '@svg/close';
import NoProductImage from '../../Images/gif/placeholder.gif';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let url='https://media.giphy.com/media/JTzI2kM0ymlizRwyV2/giphy.gif'

const ImageZoomScreen = (props) => {
    const {imageUrl} = props.route.params;
    console.log(imageUrl)
    const [imageLoad,SetImageLoad]=useState(false)
    return (<View>

            <ImageZoom cropWidth={width}
                       cropHeight={height}
                       pinchToZoom={true}
                       imageWidth={width}
                       imageHeight={height}>

                <FastImage
                    resizeMode={'contain'}
                    style={{width: width, height: height,}}
                    source={{uri: imageUrl}}
                   cache={FastImage.cacheControl.immutable}
                    fallback
                    onLoad={()=>{
                        SetImageLoad(true)
                    }}

                />

                {!imageLoad && <Image
                    resizeMode={'contain'}
                    style={{width: width, height: height,position:'absolute'}}
                    source={require('../../Images/gif/placeholder.gif')}
                    cache={FastImage.cacheControl.immutable}
                />
                }
            </ImageZoom>

            <TouchableOpacity
                onPress={()=>props.navigation.goBack()}
                style={{position: 'absolute',right:15,top:15}}>
                <CloseIcon width={23} height={23} fill={Colors.rgb_e15517} />
            </TouchableOpacity>
        </View>
    );
};
export default React.memo(ImageZoomScreen);
/*
export default class ImageZoomScreen extends React.Component {


    render() {
        const {imageUrl}=this.props.route.params
        return (

            <ImageZoom cropWidth={width}
                       cropHeight={height}
                       pinchToZoom={true}
                       imageWidth={width}
                       imageHeight={height}>
                <Image
                    resizeMode={'contain'}
                    style={{width: width, height: height}}
                    source={{uri: imageUrl}}/>
            </ImageZoom>
        );
    }
}*/
