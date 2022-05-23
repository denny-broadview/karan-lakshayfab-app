import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, ScrollView} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
import {Appbar} from 'react-native-paper';
import {Constants} from '../Resources';
import ToastMessage from '../components/ToastMessage';
import Swiper from 'react-native-swiper';
import NoProductImage from '../Images/assets/no_product.jpg';
import LoadingSpinner from '../components/LoadingSpinner';
import {formatString} from '../utils/TextUtils';

export default class Screen1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            slider:[]

        };
    }

    componentDidMount(): void {

        this.setState({isLoading: true});
        this.getHomeData();


    }


    getHomeData() {
        fetch(Constants.BASE_URL + '/users/mobile_home', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false});
                console.log(responseJson);
                const {status, message,data} = responseJson;
                if (status == '200') {

                    this.setState({homeData: data,slider:data.slider});
                } else {
                    ToastMessage(message);
                }


            })
            .catch((error) => {

                this.setState({isLoading: false});
                ToastMessage(error.message.toString());
            });
    }



    _renderItem = (item, index) => {
        console.log(item.product_image);
        const {navigation}=this.props
        const {product_image} = item;

        let imageUrl = formatString(Constants.IMAGES_URL.REGULAR_IMAGE, Constants.HOST_URL, Constants.IMAGES_TYPES.gallery, product_image);
        return (
            <TouchableOpacity key={index.toString()} style={{alignSelf: 'center', backgroundColor: 'red'}}  onPress={()=>{
                navigation.navigate('ImageZoomScreen',{
                    imageUrl
                })
            }}>
                <Image source={product_image ? {uri: imageUrl} : NoProductImage}
                       style={{width: DEVICE_WIDTH, height: 250}}/>
            </TouchableOpacity>
        );


    };

    render() {
        const {navigation} = this.props;
        const {slider, isLoading} = this.state;
        if (isLoading) {
            return <LoadingSpinner/>;
        } else {
            return (
                <View style={styles.MainContainer}>
                    <Appbar.Header style={{backgroundColor: '#E15517', width: DEVICE_WIDTH}}>
                        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()}/>
                    </Appbar.Header>
                    <ScrollView>

                        <View style={[styles.minimumItemStyle, {height: 250, padding: 1}]}>


                            <Swiper showsButtons={false} autoplay={true}>
                                {slider.map((item, index) =>
                                    this._renderItem(item, index),
                                )}
                            </Swiper>
                            {slider.length === 0 &&
                            <Image source={NoProductImage}
                                   style={{width: DEVICE_WIDTH - 38, height: 250, alignSelf: 'center'}}/>
                            }

                        </View>

                        {/*<Image source={sale} style={{width: DEVICE_WIDTH}}/>*/}
                        <View style={styles.view2}>
                            <View style={styles.image}>
                                <Text style={styles.text1}> Latest Fabrics</Text>
                            </View>
                            <View style={styles.buttonview}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate('FabricSelectionScreen')}
                                    activeOpacity={1}>
                                    <Text style={styles.text5}>View All</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.view1}>
                            <View style={styles.view3}>
                                {/* <Image source={cloth}/>*/}
                            </View>
                            <View style={styles.subview}>
                                <View style={styles.subview1}>
                                    {/* <Image source={fabric} style={styles.image}/>*/}
                                </View>
                                <View>
                                    {/*<Image source={fabric2} style={styles.image1}/>*/}
                                </View>
                            </View>
                        </View>
                        <View>
                            {/* <Image source={sale2} style={{width: DEVICE_WIDTH}}/>*/}
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        flex: 1,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E15517',
        height: 50,
        width: 100,
        borderRadius: 5,
        zIndex: 100,
    },
    text5: {
        fontWeight: 'bold',
        color: '#ffff',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    text1: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        left: 20,
    },
    view1: {
        flexDirection: 'row',
        width: DEVICE_WIDTH,
        alignSelf: 'center',
        borderColor: '#aaa',
        borderWidth: 2,
    },
    view2: {
        flexDirection: 'row',
        height: '8%',
    },
    view3: {
        width: '60%',
        borderColor: '#aaa',
        borderWidth: 2,
    },
    image: {
        alignSelf: 'center',
    },
    image1: {
        alignSelf: 'center',
        marginTop: '10%',
    },
    subview: {
        flexDirection: 'column',
        width: '40%',
    },
    buttonview: {
        right: 20,
        position: 'absolute',
        alignSelf: 'center',
    },
    subview1: {
        borderColor: '#aaa',
        borderWidth: 2,
    },

});
