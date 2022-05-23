import React from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import styles from './Styles/CustomSliderStyles';
import NoProductImage from '../Images/assets/no_product.jpg';
import Swiper from 'react-native-swiper';
import DeviceInfo from 'react-native-device-info';
import {formatString} from '../utils/TextUtils';
import {Constants} from '../Resources';
import FabricImage from './FastImage';
import ZoomIcon from '@svg/ic_zoom';

const isTablet = DeviceInfo.isTablet();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const _renderItem = (props,item, index) => {

    const {navigation} = props;
    const {product_image} = item;

    let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, product_image);
    let fullImage = formatString(Constants.IMAGES_URL.LARGE_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, product_image);

    return (<View key={index.toString()}>

            <TouchableOpacity style={{alignSelf: 'center'}} >

                <FabricImage image={product_image} type={Constants.IMAGES_TYPES.product}
                    onPressItem={() => {
                        navigation.navigate('ImageZoomScreen', {
                            imageUrl: fullImage,
                        });
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute',  right: 10,bottom:15}} onPress={() => {
                navigation.navigate('ImageZoomScreen', {
                    imageUrl: fullImage,
                });
            }}>
                <ZoomIcon width={23} height={23} fill={'white'}/>
            </TouchableOpacity>
        </View>
    );


};

 const CustomSlider=(props)=>{

    const {data}=props

    return (data.length == 0? (<View style={[styles.minimumItemStyle, {marginTop: 7, alignItems: 'center'}]}>

            <Image
                resizeMode='cover'
                source={NoProductImage}
                style={{width: width - 25, height: 300,}}/>

        </View>):(<View style={[styles.minimumItemStyle, {height: isTablet?width+(width*33/100):500, padding: 1, marginTop: 7,}]}>

            <Swiper showsButtons={false} autoplay={true} removeClippedSubviews={false} >
                {data.map((item, index) =>
                    _renderItem(props,item, index),
                )}
            </Swiper>

        </View>)
    )
}

export default CustomSlider