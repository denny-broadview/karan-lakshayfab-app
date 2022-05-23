import React from 'react';
import {View, Text, FlatList, Image, Platform, TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import styles from './Styles/ProductGalleryStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {Strings} from '../../utils/Strings';
import HomeItem from '../../components/HomeItem';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import * as customerActions from '../../actions/customerActions';
import LoadingSpinner from '../../components/LoadingSpinner';
import {formatString} from '../../utils/TextUtils';
import GalleryImage from '../../components/GalleryImage';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;

class ProductGalleryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: '',
            productList: [],
        };
    }

    componentDidMount(): void {

        let d = new Date();
        let n = d.getMonth();
        let currentMonthObj = Strings.months[n];
        this.setState({month: currentMonthObj.value});
        this.getProductsGallery(n+1);
    }


    getProductsGallery(month) {
        const {id} = this.props;
        let productGallery = {
            'month': month,
            "user_id" : id
        };

        this.setState({isLoading: true});
        console.log('current Month--', productGallery);

        fetch(Constants.BASE_URL + '/products/product_gallery', {
            method: 'POST',
            body: JSON.stringify(productGallery),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                const {status, message} = responseJson;
                this.setState({isLoading: false});
                if (status == '200') {
                    this.setState({productList: responseJson.data});
                } else {
                    ToastMessage(message);
                }


            })
            .catch((error) => {

                this.setState({isLoading: false});
                ToastMessage(error.message.toString());
            });

    }


    renderItem(item,index) {
        const {productList} = this.state;
        const {images} = item;
        let imageUrl;
        if (item && images.length > 0) {
            imageUrl = formatString(Constants.IMAGES_URL.GALLERY_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, item.images[0].product_image);
        }

        let odd=productList.length%2;

        return <HomeItem
            style={(odd===1 && index===productList.length-1)?{maxWidth:width/2-15,height:300}:{maxWidth:width/2-5,height:300}}
            icon={
                <GalleryImage type={Constants.IMAGES_TYPES.product} image={images.length>0?images[0].product_image:''}/>
            }



            onPress={() => this.props.navigation.navigate('CustomerOrderDetailScreen',{
                order_id:item.order_id,order_number:item.order_number
            })}
        />;
    }


    renderFlatList() {

        const {productList} = this.state;
        return <FlatList
            style={{marginTop: 100, marginBottom: 10,marginHorizontal:5}}
            keyExtractor={(item, index) => item.id || index.toString()}
            data={productList}
            renderItem={({item, index}) => this.renderItem(item, index)}
            numColumns={2} />;
    }

    renderMonthView() {
        return <View style={styles.monthlyView}>
            <Text style={{textAlign: 'center', marginRight: 20}}>{'Month:'}</Text>
            <DropDownPicker
                items={Strings.months}
                defaultValue={this.state.month}
                placeholder="Select Month"
                containerStyle={{height: 40}}
                style={styles.dropDownContainer}
                labelStyle={styles.dropDownItemStyle}
                arrowContainerView={styles.arrowContainerView}
                arrowSize={22}
                arrowColor={'white'}

                placeholderStyle={styles.placeholderStyle}
                dropDownStyle={{backgroundColor: '#fafafa',}}
                onChangeItem={(item,index) => {
                    this.setState({month: item.value});
                    this.getProductsGallery(index+1);
                }}
            />

        </View>;
    }

    render() {
        const {isLoading} = this.state;
        return <View style={styles.container}>
            {!isLoading && this.renderFlatList()}
            {this.renderMonthView()}
            {isLoading && <LoadingSpinner/>}

        </View>;
    }

}

const mapStateToProps = (state) => ({
    id: state.loginReducer.id,

});

export default connect(mapStateToProps, null)(ProductGalleryScreen);
