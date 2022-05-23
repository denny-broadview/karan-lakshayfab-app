import React from 'react';
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../../Resources/Colors';
import * as customerActions from '../../actions/customerActions';
import {calculateTotalPrice, calculateTotalQty, convertStringToNumber, formatString} from '../../utils/TextUtils';
import {Constants} from '../../Resources';
import TotalPrice from '../../components/TotalPrice';
import {Strings} from '../../utils/Strings';
import DeleteIcon from '@svg/ic_delete.svg';
import MinusIcon from '@svg/minus';
import AddIcon from '@svg/add';
import ZoomIcon from '@svg/ic_zoom';

import ErrorScreen from '../../components/ErrorScreen';
import ToastMessage from '../../components/ToastMessage';
import LoadingView from '../../components/LoadingView';
import styles from './Styles/CartStyles';
import NoProductImage from '../../Images/assets/no_product.jpg';
import Swiper from 'react-native-swiper';
import FabricImage from '../../components/FastImage';
import DeviceInfo from 'react-native-device-info';
import CustomSlider from '../../components/CustomSlider';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const isTablet = DeviceInfo.isTablet();

class CartScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartList: '',
            isLoading: true,
            productImagesArray: [],

        };
    }

    componentDidMount(): void {
        const {cartArr} = this.props;

        //  console.warn(width+'--'+height)

        if (cartArr != undefined && cartArr) {
            this.setState({cartList: cartArr, isLoading: false});
        } else {
            this.setState({cartList: [], isLoading: false});
        }

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        const {cartArr} = this.props;
        if (this.props != prevProps) {

            this.setState({cartList: cartArr, isLoading: false});
        }
    }

    renderSubcategoryView(title, qty, price) {
        return <View style={styles.subCategoryView}>
            <Text style={[styles.minQtyStyle]}>{`${title} ${qty}`}</Text>
          {/*  <Text style={[styles.minQtyStyle]}>{`${Strings.cart.price_symbol} ${price}`}</Text>*/}

        </View>;
    }


    renderTotalView(title, qty, price) {
        return <View style={[styles.subCategoryView]}>
            <Text style={styles.priceTotalStyle}>{`${title} ${qty}`}</Text>
            <Text style={styles.priceTotalStyle}>{`Total ${Strings.cart.price_symbol} ${price}`}</Text>

        </View>;
    }

    removeItem(item, index) {
        this.props.storeCartData(item, Constants.CRUD_OPERATION_TYPES.DELETE);

    }

    handleMinusView(productItem, index) {
        const {added_piece, product_piece, product_min_qty, product_price, product_stock} = productItem;
        let qty=convertStringToNumber(product_min_qty) + convertStringToNumber(added_piece)

        if (convertStringToNumber(added_piece) == 0 || qty<convertStringToNumber(product_min_qty)) {
            return;
        }
        let newPieces = convertStringToNumber(added_piece) - convertStringToNumber(product_piece);

        let total_price = convertStringToNumber(newPieces) * convertStringToNumber(product_price);

        let minimumPrice = convertStringToNumber(product_min_qty) * convertStringToNumber(product_price);

        productItem.totalPrice = total_price + minimumPrice;

        productItem.added_piece = newPieces;

        const {cartList} = this.state;
        cartList.splice(index, productItem);

        this.setState({cartList: cartList});

    }

    handlePlusView(productItem, index) {
        const {added_piece, product_piece, totalPrice, product_price, product_stock, product_min_qty} = productItem;
        console.log(productItem);
        let productStockAvailable = convertStringToNumber(product_stock);  // added_piece=4
        let newPieces = convertStringToNumber(added_piece) + convertStringToNumber(product_piece);    // product_piece =5

        let minimumPrice = convertStringToNumber(product_min_qty) * convertStringToNumber(product_price);

        let total_price = convertStringToNumber(newPieces) * convertStringToNumber(product_price);

        productItem.totalPrice = total_price + minimumPrice;
        productItem.added_piece = newPieces;

        const {cartList} = this.state;
        cartList.splice(index, productItem);


        this.setState({cartList: cartList});

    }


    _renderItem = (item, index) => {
        console.log(item.product_image);
        const {navigation}=this.props
        const {product_image} = item;

        let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, product_image);
        let largeUrl = formatString(Constants.IMAGES_URL.LARGE_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, product_image);

        return (<View key={index.toString()}>
            <TouchableOpacity  style={{alignSelf: 'center',}}>

                <FabricImage image={product_image} type={Constants.IMAGES_TYPES.product}
                    onPressItem={()=>{
                        navigation.navigate('ImageZoomScreen',{
                            imageUrl:largeUrl
                        })
                    }}
                />
            </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute',  right: 10,bottom:15}} onPress={() => {
                    navigation.navigate('ImageZoomScreen', {
                        imageUrl: largeUrl,
                    });
                }}>
                    <ZoomIcon width={23} height={23} fill={'white'}/>
                </TouchableOpacity>
            </View>
        );


    };

    renderItem(item, index) {
        let img;
        img = require('../../assets/c1.png');
        const {catalog_name, product_color, product_min_qty, totalPrice, product_price, added_piece, images} = item;
        //  alert(images)
        let productImagesArray = [];
        let imageUrl;

        if (images && images.length > 0) {
            productImagesArray = images;

            imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, images[0].product_image);

            //alert(JSON.stringify(imageUrl))
        } else {

        }




        return <View style={styles.parentView}>

            <View>


                {/* <Image resizeMode='cover' source={imageUrl?{uri: imageUrl}:NoProductImage} style={styles.imageStyle}/>*/}


                <View style={[styles.minimumItemStyle, {height:isTablet? width+(width*33/100):500, padding: 1,}]}>


                    <Swiper showsButtons={false} autoplay={true} removeClippedSubviews={false} >
                        {productImagesArray.map((item, index) =>
                            this._renderItem(item, index),
                        )}
                    </Swiper>


                    {productImagesArray.length === 0 &&
                    <Image
                        resizeMode='cover'
                        source={NoProductImage}
                        style={{width: width, height: 500,alignSelf:'center'}}/>
                    }

                </View>

                <View style={styles.itemContentView}>

                    <View style={styles.itemStyle}>

                        <Text style={styles.catalogNameTitleStyle}>{catalog_name}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.removeItem(item, index);
                            }}>
                            <DeleteIcon fill={Colors.rgb_e15517} width='20' height='20'
                                        style={{marginTop: 5}}/>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.textTitleStyle}>{product_color}</Text>

                </View>


            </View>
            {this.renderSubcategoryView('Min Qty', product_min_qty, convertStringToNumber(product_min_qty) * convertStringToNumber(product_price))}
            {/*{this.renderSubcategoryView('Added Piece', added_piece, convertStringToNumber(added_piece) * convertStringToNumber(product_price))}
            {this.renderTotalView('Total Qty', convertStringToNumber(product_min_qty) + convertStringToNumber(added_piece), totalPrice)}*/}

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
            }}>

                <View style={{flexDirection: 'row', marginVertical: 10, paddingHorizontal: 0}}>
                    <TouchableOpacity
                        style={{paddingHorizontal:5}}
                        onPress={() => {
                        this.handleMinusView(item, index);
                    }}>
                        <MinusIcon width={23} height={23} fill={Colors.rgb_000000}/>

                    </TouchableOpacity>
                    <Text style={styles.plusMinusTextStyle}>{convertStringToNumber(product_min_qty) + convertStringToNumber(added_piece)}</Text>
                    <TouchableOpacity
                        style={{paddingHorizontal:5}}
                        onPress={() => {
                        this.handlePlusView(item, index);
                    }}>
                        <AddIcon width={23} height={23} fill={Colors.rgb_000000}/>

                    </TouchableOpacity>
                </View>
                {/*  {this.renderTotalView(totalPrice)}*/}
            </View>


        </View>;
    }


    renderFooterComponent() {
        const {cartList} = this.state;
        let sumTotal = calculateTotalPrice(cartList);

        return <View>

            <TotalPrice t1={Strings.cart.grand} t3={`${calculateTotalQty(cartList)}`}
                        press={() => console.log('ss')}/>

           {/* <TotalPrice t1={Strings.cart.grand_total} t3={`${Strings.cart.price_symbol} ${sumTotal}`}
                        press={() => console.log('ss')}/>*/}

            <TotalPrice t1={' '} t3={''} t2={Strings.cart.place_order} press={() => {
                this.props.navigation.navigate('ShippingAddressSelectionScreen');
            }}
            />

            <TotalPrice t1={' '} t3={''} t2={Strings.cart.continue_shopping} press={() => {
                this.props.navigation.navigate('HomeScreen');
            }}
            />


        </View>;
    }

    render() {
        const {cartList, isLoading} = this.state;

        if (isLoading) {
            return <LoadingView/>;
        } else {

            return <View style={styles.container}>

                {cartList && cartList.length > 0 ?

                    <FlatList
                        style={{marginTop: 5, marginBottom: 10}}
                        keyExtractor={(item, index) => index.toString()}
                        data={cartList}
                        renderItem={({item, index}) => this.renderItem(item, index)}
                        ListFooterComponent={cartList.length > 0 ? this.renderFooterComponent() : null}
                    /> :
                    <ErrorScreen image={require('../../Images/assets/cart_empty.png')}
                                 title={Strings.cart.empty_cart_msg}/>
                }


            </View>;
        }
    }

}

const mapStateToProps = (state) => ({
    // isProductDataFound: state.customerReducer.isProductDataFound,
    //productData: state.customerReducer.productData,
    cartArr: state.customerReducer.cartArr,
    isCartUpdated: state.customerReducer.isCartUpdated,
    //errorMessage: state.customerReducer.errorMessage,


});

const mapDispatchToProps = (dispatch) => ({
    storeCartData: (cartData, operationType) => dispatch(customerActions.storeCartData(cartData, operationType)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
