import React from 'react';
import {Image, ScrollView, Text, Dimensions, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {connect} from 'react-redux';
import styles from './Styles/ProductDetailStyles';
import * as customerActions from '../../actions/customerActions';
import Button from '../../components/Button';
import {Strings} from '../../utils/Strings';
import {convertStringToNumber, formatString} from '../../utils/TextUtils';
import MinusIcon from '@svg/minus';
import AddIcon from '@svg/add';
import ZoomIcon from '@svg/ic_zoom';
import Colors from '../../Resources/Colors';
import TotalPrice from '../../components/TotalPrice';
import {Constants} from '../../Resources';
import ToastMessage from '../../components/ToastMessage';
import BreadScrum from '../../components/BreadScrum';
import Swiper from 'react-native-swiper';
import NoProductImage from '../../Images/assets/no_product.jpg';
import FabricImage from '../../components/FastImage';
import AddToCart from '../../components/AddToCart';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isTablet = DeviceInfo.isTablet();



class ProductDetailScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            productDetail: '',
            isLoading: false,
            isItemAdded: false,
            addedPiece: '',
            newPieces: '0',
            totalPrice: 0,
            productImageUrl: '',
            productImagesArray: [],
            addToCart:false

        };
    }


    componentDidMount(): void {
        //this.setState({isLoading: true});

        const {productData, route} = this.props;
        const {catalogId, productId,item} = route.params;
        AsyncStorage.removeItem('notification')
        console.log('Item------',item)

            if (item) {
                this.minimumQty = convertStringToNumber(item.product_min_qty);
                let productPrice = convertStringToNumber(item.product_price);
                let subTotal = this.minimumQty * productPrice;
                this.setsInPiece = convertStringToNumber(item.product_piece);

                let productImageUrl;
                let images;
                if (item.images && item.images.length > 0) {
                    productImageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.product, item.images[0].product_image);
                    images = item.images;
                    this.setState({
                        addedPiece: this.minimumQty,
                        productDetail: item,
                        totalPrice: subTotal + '',
                        minimumPrice: subTotal,
                        productImageUrl,
                        productImagesArray: images,

                    });

                } else {
                    this.setState({
                        addedPiece: this.minimumQty,
                        productDetail: item,
                        totalPrice: subTotal + '',
                        minimumPrice: subTotal,
                        productImageUrl,
                        productImagesArray: [],

                    });
                }


            }


    }

    handleMinusView() {
        const {addedPiece, productDetail, newPieces} = this.state;

        let added_piece = convertStringToNumber(addedPiece);
        // if new added piece are equal to new pieces   then return
        let minimumPieces = convertStringToNumber(productDetail.product_piece);

        if (addedPiece == productDetail.product_min_qty) {
            return;
        }

        added_piece = added_piece - this.setsInPiece;

        let new_pieces = convertStringToNumber(newPieces) - this.setsInPiece;
        let total_price = added_piece * productDetail.product_price;
        this.setState({addedPiece: added_piece, newPieces: new_pieces, totalPrice: total_price});

    }


    handlePlusView() {
        const {addedPiece, newPieces, productDetail} = this.state;
        let added_piece = convertStringToNumber(addedPiece);

        let productStockAvailable = convertStringToNumber(productDetail.product_stock);
        added_piece = added_piece + this.setsInPiece;
        let new_pieces = convertStringToNumber(newPieces) + this.setsInPiece;
        let total_price = added_piece * productDetail.product_price;
        this.setState({addedPiece: added_piece, newPieces: new_pieces, totalPrice: total_price});

    }


    renderItemsView(qty) {
        const {productDetail, minimumPrice, isItemAdded} = this.state;

        let minimumQty = convertStringToNumber(qty);
        let productPrice = convertStringToNumber(productDetail.product_price);
        let price = minimumQty * productPrice;

        return <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.pieceTextStyle}>{Strings.cart.piece}</Text>
            <Text style={styles.pieceTextStyle}>{`${minimumQty} * ${productPrice}`}</Text>
            <Text style={[styles.subTotalTextPriceStyle]}>{`₹${price}`}</Text>
        </View>;
    }


    addToCart() {
        const {route, cartArr} = this.props;
        const {productDetail, totalPrice, newPieces} = this.state;
        const {catalogId, productId} = route.params;

        let isExist = false;
        let arr = cartArr == null ? [] : cartArr;
        if (arr.length > 0) {
            isExist = arr.some((e) => {
                return e.productId == productId;
            });
        }
        let cartObj = {};
        cartObj.catalogId = catalogId;
        cartObj.productId = productId;
        cartObj.product_color = productDetail.product_color;
        cartObj.product_price = productDetail.product_price;
        cartObj.product_min_qty = productDetail.product_min_qty;
        cartObj.added_piece = newPieces;
        cartObj.totalPrice = totalPrice;
        cartObj.catalog_name = productDetail.catalog_name;
        cartObj.images = productDetail.images;
        cartObj.product_stock = productDetail.product_stock;
        cartObj.product_piece = productDetail.product_piece;

        if (isExist) {
            this.setState({addToCart:true})
            this.props.storeCartData(cartObj, Constants.CRUD_OPERATION_TYPES.UPDATE);
            //this.props.navigation.navigate('CartScreen');
        } else {
            this.setState({addToCart:true})
            this.props.storeCartData(cartObj, Constants.CRUD_OPERATION_TYPES.ADD_DATA);

           // this.props.navigation.navigate('CartScreen');
        }

    }


    renderSubTotalView() {
        const {productDetail, addedPiece, totalPrice} = this.state;
        return <TotalPrice t2={' '} t1={Strings.cart.total}
                           t3={`${Strings.cart.price_symbol}${totalPrice}`}/>;
    }

    _renderItem = (item, index) => {

        const {navigation} = this.props;
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


    render() {
        const {productDetail, addToCart,newPieces, addedPiece, productImagesArray,} = this.state;
        const {catalogName, fabricName,isArhamGSilk} = this.props.route.params;
        return (<ScrollView style={styles.container}>

            {!isArhamGSilk && <BreadScrum t2={catalogName} t1={fabricName}/>}
            {addToCart && <AddToCart cancelModal={()=>this.setState({addToCart:!addToCart})} />}

            <View style={{marginBottom: 50}}>

                <View style={[styles.minimumItemStyle, {height: isTablet?width+(width*33/100):500, padding: 1, marginTop: 7,}]}>


                    <Swiper showsButtons={false} autoplay={true} removeClippedSubviews={false} >
                        {productImagesArray.map((item, index) =>
                            this._renderItem(item, index),
                        )}
                    </Swiper>

                    {productImagesArray.length == 0 &&
                    <Image
                        resizeMode='cover'
                        source={NoProductImage}
                        style={{width: width-25, height:500,alignSelf:'center'}}/>
                    }

                </View>

                <View style={[styles.minimumItemStyle, {flexDirection: 'row', marginTop: 7}]}>
                    <View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.minimumProductPriceStyle}>{'₹' + productDetail.product_price}
                                <Text style={styles.perPieceStyle}>{` ${Strings.cart.per} ${Strings.cart.piece}`}</Text>
                            </Text>

                        </View>


                        <Text
                            style={styles.minimumQtyStyle}>{`Minimum Quantity ${productDetail.product_min_qty}`}</Text>
                        <Text style={styles.minimumQtyStyle}>{`${productDetail.product_piece} Piece In A Set`}</Text>

                    </View>


                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>

                        <TouchableOpacity
                            style={{paddingHorizontal: 5}}
                            onPress={() => {
                                this.handleMinusView();
                            }}>
                            <MinusIcon width={23} height={23} fill={Colors.rgb_000000}/>

                        </TouchableOpacity>
                        <Text style={styles.plusMinusTextStyle}>{addedPiece}</Text>
                        <TouchableOpacity

                            onPress={() => {
                                this.handlePlusView();
                            }}>
                            <AddIcon width={23} height={23} fill={Colors.rgb_000000}/>

                        </TouchableOpacity>
                    </View>

                </View>


                {/*<View style={[styles.minimumItemStyle]}>
                    {this.renderItemsView(convertStringToNumber(productDetail.product_min_qty))}
                    {addedPiece > productDetail.product_min_qty &&
                    <View style={{marginTop: 15}}>
                        {this.renderItemsView(convertStringToNumber(newPieces))}
                    </View>}

                </View>*/}

              {/*  {this.renderSubTotalView()}*/}

                {/* <Button title={Strings.cart.add_to_cart} onPress={() => {
                    this.addToCart();
                }} style={{marginTop: 30, width: '60%'}}/>
*/}
                <TotalPrice style={{width: '60%', alignSelf: 'center'}} textStyle={styles.addCartStyles}
                            press={() => this.addToCart()} t2={Strings.cart.add_to_cart} t1={''}
                            t3={''}/>

            </View>


        </ScrollView>);
    }

}

const mapStateToProps = (state) => ({
    // isProductDataFound: state.customerReducer.isProductDataFound,
    productData: state.customerReducer.productData,
    cartArr: state.customerReducer.cartArr,
    //errorMessage: state.customerReducer.errorMessage,


});

const mapDispatchToProps = (dispatch) => ({
    storeCartData: (cartObj, operationType) => dispatch(customerActions.storeCartData(cartObj, operationType)),

});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);


